import React, { useState, useEffect, useRef } from "react";

export const TypingLesson = ({ lesson }) => {
  const [userInput, setUserInput] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isLessonComplete, setIsLessonCompleted] = useState(false);
  const resetButtonRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (startTime && endTime) {
      const timeDiff = endTime - startTime;
      console.log("Time taken:", Math.floor(timeDiff / 1000), "seconds");
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (userInput.length === lesson.text.length || userInput === lesson.text) {
      setIsLessonCompleted(true);
      setEndTime(new Date());
    }
  }, [userInput, lesson.text]);

  useEffect(() => {
    if (isLessonComplete) {
      resetButtonRef.current.focus();
    }
  }, [isLessonComplete]);
  const handleChange = (event) => {
    if (!startTime) {
      setStartTime(new Date());
    }

    setUserInput(event.target.value);

    // Count mistakes (simple comparison for demo purposes)
    const mistakesCount = lesson.text
      .split("")
      .filter((char, index) => char !== event.target.value[index]).length;

    setMistakes(mistakesCount);
  };

  const calculateTimeTaken = () => {
    if (startTime && endTime) {
      const timeDiff = endTime - startTime;
      return Math.floor(timeDiff / 1000);
    }
    return 0;
  };

  const handleReset = () => {
    setUserInput("");
    setMistakes(0);
    setStartTime(null);
    setEndTime(null);
    setIsLessonCompleted(false);
    textAreaRef.current.focus();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{lesson.title}</h2>
      <div className="mb-4">
        {lesson.text.split("").map((char, index) => (
          <span
            key={index}
            className={`text-lg font-bold ${
              userInput[index] === char
                ? "text-green-500"
                : userInput[index]
                ? "text-red-500"
                : "text-black"
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      <textarea
        ref={textAreaRef}
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing here..."
        disabled={isLessonComplete}
        className={`w-full border p-2 ${
          isLessonComplete
            ? userInput === lesson.text
              ? "border-green-500"
              : "border-red-500"
            : ""
        }`}
      />
      <p className="mt-2">
        {isLessonComplete ? (
          <span>
            Lesson complete! Time taken: {calculateTimeTaken()} seconds
          </span>
        ) : (
          "Keep typing..."
        )}
      </p>
      {isLessonComplete && (
        <div className="mt-4">
          <p className="text-red-500 font-bold">Mistakes: {mistakes}</p>
          <button
            ref={resetButtonRef}
            onClick={handleReset}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
