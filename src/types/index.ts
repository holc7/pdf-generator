export interface PDFGenerateRequest {
  html: string;
  filename?: string;
}

export interface PDFGenerateResponse {
  pdf: string; // base64 encoded
  filename: string;
  size: number;
}

export interface APIError {
  error: string;
  details?: string;
}