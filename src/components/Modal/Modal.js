import React, { useEffect } from "react";
import "./Modal.css";

function Modal({ data, showModal, setShowModal }) {
  useEffect(() => {
    if (showModal) {
      document.querySelector("#modal").showModal();
    } else {
      document.querySelector("#modal").close();
    }
  }, [showModal]);

  return (
    <>
      <dialog id="modal">
        <img src={data.front}></img>
        <h5>
          {data.name
            ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
            : ""}
        </h5>
        <h5>Height: {data.height}</h5>
        <h5>Weight: {data.weight}</h5>
        <button id="close" onClick={() => setShowModal(false)}>
          Close
        </button>
      </dialog>
    </>
  );
}

export default Modal;
