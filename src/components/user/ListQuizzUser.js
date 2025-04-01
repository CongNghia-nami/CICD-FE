import React, { useEffect, useState } from "react";
import { getQuizByUser } from "../service/apiService";
import "./ListQuizzUser.scss";
import { useNavigate } from "react-router-dom";

const ListQuizzUser = () => {
  const [arrQuizz, setArrQuizz] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    try {
      const res = await getQuizByUser();
      if (res && res.data && res.data.EC === 0) {
        console.log("Quiz data received:", res.data.DT);
        setArrQuizz(res.data.DT);
      } else {
        console.error("Failed to fetch quizzes:", res.data.EM);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  return (
    <div className="container-design">
      <div className="main">
        {arrQuizz &&
          arrQuizz.length > 0 &&
          arrQuizz.map((quiz, index) => (
            <div className="card" key={index}>
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "5px",
                }}
              >
                <img
                  style={{ display: "block", width: "180px" }}
                  id="base64image"
                  src={`data:image/jpeg;base64,${quiz.image}`}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Quiz: {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  type="button"
                  class="btn btn-info"
                  onClick={() => {
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizzTittle: quiz.description },
                    });
                  }}
                >
                  Search Detail
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListQuizzUser;
