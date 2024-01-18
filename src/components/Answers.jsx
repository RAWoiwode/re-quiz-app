import React, { useRef } from "react";

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  const shuffledAnswersRef = useRef();

  if (!shuffledAnswersRef.current) {
    shuffledAnswersRef.current = [...answers];
    shuffledAnswersRef.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswersRef.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let classes = "";

        if (answerState === "answered" && isSelected) {
          classes = "selected";
        } else if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          classes = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button className={classes} onClick={() => onSelect(answer)}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
