"use client";

import axios from "axios";
import { useState } from "react";
import MentionBox from "../components/MentionBox";
import { SyntheticEvent, useRef, ReactNode } from "react";

const moveCursorToEndContenteditable = (
  contentEditableElement: HTMLDivElement
) => {
  if (document.createRange) {
    // Create a range (a range is a like the selection but invisible)
    const range = document.createRange();

    // Select the entire contents of the element with the range
    range.selectNodeContents(contentEditableElement);

    // Collapse the range to the end point. false means collapse to end rather than the start
    range.collapse(false);

    // Get the selection object (allows you to change selection)
    const selection = window.getSelection();

    // Remove any selections already made
    selection!.removeAllRanges();

    // Make the range you have just created the visible selection
    selection!.addRange(range);
  }
};

const fetchGenerateNameEmail = async () => {
  const { data } = await axios.get("/api/generate");
  return data;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  // const [people, setPeople] = useState([]);

  const people: {
    [key: string]: string[];
  } = {
    employee: [
      "John - john.smith@email.com",
      "Sarah - sarah.jones@email.com",
      "Adam - adam.smith@email.com",
      "Kelly - kelly.brown@email.com",
      "Emily - emily.wilson@email.com",
      "Ryan - ryan.mcginnis@email.com",
      "Stephanie - stephanie.brown@email.com",
      "Tom - tom.thompson@email.com",
      "Bill - bill.dunlap@email.com",
      "Karen - karen.brown@email.com",
      "Tony - anthony.sanchez@email.com",
      "John - john.doe@email.com",
      "Sarah - sarah.jones@email.com",
      "Adam - adam.smith@email.com",
    ],
    customer: [
      "Kelly - kelly.brown@email.com",
      "Emily - emily.wilson@email.com",
      "Ryan - ryan.mcginnis@email.com",
      "Stephanie - stephanie.brown@email.com",
      "Tom - tom.thompson@email.com",
      "Bill - bill.dunlap@email.com",
      "Karen - karen.brown@email.com",
      "Tony - anthony.sanchez@email.com",
      "John - john.doe@email.com",
      "Sarah - sarah.jones@email.com",
      "Adam - adam.smith@email.com",
    ],
  };

  const handleClick = async () => {
    setIsLoading(true);
    // setPeople([]);

    // const res = await fetchGenerateNameEmail();

    // setPeople(res.success);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const mentionBoxCoord = useRef({
    top: 0,
    left: 0,
  });

  const [content, setContent] = useState<string | ReactNode>("");
  const [mentioned, setMentioned] = useState(false);
  const handleInput = (event: SyntheticEvent) => {
    const contentEditable = event.target as HTMLDivElement;
    const userInput = contentEditable.innerText;

    setContent(userInput);
    moveCursorToEndContenteditable(contentEditable);

    if (userInput[userInput.length - 1] === "@") {
      mentionBoxCoord.current.left = contentEditable.offsetLeft + 400;
      mentionBoxCoord.current.top = contentEditable.offsetTop;
      return setMentioned(true);
    }

    return setMentioned(false);
  };

  return (
    <div className="text-center p-5 bg-slate-50 min-h-screen">
      <button
        className="bg-white p-2 rounded-lg shadow-lg"
        onClick={handleClick}
      >
        {!isLoading && "Generate"}
        {isLoading && "Generating..."}
      </button>

      {(isLoading || !people) && (
        <div className="bg-white rounded-lg p-2 mt-3">
          <p>Please wait...</p>
        </div>
      )}
      {people && (
        <div className="bg-white rounded-lg p-2 mt-3 hidden">
          {Object.keys(people).map((key) =>
            people[key].map((person: string, index: number) => (
              <p key={index}>
                {index + 1}. <b>{key}</b> {person}
              </p>
            ))
          )}
        </div>
      )}

      <div className="mt-6">
        <div
          id="content_editable"
          contentEditable={true}
          onInput={handleInput}
          className="border-black border-2 p-3 m-auto mt-2 rounded-lg bg-white w-[400px] h-[500px] text-left"
        >
          {content}
        </div>

        <MentionBox
          coord={mentionBoxCoord.current}
          people={people}
          opened={mentioned}
          toggle={() => {
            setMentioned(false);
            const contentEditableElement =
              document.querySelector<HTMLDivElement>("#content_editable")!;

            contentEditableElement!.focus();
            moveCursorToEndContenteditable(contentEditableElement);
          }}
        />
      </div>
    </div>
  );
}
