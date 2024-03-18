const PDFDocument = require('pdfkit');
const fs = require('fs');

function createPDF(jsonData, outputPath) {
  const doc = new PDFDocument();
  const outputStream = fs.createWriteStream(outputPath);
  
  doc.pipe(outputStream);

  // Iterate through each key-value pair in the JSON object
  Object.entries(jsonData).forEach(([key, value]) => {
    // Write the key-value pair to the PDF
    doc.text(`${key} :- ${value}`);
  });

  doc.end();
}

// Example JSON data
const jsonData = {
  "name": "John Doe",
  "age": 30,
  "city": "New York"
};

// Output file path
const outputPath = 'output.pdf';

// Generate the PDF
createPDF(jsonData, outputPath);

console.log('PDF created successfully!');
