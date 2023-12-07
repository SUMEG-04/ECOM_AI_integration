const { CSVLoader } =require( "langchain/document_loaders/fs/csv");
const { OpenAIEmbeddings } =require( "langchain/embeddings/openai");
const { HNSWLib } =require ("langchain/vectorstores/hnswlib");
const { OpenAI } =require("langchain/llms/openai");
const {ChatOpenAI} =require("langchain/chat_models/openai")
const {PromptTemplate}=require("langchain/prompts")
const { ConversationSummaryBufferMemory } =require("langchain/memory");
const { RunnableSequence } =require( "langchain/schema/runnable");
const { StringOutputParser } =require( "langchain/schema/output_parser");
const { RunnableBranch } =require("langchain/schema/runnable");
const {ConversationChain}=require('langchain/chains')
const { formatDocumentsAsString } =require( "langchain/util/document");

const loader = new CSVLoader("output.csv");

const run=async()=>{
    const docs = await loader.load();
    //console.log(docs)
    
    const vectorStore = await HNSWLib.fromDocuments(
        docs,
        new OpenAIEmbeddings({openAIApiKey:process.env.YOUR_API_KEY,temperature:0})
    );
    retriever = vectorStore.asRetriever()
    const llm=new OpenAI({openAIApiKey:process.env.YOUR_API_KEY, modelName: "gpt-3.5-turbo-instruct", temperature: 0 })
    const memory = new ConversationSummaryBufferMemory({
        llm:llm ,
        memoryKey:"chatHistory",
        maxTokenLimit: 50,
    });
    const model = new ChatOpenAI({ openAIApiKey:process.env.YOUR_API_KEY,temperature: 0, verbose: true });

    const template1 =  `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
    ----------------
    CHAT HISTORY: {chatHistory}
    ----------------
    CONTEXT: {context}
    ----------------
    QUESTION: {question}
    ----------------
    Helpful Answer:`;

    const questionPrompt =new PromptTemplate({
        template:template1,
        inputVariables: ["chatHistory", "context","question"],
    });

    const template2=`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
    ----------------
    CHAT HISTORY: {chatHistory}
    ----------------
    FOLLOWUP QUESTION: {question}
    ----------------
    Standalone question:`

    const questionGeneratorTemplate = new PromptTemplate({
        template:template2,
        inputVariables: ["chatHistory","question"],
    });

    const serializeChatHistory =async (chatHistory) => {
        if (Array.isArray(chatHistory)) {
          return chatHistory.join("\n");
        }
        const messages = await memory.chatHistory.getMessages();
        const previous_summary = "";
        const predictSummary = await memory.predictNewSummary(
        messages,
        previous_summary
        );
        return predictSummary;
      };

    const handleProcessQuery = async (input) => {
        const chain = new ConversationChain({
            llm: model,
            memory: memory,
            prompt: questionPrompt,
            outputParser: new StringOutputParser(),
        });
      
        const  text  = await chain.predict({
          question:input.question,context:input.context,chatHistory:serializeChatHistory(input.chatHistory ?? "")});

          console.log(text)
          return text
      };


      const answerQuestionChain = RunnableSequence.from([
        {
          question: (input) => input.question,
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
          chatHistory: async () => {
            const memoryResult = await memory.loadMemoryVariables({});
            const chatHistory = memoryResult.human ?? "";
            return serializeChatHistory(chatHistory);
          },
        },
        questionGeneratorTemplate,
        model,
        // Take the result of the above model call, and pass it through to the
        // next RunnableSequence chain which will answer the question
        {
          question: (previousStepResult) => previousStepResult.text,
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
        },
        branch,
      ]);
      
      /* Invoke our `Runnable` with the first question */
      const resultOne = await fullChain.invoke({
        question: "ok i like place order for this product?",
      });
      console.log({resultOne})

}
//run()