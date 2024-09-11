import React, { useState } from "react";
import "./a.css";

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
    <div className="Alphabet   mt-20   mb-10">
      <div id="outputString">{outputString}</div>
      <div className="grid-container">
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
  );
};

export default AlphabetTileInteraction;
