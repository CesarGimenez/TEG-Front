import React from "react";
import { Button, Card, Form, Grid } from "semantic-ui-react";

const optionsGender = [
  { key: "M", text: "Masculino", value: "M" },
  { key: "F", text: "Femenino", value: "F" },
  { key: "O", text: "Otro", value: "O" },
];

const optionsKinship = [
  { key: "Father", text: "Padre", value: "Father" },
  { key: "Mother", text: "Madre", value: "Mother" },
  { key: "Son", text: "Hijo", value: "Son" },
  { key: "Daughter", text: "Hija", value: "Daughter" },
];

export const AddEditFamily = () => {
  return (
    <div>
      <Grid>
        <Grid.Column style={{ width: 500 }}>
          <Form size="large">
            <Form.Input
              fluid
              label="Nombre"
              labelPosition="left"
              icon="user"
              iconPosition="left"
              placeholder="Nombre"
            />
            <Form.Input
              fluid
              label="Apellido"
              labelPosition="left"
              icon="user"
              iconPosition="left"
              placeholder="Apellido"
            />
            <Form.Input
              fluid
              label="Fecha de nacimiento"
              labelPosition="left"
              type="date"
              icon="user"
              iconPosition="left"
            />
            <Form.Dropdown
              label="Genero"
              labelPosition="left"
              fluid
              icon="sex"
              iconPosition="left"
              placeholder="Selecciona una opcion"
              selection
              options={optionsGender}
            />
            <Form.Dropdown
              fluid
              label="Parentezco"
              labelPosition="left"
              icon="kinship"
              iconPosition="left"
              placeholder="Selecciona una opcion"
              selection
              options={optionsKinship}
            />
            <Button>Agregar familiar</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};
