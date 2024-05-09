import { run } from './background';
import fetchMock from 'jest-fetch-mock';
// Setting up fetchMock for API calls
require('dotenv').config();


describe('background script', () => {
  describe('fetchExplanation', () => {
    const testText = 'test text';
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should call ChatGPT API and return expected result', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({
        choices: [{ message: { content: "Explained text" } }]
      }));

      // Execute
      const result = await run(testText);

      // Verify
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(apiEndpoint, {
        method: 'post',
        headers: {
           "authorization": `Bearer ${process.env['OPENAI_API_KEY']}`,
           "content-length": "243",
           "content-type": "application/json",
           "user-agent": "OpenAI/JS 4.42.0",
           "x-stainless-arch": "arm64",
           "x-stainless-lang": "js",
           "x-stainless-os": "MacOS",
           "x-stainless-package-version": "4.42.0",
           "x-stainless-runtime": "node",
           "x-stainless-runtime-version": "v22.1.0",
        },
        body: JSON.stringify({
          messages: 
            [
            {
              role: "user",
              content:`Explain: ${testText}`
            },
            {
              role: "system",
              content:`Explain the input text in averagely simple words. Maximum 50 - 70 words.`
            },
          ],
          model: "gpt-3.5-turbo",
        })
      });
      expect(result).toEqual('Explained text');
    });

    it('should handle API errors gracefully', async () => {
      // Setup
      fetchMock.mockReject(new Error('API failure'));

      // Execute
      const result = await run(testText);

      // Verify
      expect(fetchMock).toHaveBeenCalledWith(apiEndpoint, {
        method: 'post',
        headers: {
           "authorization": `Bearer ${process.env['OPENAI_API_KEY']}`,
           "content-length": "243",
           "content-type": "application/json",
           "user-agent": "OpenAI/JS 4.42.0",
           "x-stainless-arch": "arm64",
           "x-stainless-lang": "js",
           "x-stainless-os": "MacOS",
           "x-stainless-package-version": "4.42.0",
           "x-stainless-runtime": "node",
           "x-stainless-runtime-version": "v22.1.0",
        },
        body: JSON.stringify({
          messages: 
            [
            {
              role: "user",
              content:`Explain: ${testText}`
            },
            {
              role: "system",
              content:`Explain the input text in averagely simple words. Maximum 50 - 70 words.`
            },
          ],
          model: "gpt-3.5-turbo",
        })
      });
      expect(result).toEqual('Failed to fetch explanation.');
    });
  });
});
