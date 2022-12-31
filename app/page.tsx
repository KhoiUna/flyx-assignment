"use client";

import axios from "axios";
import { useState } from "react";
import MentionBox from "../components/MentionBox";
import { SyntheticEvent, useRef } from "react";

const fetchGenerateNameEmail = async () => {
  const { data } = await axios.get("/api/generate");
  return data;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  // const [people, setPeople] = useState([]);
  const people = [
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
  ];

  const handleClick = async () => {
    setIsLoading(true);
    // setPeople([]);

    const res = await fetchGenerateNameEmail();

    // setPeople(res.success);
    setIsLoading(false);
  };

  const mentionBoxCoord = useRef({
    top: 0,
    left: 0,
  });

  const [mentioned, setMentioned] = useState(false);
  const handleChange = (event: SyntheticEvent) => {
    const textarea = event.target as HTMLTextAreaElement;
    const userInput: string = textarea.value;

    mentionBoxCoord.current.left = textarea.offsetLeft + 200;
    mentionBoxCoord.current.top = textarea.offsetTop;

    if (userInput[userInput.length - 1] === "@") {
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

      {isLoading && people.length === 0 && (
        <div className="bg-white rounded-lg p-2 mt-3">
          <p>Please wait...</p>
        </div>
      )}
      {!(people.length > 0) && (
        <div className="bg-white rounded-lg p-2 mt-3">
          {people.map((person, index) => (
            <p key={index}>
              {index + 1}. {JSON.stringify(person)}
            </p>
          ))}
        </div>
      )}

      <div className="mt-6">
        <textarea
          id="textarea"
          onChange={handleChange}
          className="border-black border-2 p-3 mt-2 rounded-lg bg-white resize-none"
          placeholder="Type @ to mention"
          cols={20}
          rows={10}
        ></textarea>

        {mentioned && (
          <MentionBox coord={mentionBoxCoord.current} people={people} />
        )}
      </div>
    </div>
  );
}
