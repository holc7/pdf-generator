import { z } from 'zod';

export const pdfGenerateSchema = z.object({
  html: z.string().min(1, 'HTML content is required'),
  filename: z.string().optional().default('report.pdf'),
});

export type PDFGenerateInput = z.infer<typeof pdfGenerateSchema>;