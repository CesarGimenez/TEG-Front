import React, { useEffect } from "react";
import { Grid, Header, Label, Segment } from "semantic-ui-react";
import { useCenter } from "../../hooks/useCenter";

export const InfoContact = ({ doc }) => {
  const { getCentersByDoctor, centers } = useCenter();
  useEffect(() => {
    getCentersByDoctor(doc?._id);
  }, []);
  return (
    <div>
      {!doc?.is_verified && (
        <div style={{ margin: 10, textAlign: "center" }}>
          <Label color="red">
            Manten precaucion a la hora de consultar un medico no verificado por
            nuestros administradores
          </Label>
        </div>
      )}
      <Grid columns={2}>
        <Grid.Column>
          <Segment>
            <Header as="h4">Nombre:</Header>
            <span>
              {doc?.first_name} {doc.last_name}
            </span>
            <Header as="h4">Numero de contacto:</Header>
            <span>{doc?.phone}</span>
            <Header as="h4">Correo:</Header>
            <span>{doc?.email}</span>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header as="h4">Especialidades:</Header>
            {doc?.areas?.map((a) => {
              return <Label>{a?.name}</Label>;
            })}
          </Segment>
          <Segment>
            <Header as="h4">Lugares de atencion:</Header>
            {centers?.map((c) => {
              return <Label>{c?.name}</Label>;
            })}
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};
