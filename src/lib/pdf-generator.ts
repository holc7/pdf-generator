import puppeteer, { Browser } from 'puppeteer-core';

let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (browserInstance) {
    return browserInstance;
  }

  // For local development
  if (process.env.NODE_ENV === 'development') {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-extensions'
      ],
      executablePath: process.env.CHROME_EXECUTABLE_PATH || 
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // Windows default
    });
  } else {
    // For production (Vercel)
    try {
      const chromium = await import('@sparticuz/chromium');
      browserInstance = await puppeteer.launch({
        args: chromium.default.args,
        executablePath: await chromium.default.executablePath(),
        headless: true,
      });
    } catch (error) {
      console.error('Failed to load chromium for production:', error);
      throw new Error('PDF generation not available in production yet');
    }
  }

  return browserInstance;
}

export async function generatePDF(html: string): Promise<Buffer> {
  let browser: Browser | null = null;
  let page = null;

  try {
    browser = await getBrowser();
    page = await browser.newPage();

    // Set content with proper loading wait
    await page.setContent(html, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    // Generate PDF with A4 format and proper margins
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: false
    });

    return pdfBuffer;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    if (page) {
      await page.close();
    }
    // Don't close browser in development to reuse it
    if (process.env.NODE_ENV !== 'development' && browser && browser !== browserInstance) {
      await browser.close();
    }
  }
}

// Clean up on process exit
process.on('exit', async () => {
  if (browserInstance) {
    await browserInstance.close();
  }
});