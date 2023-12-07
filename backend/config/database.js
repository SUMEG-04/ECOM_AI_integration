require('dotenv').config();

const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI;
const fs = require('fs');
// The rest of your server setup

// Define your database connection URL

// Connect to the database
mongoose.connect(dbUrl).then(()=>{console.log('connection successful')}).catch((err)=>{console.log('no connection:',err)})


// // Get the default connection
// const db = mongoose.connection;

// // Bind connection to error event (to get notifications of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Bind connection to open event (to know when we're connected)
// db.once('open', () => {
//   console.log('Connected to the database');
// });

// // Export the database connection
// module.exports = db;

/*

async function exportCollectionToCSV(dbName, collectionName, outputPath) {

  const db = client.db(dbName);

  const collection = db.collection(collectionName);

  const cursor = collection.find();

  const jsonDocs = await cursor.toArray();

  // Map documents to an array of arrays representing CSV rows
  const csvData = jsonDocs.map(doc => {
    return Object.keys(doc).map(key => {
      return `"${doc[key]}"`; 
    });
  });

  // Add header row 
  csvData.unshift(Object.keys(jsonDocs[0]));

  // Join CSV rows into a string
  const csv = csvData.join('\n');

  // Write CSV data to file
  fs.writeFileSync(outputPath, csv);

  client.close();

  console.log(`CSV export written to ${outputPath}`);

}

// Example usage:
const dbName = 'AI_ECOM';
const collectionName = 'products';
const csvPath = './products.csv';

exportCollectionToCSV(dbName, collectionName, csvPath);
*/ 