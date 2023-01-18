import React from "react";
import { Button, Card, Header, Image } from "semantic-ui-react";

export const PharmaciesList = ({ pharmacies, showLocationPharmacy }) => {
  return (
    <div className="layout">
      {pharmacies?.map((pharmacy) => {
        return (
          <Card key={pharmacy?._id} className="pharmacy__card">
            <Header as="h4">{pharmacy?.name}</Header>
            <div className="pharmacy__card2">
              <div className="pharmacy_basic">
                <Image
                  src="https://w7.pngwing.com/pngs/651/1015/png-transparent-pharmacy-modafinil-generic-drug-health-care-pharmaceutical-drug-pharmacy-orange-people-logo-thumbnail.png"
                  size="tiny"
                  circular
                />
              </div>
              <div className="pharmacy_info">
                <p as="h4">Dirección: {pharmacy?.address}</p>
                <p as="h4">Número de teléfono: {pharmacy?.phones}</p>
                <p as="h4">Horario de atención: {pharmacy?.hours || "S/H"}</p>
              </div>
            </div>
            <Button
              onClick={() => showLocationPharmacy(pharmacy)}
              className="btn__location"
              circular
            >
              Ver ubicación{" "}
            </Button>
          </Card>
        );
      })}
    </div>
  );
};
