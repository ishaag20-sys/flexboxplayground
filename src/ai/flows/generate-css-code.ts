'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating CSS code from flexbox settings.
 * It includes the main function generateCssCode, the input and output schemas, and the prompt definition.
 *
 * @exports generateCssCode - A function to generate CSS code from flexbox settings.
 * @exports GenerateCssCodeInput - The input type for the generateCssCode function.
 * @exports GenerateCssCodeOutput - The output type for the generateCssCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCssCodeInputSchema = z.object({
  flexDirection: z
    .enum(['row', 'column', 'row-reverse', 'column-reverse'])
    .describe('The flex-direction property.'),
  justifyContent: z
    .enum([
      'flex-start',
      'center',
      'flex-end',
      'space-between',
      'space-around',
      'space-evenly',
    ])
    .describe('The justify-content property.'),
  alignItems: z
    .enum(['stretch', 'flex-start', 'center', 'flex-end', 'baseline'])
    .describe('The align-items property.'),
  gap: z.number().describe('The gap property in pixels.'),
});

export type GenerateCssCodeInput = z.infer<typeof GenerateCssCodeInputSchema>;

const GenerateCssCodeOutputSchema = z.object({
  cssCode: z.string().describe('The generated CSS code.'),
});

export type GenerateCssCodeOutput = z.infer<typeof GenerateCssCodeOutputSchema>;

export async function generateCssCode(
  input: GenerateCssCodeInput
): Promise<GenerateCssCodeOutput> {
  return generateCssCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCssCodePrompt',
  input: {schema: GenerateCssCodeInputSchema},
  output: {schema: GenerateCssCodeOutputSchema},
  prompt: `Generate CSS code for a flexbox container with the following properties:\n\nflex-direction: {{{flexDirection}}};\njustify-content: {{{justifyContent}}};\nalign-items: {{{alignItems}}};\ngap: {{{gap}}}px;\n\n.container {\n  display: flex;\n  flex-direction: {{{flexDirection}}};\n  justify-content: {{{justifyContent}}};\n  align-items: {{{alignItems}}};\n  gap: {{{gap}}}px;\n}`,
});

const generateCssCodeFlow = ai.defineFlow(
  {
    name: 'generateCssCodeFlow',
    inputSchema: GenerateCssCodeInputSchema,
    outputSchema: GenerateCssCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
