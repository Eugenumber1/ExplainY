import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export default async function fetchExplanation(content: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: content },{role: 'system', content:"Explain the input text in averagely simple words. Maximum 50 - 70 words."}],
    model: 'gpt-3.5-turbo',
  });
  return chatCompletion.choices[0].message.content
}


console.log(fetchExplanation("Iphone has a very specific design pattern of a smooth stone."));