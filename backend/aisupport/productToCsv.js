const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fetch = require('node-fetch');

async function pasteProductDetailsToCsv(apiEndpoint, outputPath) {
  try {
    console.log("working")
    // Fetch product details from the backend
    const response = await fetch(apiEndpoint);
    const productDetails = await response.json();
    const productGroup = await productDetails.data;

    // Write product details to CSV
    const csvWriter = createCsvWriter({
      path: outputPath,
      header: Object.keys(productGroup[0]).map((key) => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(productGroup);
    console.log('CSV file has been written successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
const backendApiEndpoint = 'http://localhost:3000/api/products/'; // Replace with your actual API endpoint
const csvOutputPath = 'output.csv'; // Replace with your desired output path

pasteProductDetailsToCsv(backendApiEndpoint, csvOutputPath);
