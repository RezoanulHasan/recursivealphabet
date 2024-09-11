import React, { useState } from "react";
import "./common.css";
import { Link } from "react-router-dom";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const AlphabetTileInteraction: React.FC = () => {
  const [outputString, setOutputString] = useState<string>("");

  const handleTileClick = (letter: string) => {
    let newOutputString = outputString + letter;
    newOutputString = replaceConsecutiveLetters(newOutputString);
    setOutputString(newOutputString);
  };

  const replaceConsecutiveLetters = (str: string): string => {
    let result = "";
    let i = 0;
    while (i < str.length) {
      let count = 1;
      while (i + count < str.length && str[i] === str[i + count]) {
        count++;
      }
      if (count >= 3) {
        result += "_".repeat(count);
      } else {
        result += str.slice(i, i + count);
      }
      i += count;
    }
    return result;
  };

  return (
    <>
      <div className="text-center flex justify-center ">
        <Link to="/layout">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4   text-center flex justify-center rounded">
            Click here Go to Layout Builder
          </button>
        </Link>
      </div>
      <div className="Alphabet    mb-10  mt-20">
        <h1 className="text-center text-2xl font-semibold mb-20 text-blue-600">
          Test Alphabet Tile{" "}
        </h1>
        <div className="mb-20 font-bold  text-3xl    " id="outputString">
          {outputString}
        </div>
        <div className="grid-container mt-10">
          {ALPHABET.split("")?.map((letter) => (
            <div
              key={letter}
              className="tile"
              onClick={() => handleTileClick(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AlphabetTileInteraction;
