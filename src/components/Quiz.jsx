import React, { useCallback, useState } from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
import Timer from "./Timer";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const activeIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizComplete = activeIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
      setAnswerState("answered");

      const timer = setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz completed" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <Timer key={activeIndex} time={10000} onTimeout={handleSkipAnswer} />
        <h2>{QUESTIONS[activeIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
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
                <button
                  className={classes}
                  onClick={() => handleSelectAnswer(answer)}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
