import { Configuration, OpenAIApi } from "openai";

const configuartion = new Configuration({
  organization: "org-WQO1ovLyj4HiMebWzbZJl3Ck",
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuartion);

export const generatePropmts = async (prompt: string) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
  });

  return response.data.choices[0].message?.content;
};
