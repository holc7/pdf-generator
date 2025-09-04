// Test script to verify PDF generation locally
// Run with: npx ts-node test/test-pdf.ts

const testHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: white;
      color: #333;
      font-size: 14px;
      line-height: 1.6;
    }
    
    .header {
      background: #a72418;
      padding: 40px;
      text-align: center;
      color: white;
      margin-bottom: 30px;
    }
    
    .logo {
      max-width: 120px;
      height: auto;
      margin-bottom: 20px;
    }
    
    .title {
      margin: 0;
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 2px;
    }
    
    .section {
      padding: 30px;
      margin-bottom: 0;
    }
    
    .section-title {
      color: #1a1a2e;
      margin-top: 0;
      font-size: 18px;
      font-weight: 600;
      padding-bottom: 15px;
      border-bottom: 2px solid #e9ecef;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://framerusercontent.com/images/QBRyNw7zA4V3WUDUOCjREEJEN0k.png?scale-down-to=512" 
         class="logo" 
         alt="Signature Furniture">
    <h1 class="title">TEST PDF GENERATION</h1>
    <p class="date">${new Date().toLocaleDateString()}</p>
  </div>

  <div class="section">
    <h2 class="section-title">TEST CONTENT</h2>
    <div class="content">
      <p>This is a test PDF generated at ${new Date().toLocaleString()}</p>
      <p>If you can see this, the PDF generation is working correctly!</p>
      <ul>
        <li>✓ HTML to PDF conversion works</li>
        <li>✓ Styles are preserved</li>
        <li>✓ Base64 encoding successful</li>
      </ul>
    </div>
  </div>
</body>
</html>`;

async function testPDFGeneration() {
  try {
    console.log('Testing PDF generation API...');
    
    const response = await fetch('http://localhost:3000/api/pdf/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'signature-furniture-pdf-api-2024'
      },
      body: JSON.stringify({
        html: testHTML,
        filename: 'test-report.pdf'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ PDF generated successfully!');
      console.log('   Filename:', data.filename);
      console.log('   Size:', data.size, 'bytes');
      console.log('   Base64 length:', data.pdf.length);
      
      // Save PDF to file for manual inspection
      const fs = require('fs');
      const buffer = Buffer.from(data.pdf, 'base64');
      fs.writeFileSync('test-output.pdf', buffer);
      console.log('✅ PDF saved to test-output.pdf');
    } else {
      console.error('❌ Error:', data.error, data.details);
    }
  } catch (error) {
    console.error('❌ Failed to test API:', error);
  }
}

// Run if executed directly
if (require.main === module) {
  testPDFGeneration();
}

export { testPDFGeneration };