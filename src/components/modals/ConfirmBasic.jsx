import React from "react";
import { Confirm } from "semantic-ui-react";

export const ConfirmBasic = ({ show, onCancel, onConfirm, title }) => {
  return (
    <div>
      <Confirm
        open={show}
        content={title}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  );
};
