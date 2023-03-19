import { Configuration, OpenAIApi } from "openai";

const configuartion = new Configuration({
  organization: "org-WQO1ovLyj4HiMebWzbZJl3Ck",
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuartion);

export const generatePropmts = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
  });
  return response.data.choices[0].text;
};
