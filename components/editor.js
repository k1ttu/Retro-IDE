"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Switch, Transition } from "@headlessui/react";
import "../app/globals.css";

export default function Editor() {
  const res1 = {
    output: "",
  };
  const url = "https://code-compiler10.p.rapidapi.com/";

  const url2 = "https://chatgpt-42.p.rapidapi.com/conversationgpt4";

  const [result, setResult] = useState(res1.output);

  //   Ignore following lines
  const langs = [
    "php",
    "python",
    "c",
    "c_cpp",
    "csharp",
    "kotlin",
    "golang",
    "r",
    "java",
    "typescript",
    "nodejs",
    "ruby",
    "perl",
    "swift",
    "fortran",
    "bash",
  ];
  const langs2 = [
    {
      id: "php",
      name: "Php",
      code: `<?php

// Your PHP code here
`,
    },
    {
      id: "python",
      name: "Python",
      code: `def main():
    # Your Python code here
`,
    },
    {
      id: "c",
      name: "C",
      code: `#include <stdio.h>

int main() {
    // Your C code here
    return 0;
}
`,
    },
    {
      id: "c_cpp",
      name: "C++",
      code: `#include <iostream>

int main() {
    // Your C++ code here
    return 0;
}
`,
    },
    {
      id: "csharp",
      name: "Csharp",
      code: `using System;

class Program {
    static void Main() {
        // Your C# code here
    }
}
`,
    },
    {
      id: "kotlin",
      name: "Kotlin",
      code: `fun main() {
    // Your Kotlin code here
}
`,
    },
    {
      id: "golang",
      name: "Golang",
      code: `package main

import "fmt"

func main() {
    // Your Go code here
}
`,
    },
    {
      id: "r",
      name: "Ruby",
      code: `puts "Your Ruby code here"
`,
    },
    {
      id: "java",
      name: "Java",
      code: `public class Main {
    public static void main(String[] args) {
        // Your Java code here
    }
}
`,
    },
    {
      id: "typescript",
      name: "Typescript",
      code: `console.log("Your TypeScript code here");
`,
    },
    {
      id: "nodejs",
      name: "Nodejs",
      code: `console.log("Your Node.js code here");
`,
    },
    {
      id: "ruby",
      name: "Ruby",
      code: `puts "Your Ruby code here"
`,
    },
    {
      id: "perl",
      name: "Perl",
      code: `#!/usr/bin/perl

# Your Perl code here
`,
    },
    {
      id: "swift",
      name: "Swift",
      code: `print("Your Swift code here")
`,
    },
    {
      id: "fortran",
      name: "Fortran",
      code: `program Main
  ! Your Fortran code here
end program Main
`,
    },
    {
      id: "bash",
      name: "Bash",
      code: `#!/bin/bash

# Your Bash script here
`,
    },
  ];
  const [code, setCode] = useState(langs2.at(8).code);
  const [lang, setLang] = useState("java");
  const [selected, setSelected] = useState("Java");
  const [analysis, setAnalysis] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [inp, setInp] = useState("");

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-compile": "rapidapi",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "9887b3b350mshaa96a50c40296abp1a8799jsn3a8000797050",
      "X-RapidAPI-Host": "code-compiler10.p.rapidapi.com",
    },
    body: JSON.stringify({
      langEnum: [
        "php",
        "python",
        "c",
        "c_cpp",
        "csharp",
        "kotlin",
        "golang",
        "r",
        "java",
        "typescript",
        "nodejs",
        "ruby",
        "perl",
        "swift",
        "fortran",
        "bash",
      ],
      lang: `${lang}`,
      code: `${code}`,
      input: "",
    }),
  };

  const options2 = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "aa386c2696msh594fdee1d036dbcp18658djsn8274ba14bfc1",
      "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: `${code}`,
        },
      ],
      system_prompt:
        "You will be provided a piece of code, return only it's time and space complexity in big-O notation with only one line of 10 words at maximum as explanation, ignore any errors in code.",
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    }),
  };

  //   end

  //   Funtions
  const [audio, setAudio] = useState( null );
  const [play, setPlay] = useState(0);
  const runCode = async () => {
    try {
      setResult("Compiling...");
      const response = await fetch(url, options);
      const answer = await response.text();
      const ans = JSON.parse(answer);

      setResult(ans.output);
      if (enabled) {
        setAnalysis("Analyising code...");
        const response2 = await fetch(url2, options2);
        const result = await response2.text();
        const analy = JSON.parse(result);
        setAnalysis(analy.result);
      }
    } catch (e) {
      setResult(e);
    }
  };
  const [font, setFont] = useState("font-sans");
  function changelang(e) {
    setLang(e);
  }

  function formatCode(inputCode) {
    // Regular expression to match multiline strings
    const multilineStringRegex =
      /(`([^`\\]|\\.)*`|'([^'\\]|\\.)*'|"[^"\\]*(\\.[^"\\]*)*")/g;

    // Extract and replace multiline strings with placeholders
    const stringPlaceholders = [];
    let formattedCode = inputCode.replace(multilineStringRegex, (match) => {
      const placeholder = `___STRING_PLACEHOLDER_${stringPlaceholders.length}___`;
      stringPlaceholders.push({ placeholder, value: match });
      return placeholder;
    });

    // Split the code into lines
    const lines = formattedCode.split("\n");

    // Determine the indentation level of the first non-empty line
    let indentationLevel = 0;
    for (const line of lines) {
      if (line.trim() !== "") {
        indentationLevel = line.search(/\S|$/);
        break;
      }
    }

    // Indent the code based on the indentation level
    formattedCode = lines
      .map((line, index) => {
        // Restore multiline strings
        stringPlaceholders.forEach(({ placeholder, value }) => {
          line = line.replace(placeholder, value);
        });

        // Remove excess leading whitespaces and adjust indentation
        if (index === 0 || line.trim() === "") {
          return line; // Preserve leading comments and empty lines
        } else {
          return " ".repeat(indentationLevel) + line.trim();
        }
      })
      .join("\n");

    setCode(formattedCode);
  }

  function format() {
    formatCode(inp);
    setInp("");
  }

  function updateCode(e) {
    setAudio( new Audio( './keypress.mp3' ));
    if (play % 2 == 0) {
      audio?.play();
    }
    setPlay(play + 1);
    setCode(e.target.value);
    setInp(e.target.value);
  }

  function updateResult(e) {
    setResult(e.target.value);
  }
  function clearScreen() {
    setResult("//Output here");
  }
  function changeMode(e) {
    setMode(e.target.value);
  }
  function updateAnalysis(e) {
    setAnalysis("Analysing code...");
    setAnalysis(e.target.value);
  }
  const [retro, setRetro] = useState(true);
  function updateRetro() {
    setRetro(!retro);
  }

  return (
    <>
      <main className="flex w-full my-3 py-2 px-2 md:px-6 flex-col ">
        {retro ? (
          <>
            <audio id="keyPress" src="./keypress.mp3"></audio>
            <video
              autoPlay
              loop
              muted
              className=" left-0 top-0 opacity-50 h-full min-w-full max-w-none fixed -z-10"
              src={"./background.mp4"}
            ></video>
          </>
        ) : null}
        <div className="flex flex-row justify-end mx-2 py-2">
          <Switch
            checked={retro}
            onClick={updateRetro}
            className={`${
              retro
                ? "bg-red-500 border-gray-600"
                : "bg-transparent border-gray-600"
            }
                            relative z-10 inline-flex h-[28px] w-[55px] shrink-0 resize-none cursor-pointer
                            rounded-full border-2 border-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-1  focus-visible:ring-white/75`}
          >
            <span
              aria-hidden="true"
              className={`${retro ? "translate-x-7" : "translate-x-0"}
                                pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full z-10 focus: bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            ></span>
          </Switch>
          <button
            className={`${
              retro
                ? "mx-2 bg-transparent w-fit text-gray-300 hover:text-gray-100 px-2 border hover:border-gray-400  shadow-white z-10 border-gray-600  rounded-lg"
                : "mx-2 bg-transparent w-fit text-gray-300 hover:text-gray-100 px-2 border hover:border-gray-400 font-sans  shadow-white z-10 border-gray-600  rounded-lg"
            }`}
            onClick={format}
          >
            Format
          </button>
          <button
            className={`${
              retro
                ? "mx-2 bg-transparent w-fit text-gray-300 hover:text-gray-100 px-2 border hover:border-gray-400  shadow-white z-10 border-gray-600  rounded-lg"
                : "mx-2 bg-transparent w-fit text-gray-300 hover:text-gray-100 px-2 border hover:border-gray-400 font-sans  shadow-white z-10 border-gray-600  rounded-lg"
            }`}
            onClick={runCode}
          >
            <span className=" font-extrabold rotate-180"> ▷ </span> Run
          </button>
          <div className="w-32 mx-3">
            <Listbox value={lang} defaultValue={"Java"}>
              <div className="relative mt-1 z-10">
                <Listbox.Button
                  className="relative w-full cursor-default rounded-lg bg-transparent border border-gray-600 text-white py-1 pl-3 text-left shadow-md focus:outline-none
                            hover:border-gray-300
                            focus-visible:border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm flex justify-between"
                >
                  <span className="block truncate">{lang}</span>
                  <span className="items-center inline-block rotate-90 mx-2 font-2xl">
                    ˃
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-40 z-10 overflow-auto rounded-md bg-black border border-gray-600 py-1 text-base  sm:text-sm">
                    {langs2.map((item, index) => {
                      let active = lang == item.id;
                      return (
                        <Listbox.Option
                          onClick={() => {
                            changelang(item.id);
                          }}
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-4 pr-4 ${
                              active
                                ? " bg-gray-900 text-gray-100"
                                : "text-gray-400"
                            }`
                          }
                        >
                          <span
                            className={`block truncate ${
                              active
                                ? " text-gray-100"
                                : "font-normal text-gray-400"
                            }`}
                          >
                            {item.name}
                          </span>
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between my-3 mx-2 w-full">
          <div className="flex flex-col mx-2 md:w-1/2">
            <span
              className={`${
                retro
                  ? " text-white/45 text-lg px-2 border border-gray-600 w-fit rounded-t-xl"
                  : "text-white text-lg px-2 border border-gray-600 w-fit font-sans rounded-t-xl"
              }`}
            >
              Input
            </span>
            <textarea
              className={
                `${
                  retro
                    ? " font-extralight text-sm text-white/70 cursor  caret-red-700 "
                    : "font-mono "
                }` +
                "bg-transparent text-gray-300 max-h-fit shadow-none  rounded-b-xl border border-gray-600 px-2 resize-none py-2 min-h-fit w-full z-10 focus:outline-none "
              }
              rows={27}
              value={code}
              type="text"
              spellCheck="false"
              onChange={updateCode}
              placeholder="Input goes here"
            />
          </div>
          <div className="flex flex-col mr-2 md:w-1/2">
            <span
              className={`${
                retro
                  ? " text-white/45 text-lg px-2 border border-gray-600 w-fit rounded-t-xl"
                  : "text-white text-lg px-2 border border-gray-600 w-fit font-sans rounded-t-xl"
              }`}
            >
              Output
            </span>
            <textarea
              className={
                `${
                  retro
                    ? " font-extralight text-sm text-white/70 cursor  caret-red-700 "
                    : "font-mono "
                }` +
                "bg-transparent text-gray-300 max-h-fit shadow-none  rounded-b-xl border border-gray-600 px-2 resize-none py-2 min-h-fit w-full  focus:outline-none "
              }
              rows={12}
              value={result}
              onChange={updateResult}
              minLength={10}
              spellCheck="false"
              contentEditable="false"
              placeholder="Expect your output here upon clicking Run"
            />
            <div className="flex flex-col my-2">
              <div className="border flex  py-1 border-gray-600 w-fit rounded-t-xl px-2">
                <span
                  className={`${
                    retro
                      ? " text-white/45 text-lg px-2  border-black w-fit rounded-t-xl"
                      : "text-white font-sans text-lg px-2 border-gray-800 w-fit"
                  }`}
                >
                  Enable code Analysis
                </span>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled
                      ? "bg-gray-500 border-gray-600"
                      : "bg-transparent border-gray-600"
                  }
                            relative inline-flex h-[28px] w-[55px] shrink-0 resize-none cursor-pointer rounded-full border-2 border-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-1  focus-visible:ring-white/75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-6" : "translate-x-0"}
                                pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full focus: bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <textarea
                className={
                  `${
                    retro
                      ? " font-extralight text-sm text-white/70 cursor  caret-red-400 "
                      : "font-mono "
                  }` +
                  "bg-transparent text-gray-300 max-h-fit shadow-none  rounded-b-xl border border-gray-600 px-2 resize-none py-2 min-h-fit w-full z-10 focus:outline-none "
                }
                rows={12}
                value={analysis}
                placeholder="Analysis will appear here"
                spellCheck="false"
                onChange={updateAnalysis}
                contentEditable="false"
              />
            </div>
          </div>
        </div>
      </main>
      {retro ? (
        <>
          <audio id="keyPress" src="./keypress.mp3"></audio>
          <video
            autoPlay
            loop
            muted
            className=" left-0 top-0 opacity-0 h-full min-w-full fixed -z-10"
            src={"./background.mp4"}
          ></video>
        </>
      ) : null}
    </>
  );
}
