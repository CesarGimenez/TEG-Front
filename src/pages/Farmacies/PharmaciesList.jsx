import React from "react";
import { Button, Card, Header, Image } from "semantic-ui-react";

export const PharmaciesList = ({ pharmacies, showLocationPharmacy }) => {
  return (
    <div className="layout">
      {pharmacies?.map((pharmacy) => {
        return (
          <Card key={pharmacy?._id} className="pharmacy__card">
            <div className="pharmacy__card2">
              <div className="pharmacy_basic">
                <Header as="h4">{pharmacy?.name}</Header>
                <Image
                  src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                  size="tiny"
                  circular
                />
              </div>
              <div className="pharmacy_info">
                <p as="h4">Direccion: {pharmacy?.address}</p>
                <p as="h4">Numero de telefono: {pharmacy?.phones}</p>
                <p as="h4">Horario de atencion: {pharmacy?.hours}</p>
              </div>
            </div>
            <Button
              onClick={() => showLocationPharmacy(pharmacy)}
              className="btn__location"
              circular
            >
              Ver ubicacion
            </Button>
          </Card>
        );
      })}
    </div>
  );
};
