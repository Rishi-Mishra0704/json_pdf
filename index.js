const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rishimishra0404@gmail.com',
    pass: 'carokann'
  }
});

function createPDF(jsonData) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let pdfBuffer = Buffer.alloc(0);
    
    // Pipe the PDF content into a buffer
    doc.on('data', (chunk) => {
      pdfBuffer = Buffer.concat([pdfBuffer, chunk]);
    });

    doc.on('end', () => {
      resolve(pdfBuffer);
    });

    // Iterate through each key-value pair in the JSON object
    Object.entries(jsonData).forEach(([key, value]) => {
      // Write the key-value pair to the PDF
      doc.text(`${key} : ${value}`);
    });

    doc.end();
  });
}

async function sendEmailWithAttachment(pdfBuffer) {
  // Define email options
  const mailOptions = {
    from: 'rishimishra0404@gmail.com',
    to: 'rishimishra639@gmail.com',
    subject: 'JSON to PDF Conversion',
    text: 'Please find the attached PDF file.',
    attachments: [{
      filename: 'output.pdf',
      content: pdfBuffer
    }]
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

// Example JSON data
const jsonData = {
  "name": "John Doe",
  "age": 30,
  "city": "New York"
};

// Generate the PDF
createPDF(jsonData)
  .then((pdfBuffer) => {
    // Send the email with the PDF attachment
    sendEmailWithAttachment(pdfBuffer);
  })
  .catch((error) => {
    console.error('Failed to generate PDF:', error);
  });
