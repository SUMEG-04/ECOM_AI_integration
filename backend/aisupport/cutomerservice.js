const { CSVLoader }=require("langchain/document_loaders/fs/csv");
const {OpenAI} =require("langchain/llms/openai")
const { ChatOpenAI } =require( "langchain/chat_models/openai");
const { HNSWLib } =require( "langchain/vectorstores/hnswlib");
const { OpenAIEmbeddings } =require( "langchain/embeddings/openai");
const { BufferMemory,ConversationSummaryBufferMemory } =require( "langchain/memory");
const fs =require( "fs");
const { RunnableBranch, RunnableSequence } =require( "langchain/schema/runnable");
const { PromptTemplate } =require( "langchain/prompts");
const { StringOutputParser } =require( "langchain/schema/output_parser");
const { LLMChain } =require( "langchain/chains");
const { ConversationChain } =require( "langchain/chains");
const { formatDocumentsAsString } =require( "langchain/util/document");

const helpSupport = async (userMessage,prevSummary) => {

  /* Initialize the LLM to use to answer the question */
  const model = new ChatOpenAI({openAIApiKey:process.env.YOUR_API_KEY});
  /* Load in the file we want to do question answering over */
  const loader = new CSVLoader("output.csv");
  /* Split the text into chunks */
  const docs = await loader.load();
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({openAIApiKey:process.env.YOUR_API_KEY,temperature:0}));
  const retriever = vectorStore.asRetriever();

  const serializeChatHistory = (chatHistory) => {
    if (Array.isArray(chatHistory) && chatHistory.chat_history.length > 0) {
      return chatHistory.chat_history.join("\n");
    }
    return chatHistory;
  };
  
  const llm=new OpenAI({openAIApiKey:process.env.YOUR_API_KEY, modelName: "gpt-3.5-turbo-instruct", temperature: 0 })

  const memory = new ConversationSummaryBufferMemory({
    llm:llm ,
    inputKey:"human",
    memoryKey:'chatHistory',
    maxTokenLimit: 50,
    returnMessages:true,
    aiPrefix:"AI Assistant",
    humanPrefix:"QUESTION",
  });

  const questionPrompt = PromptTemplate.fromTemplate(
    `You an ai assistant for an Ecom website where you task is to help your customer on the basis of there instructions.
     1.Go thorugh all the information that had been provided to you,review your answer before reaching to a conclusion.
     2.Use the following pieces of context and chatHistory to answer the question at the end. 
     3.you need to give priority to context over chatHistory as an ecom website it is updated every few sec and context contains details of product
     4.If you cannot determine the context of question then review the last line of chathistory.
     5.If the asked product is available or not for that look for stocks/stock of product as it can be out of stock
     6.""Suggest some similar product available in our catalog, maybe it could be grammatical mistake refrence (If the customer is asking watches and there is no products like then suggest similar product to it like watch)"".
     7.If the product is unavailable tell them we will soon be adding it to our catalog.
     8.Don't mention "Based on the given context and chat history"
      ----------------
      CHAT HISTORY: {chatHistory}
      ----------------
      CONTEXT: {context}
      ----------------
      QUESTION: {question}
      ----------------
      Helpful Answer:`
    );

  /**
   * Creates a prompt template for __generating a question__ to then ask an LLM
   * based on previous chat history, context and the question.
   *
   * inputVariables: ["chatHistory", "question"]
   */
  const questionGeneratorTemplate =
    PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
    ----------------
    CHAT HISTORY: {chatHistory}
    ----------------
    FOLLOWUP QUESTION: {question}
    ----------------
    Standalone question:`);

  const handleProcessQuery = async (input) => {
    const chain = new LLMChain({
      llm: model,
      prompt: questionPrompt,
      outputParser: new StringOutputParser(),
    });

    const { text } = await chain.call({
      ...input,
      chatHistory: serializeChatHistory(input.chatHistory ?? ""),
    });

    await memory.saveContext(
      {
        human: input.question,
      },
      {
        ai: text,
      }
    );

    return text;
  };

  const answerQuestionChain = RunnableSequence.from([
    {
      question: (input) => input.question,
      chatHistory:(input)=>input.chatHistory,
    },
    {
      question: (previousStepResult) => previousStepResult.question,
      chatHistory: (previousStepResult) => serializeChatHistory(previousStepResult.chatHistory ?? ""),
      context: async (previousStepResult) => {
        // Fetch relevant docs and serialize to a string.
        const relevantDocs = await retriever.getRelevantDocuments(
          previousStepResult.question
        );
        const serialized = formatDocumentsAsString(relevantDocs);
        return serialized;
      },
    },
    handleProcessQuery,
  ]);

  const generateQuestionChain = RunnableSequence.from([
    {
      question: (input) => input.question,
      chatHistory: (input) => input.chatHistory,
    },
    questionGeneratorTemplate,
    model,
    // Take the result of the above model call, and pass it through to the
    // next RunnableSequence chain which will answer the question
    {
      question: (previousStepResult) =>
        previousStepResult.text,
    },
    answerQuestionChain,
  ]);

  const branch = RunnableBranch.from([
    [
      async () => {
        const memoryResult = await memory.loadMemoryVariables({});
        const isChatHistoryPresent = !memoryResult.chatHistory.length;

        return isChatHistoryPresent;
      },
      answerQuestionChain,
    ],
    [
      async () => {
        const memoryResult = await memory.loadMemoryVariables({});
        const isChatHistoryPresent =
          !!memoryResult.chatHistory && memoryResult.chatHistory.length;

        return isChatHistoryPresent;
      },
      generateQuestionChain,
    ],
    answerQuestionChain,
  ]);

  const fullChain = RunnableSequence.from([
    {
      question: (input) => input.question,
      chatHistory:(input)=>input.chatHistory,
    },
    branch,
  ]);


  const response = await fullChain.invoke({question:userMessage,chatHistory:prevSummary});

  const messages = await memory.chatHistory.getMessages();
  const previous_summary = prevSummary;
  const predictSummary = await memory.predictNewSummary(
        messages,
        previous_summary
  );
  
  const aiResponse=JSON.stringify(response)
  const summary=JSON.stringify(predictSummary)
  console.log(summary)
  return{aiResponse,summary}
  
};

module.exports=helpSupport