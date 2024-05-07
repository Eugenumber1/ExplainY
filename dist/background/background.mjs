var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});
export default function fetchExplanation(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatCompletion = yield openai.chat.completions.create({
            messages: [{ role: 'user', content: content }, { role: 'system', content: "Explain the input text in averagely simple words. Maximum 50 - 70 words." }],
            model: 'gpt-3.5-turbo',
        });
        return chatCompletion.choices[0].message.content;
    });
}
console.log(fetchExplanation("Iphone has a very specific design pattern of a smooth stone."));
