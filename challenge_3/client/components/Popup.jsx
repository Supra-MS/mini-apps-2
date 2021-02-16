import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Popup = ({ isActiveGame, modal, toggle, totalScore, reset }) => {
  return (
    <>
      {!isActiveGame &&
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle} >!! TOTAL SCORE !!</ModalHeader>
            <ModalBody>{totalScore}</ModalBody>
            <ModalFooter className="justify-content-center">
              <button className="reset" onClick={reset}>New Game</button>
            </ModalFooter>
        </Modal>
      }
    </>
  );
};

export default Popup;
