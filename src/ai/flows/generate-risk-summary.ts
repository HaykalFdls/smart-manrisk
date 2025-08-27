'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating a concise summary of key risks across different modules.
 *
 * @exports generateRiskSummary - An async function that takes GenerateRiskSummaryInput and returns GenerateRiskSummaryOutput.
 * @exports GenerateRiskSummaryInput - The input type for the generateRiskSummary function.
 * @exports GenerateRiskSummaryOutput - The return type for the generateRiskSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRiskSummaryInputSchema = z.object({
  dashboardData: z.string().describe('The combined data from all risk modules in the dashboard.'),
});
export type GenerateRiskSummaryInput = z.infer<typeof GenerateRiskSummaryInputSchema>;

const GenerateRiskSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of key risks, potential impacts, and recommended actions.'),
});
export type GenerateRiskSummaryOutput = z.infer<typeof GenerateRiskSummaryOutputSchema>;

/**
 * Asynchronously generates a risk summary using the provided dashboard data.
 * @param input - The input containing the dashboard data.
 * @returns A promise that resolves to a GenerateRiskSummaryOutput object containing the risk summary.
 */
export async function generateRiskSummary(input: GenerateRiskSummaryInput): Promise<GenerateRiskSummaryOutput> {
  return generateRiskSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRiskSummaryPrompt',
  input: {schema: GenerateRiskSummaryInputSchema},
  output: {schema: GenerateRiskSummaryOutputSchema},
  prompt: `You are an expert risk manager. Generate a concise summary of the key risks identified across various modules in the dashboard.

  Highlight potential impacts and recommended actions based on the data provided.

  Dashboard Data: {{{dashboardData}}}`,
});

const generateRiskSummaryFlow = ai.defineFlow(
  {
    name: 'generateRiskSummaryFlow',
    inputSchema: GenerateRiskSummaryInputSchema,
    outputSchema: GenerateRiskSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
