import { NextRequest, NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdf-generator';
import { pdfGenerateSchema } from '@/lib/validation';
import { validateApiKey } from '@/lib/auth';
import { PDFGenerateResponse, APIError } from '@/types';

export const maxDuration = 60; // Maximum allowed for Vercel Hobby plan

export async function POST(request: NextRequest) {
  try {
    // API Key validation
    const apiKey = request.headers.get('x-api-key');
    if (!validateApiKey(apiKey)) {
      return NextResponse.json<APIError>(
        { error: 'Unauthorized', details: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = pdfGenerateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json<APIError>(
        { 
          error: 'Validation error', 
          details: validationResult.error.issues[0].message 
        },
        { status: 400 }
      );
    }

    const { html, filename } = validationResult.data;

    // Generate PDF
    const pdfBuffer = await generatePDF(html);

    // Return PDF file directly
    return new NextResponse(pdfBuffer.buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename || 'report.pdf'}"`,
        'Content-Length': pdfBuffer.length.toString(),
      }
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    
    return NextResponse.json<APIError>(
      { 
        error: 'PDF generation failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    },
  });
}