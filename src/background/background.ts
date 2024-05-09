import OpenAI from 'openai';

require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
  dangerouslyAllowBrowser: true
});


async function fetchExplanation(content: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: content },{role: 'system', content:"Explain the input text in averagely simple words. Maximum 50 - 70 words."}],
    model: 'gpt-3.5-turbo',
  });
  console.log(chatCompletion);
  console.log(chatCompletion["choices"][0]["message"]["content"]);
  // console.log(chatCompletion.choices[0].message);
  return chatCompletion["choices"][0]["message"]["content"]
}


export async function run(content: string) {
  try {
    const explanation = await fetchExplanation(content);
    console.log(explanation);
  } catch (error) {
    console.error("Error fetching explanation:", error);
  }
}