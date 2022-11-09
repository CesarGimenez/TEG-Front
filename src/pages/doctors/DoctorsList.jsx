import React from "react";
import { Button, Card, Header, Icon, Image, Label } from "semantic-ui-react";

export const DoctorsList = ({ doctors }) => {
  return (
    <div className="layout">
      {doctors?.map((doc) => {
        return (
          <Card key={doc?._id}>
            {doc.is_verified && <Icon name="check circle" />}
            <Image
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              size="tiny"
              circular
            />
            <Header as="h4">
              {doc?.first_name} {doc?.last_name}
            </Header>
            <p as="h4">
              {doc?.areas?.length > 1 ? "Especialidades" : "Especialidad"}:{" "}
            </p>
            <Label.Group color="teal">
              {doc?.areas?.map((area) => {
                return <Label>{area.name}</Label>;
              })}
            </Label.Group>
            {/* <p as="h4">Numero de telefono: {pharmacy?.phones}</p>
                <p as="h4">Horario de atencion: {pharmacy?.hours}</p> */}
            <Button>Contactar/Agendar</Button>
          </Card>
        );
      })}
    </div>
  );
};
