import React from "react";
import { Modal } from "semantic-ui-react";
import "./ModalBasic.scss";

export const ModalBasic = ({ show, size, title, content, onClose }) => {
  return (
    <Modal className="modal-basic" open={show} onClose={onClose} size={size}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
    </Modal>
  );
};

ModalBasic.defaultProps = {
  size: "tiny",
};
