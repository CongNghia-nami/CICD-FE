import React, { useEffect, useState } from "react";
import "./DetailQuiz.scss";
import _ from "lodash";
import ModalResultQuiz from "./ModalResultQuiz";
const Question = (props) => {
  const { groupedData, saveAnswer, selectedAnswers, onFinish } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  useEffect(() => {
    const currentQuestionId = groupedData[currentQuestionIndex]?.id;
    setSelectedAnswer(selectedAnswers[currentQuestionId] || null);
  }, [currentQuestionIndex, selectedAnswers, groupedData]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < groupedData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRadioChange = (answerId) => {
    setSelectedAnswer(answerId);
    const questionId = groupedData[currentQuestionIndex]?.id;
    saveAnswer(questionId, answerId);
  };

  const currentQuestion = groupedData[currentQuestionIndex];
  if (_.isEmpty(groupedData)) {
    return <div>Loading...</div>;
  }

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
  };

  return (
    <>
      <div className="question-block ms-3">
        <div className="title-small">
          Câu hỏi: {currentQuestion.questionDecription}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0px",
          }}
        >
          <img
            src={`data:image/jpeg;base64,${currentQuestion.image}`}
            className="rounded-3"
            alt="Question"
          />
        </div>
        {currentQuestion.answers.map((answer) => (
          <div key={answer.id} className="title-answer">
            <input
              className="form-check-input me-2"
              type="radio"
              id={`flexRadioDefault_${answer.id}`}
              name="flexRadioDefault"
              onChange={() => handleRadioChange(answer.id)}
              checked={selectedAnswer === answer.id}
            />
            {answer.description}
          </div>
        ))}
      </div>
      <div className="btnAdjust">
        <button
          className="me-2 btn btn-danger"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          &lt;&lt;
        </button>
        <button
          className="btn btn-danger"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === groupedData.length - 1}
        >
          &gt;&gt;
        </button>
        <button className="btn btn-warning ms-2" onClick={onFinish}>
          Finish
        </button>
      </div>

      <ModalResultQuiz
        show={showModalDeleteUser}
        onHide={() => setShowModalDeleteUser(false)}
      ></ModalResultQuiz>
    </>
  );
};

export default Question;
