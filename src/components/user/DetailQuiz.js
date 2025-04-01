import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./DetailQuiz.scss";
import { getDataQuestion, postFinishQuiz } from "../service/apiService";
import _ from "lodash";
import Question from "./Question";
import ModalResultQuiz from "./ModalResultQuiz";

const DetailQuiz = (props) => {
  const [groupedData, setGroupedData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showModal, setShowModal] = useState(false); // State to control modal display
  const params = useParams();
  const quizzid = params.id;
  const location = useLocation();
  const [dataModal, setDataModal] = useState({});

  const fetchQuestions = async () => {
    const res = await getDataQuestion(quizzid);

    if (res.data.EC === 0) {
      const grouped = _.chain(res.data.DT)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDecription,
            image = null;
          value.forEach((item, index) => {
            answers.push(item.answers);
            if (index === 0) {
              questionDecription = item.description;
              image = item.image;
            }
          });
          return { id: key, answers, questionDecription, image };
        })
        .value();
      setGroupedData(grouped);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizzid]);

  const saveAnswer = (questionId, answerId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleFinish = async () => {
    const result = {
      quizId: +quizzid,
      answers: Object.keys(selectedAnswers).map((questionId) => ({
        questionId: parseInt(questionId, 10),
        userAnswerId: [selectedAnswers[questionId]],
      })),
    };

    let res = await postFinishQuiz(result);
    console.log(res);

    if (("res", res.data.EC === 0)) {
      setDataModal({
        countCorrect: res.data.DT.countCorrect,
        countTotal: res.data.DT.countTotal,
      });
      // console.log("countCorrect", res.data.DT.countCorrect);
      setShowModal(true);
    }
  };

  return (
    <div className="container">
      <div className="detail-quiz-container">
        <div className="detail-left">
          <div className="titile-big ">{location?.state?.quizzTittle}</div>
          <Question
            groupedData={groupedData}
            saveAnswer={saveAnswer}
            selectedAnswers={selectedAnswers}
            onFinish={handleFinish} // Pass the handleFinish function
          />
        </div>
        <div className="detail-right"></div>
      </div>
      {showModal && (
        <ModalResultQuiz
          show={showModal}
          onHide={() => setShowModal(false)}
          dataModal={dataModal}
        />
      )}
    </div>
  );
};

export default DetailQuiz;
