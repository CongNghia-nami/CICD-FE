import React from "react";
import "./ModalResultQuiz.scss";

const ModalResultQuiz = (props) => {
  const { show, onHide, dataModal } = props;
  if (!dataModal) {
    return null;
  }
  console.log("dataModal", dataModal);

  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Quiz Result</h5>
            <button type="button" className="close" onClick={onHide}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>Total: {dataModal.countTotal}</p>
            <p>Anwer Correct: {dataModal.countCorrect}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalResultQuiz;
