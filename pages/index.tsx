import Head from "next/head";
import { Inter } from "next/font/google";
import { AiOutlineSend } from "react-icons/ai";
import { generatePropmts } from "@/utils/openai";
import { FormEvent, useState } from "react";
import { SyncLoader } from "react-spinners";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState([""]);
  const [disabled, setDisabled] = useState(false);
  const [focus, setFocus] = useState(true);
  const [warning, setWarning] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    setTimeout(() => {
      setWarning(true);
    }, 5000);
    e.preventDefault();
    const question = inputValue;
    setChat((prev) => [...prev, question]);
    setInputValue("");
    const prompts = generatePropmts(question);
    console.log(prompts);
    prompts
      .then((result) => {
        const answer = result as string;
        setChat((prev) => [...prev, answer]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDisabled(false);
        setFocus(true);
        setWarning(false);
      });
  };

  return (
    <>
      <Head>
        <title>BrainstormAI</title>
        <meta name="description" content="chatgpt-like chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <div className="">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-center py-10">
              Welcome to BrainstormAI
            </h1>
            <p className="text-lg w-96 text-teal-300">
              you have A brainstorm? discuss it with brainstromAI and see what
              it tells you about it
            </p>
            <div>
              <div className="w-96 h-[500px] border border-gray-600 bg-gray-800 mt-10 rounded-lg overflow-y-scroll">
                <ul className="m-2 p-2 rounded flex flex-col-reverse gap-5">
                  {chat &&
                    chat
                      .filter((text) => text !== "")
                      .map((text, index) => (
                        <li
                          key={index}
                          className="odd:bg-teal-500 even:bg-teal-700 p-2 odd:rounded-tl-lg odd:rounded-tr-lg odd:rounded-br-lg even:rounded-tl-lg even:rounded-tr-lg even:rounded-bl-lg w-fit even:place-self-end"
                        >
                          {text}
                        </li>
                      ))}
                </ul>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-96 h-12 px-2 border border-gray-600 bg-gray-800 mt-5 rounded-full flex items-center justify-between"
              >
                {disabled && (
                  <SyncLoader className="text-sm" color="teal" size={7} />
                )}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="rounded-full p-2 m-2 w-full bg-transparent outline-none"
                  placeholder={
                    !disabled
                      ? "what's your brainstorm?..."
                      : "generating answer..."
                  }
                  disabled={disabled}
                  autoFocus={focus}
                />
                <button type="submit" disabled={disabled}>
                  <AiOutlineSend className="m-2 text-3xl" />
                </button>
              </form>
              {warning && (
                <p className="text-red-500 text-xs my-4 w-96">
                  NOTE: if you waited too much it is due to api problem, please
                  refresh the page
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
