export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>PDF Generator API</h1>
      <p>Signature Furniture PDF Generation Service</p>
      
      <h2>API Endpoint</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
        POST /api/pdf/generate
      </pre>
      
      <h2>Request Headers</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
{`X-API-Key: your-api-key
Content-Type: application/json`}
      </pre>
      
      <h2>Request Body</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
{`{
  "html": "<html>Your HTML content</html>",
  "filename": "report.pdf" // optional
}`}
      </pre>
      
      <h2>Response</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
{`{
  "pdf": "base64_encoded_pdf_content",
  "filename": "report.pdf",
  "size": 125000
}`}
      </pre>
      
      <h2>n8n Integration</h2>
      <p>Use HTTP Request node with the following configuration:</p>
      <ul>
        <li>Method: POST</li>
        <li>URL: https://your-domain.vercel.app/api/pdf/generate</li>
        <li>Authentication: Header Auth (X-API-Key)</li>
        <li>Response Format: JSON</li>
      </ul>
    </main>
  );
}