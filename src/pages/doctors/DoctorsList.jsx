import React from "react";
import { Button, Card, Header, Icon, Image, Label } from "semantic-ui-react";

export const DoctorsList = ({ doctors, showInfoContact }) => {
  return (
    <div className="layout">
      {doctors?.map((doc) => {
        return (
          <Card key={doc?._id} className="card__doctor">
            {doc.is_verified && (
              <div className="verified_dr">
                <Icon name="check circle" /> <p>Especialista verificado</p>
              </div>
            )}
            <Image
              src={
                doc?.image
                  ? doc.image
                  : doc?.gender == "F"
                  ? "https://res.cloudinary.com/dl57f2zr5/image/upload/v1669255864/female_avatar_jxz4ky.svg"
                  : "https://res.cloudinary.com/dl57f2zr5/image/upload/v1669255864/male_avatar_bqtyqi.svg"
              }
              size="tiny"
              circular
            />
            <Header as="h4">
              {doc?.gender === "M" ? "Dr." : "Dra."} {doc?.first_name}{" "}
              {doc?.last_name}
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
            <Button onClick={() => showInfoContact(doc)}>
              Información de contacto
            </Button>
          </Card>
        );
      })}
    </div>
  );
};
