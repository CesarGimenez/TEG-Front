import React, { useState } from "react";
import { Button, Form, Label } from "semantic-ui-react";

export const RequestUserHistory = ({ user, onValidate, onClose }) => {
  const [inputPass, setInputPass] = useState(null);
  const [validate, setValidate] = useState(null);
  const validateSecret = (pass) => {
    if (pass != user?.secret_word) {
      setValidate(false);
    } else {
      setValidate(true);
      onValidate();
      onClose();
    }
  };
  return (
    <>
      <span>
        Para visualizar la historia medica del paciente, se requiere que el
        mismo le otorgue una clave de acceso secreta
      </span>
      <Form>
        <Form.Input
          placeholder="Ingrese clave de acceso"
          label="Clave de acceso"
          onChange={(e) => setInputPass(e.target.value)}
        />

        <Button onClick={() => validateSecret(inputPass)}>Comprobar</Button>
        {validate === false && <Label>La clave ingresada no coincide</Label>}
      </Form>
    </>
  );
};
