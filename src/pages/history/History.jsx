import React from "react";
import { Card, Header } from "semantic-ui-react";

export const History = () => {
  return (
    <div>
      <Card fluid centered>
        <Header as="h1">Mi historial medico</Header>
        <div className="layout_menu_pharmacy">
          <Header as="h3">Diagnosticos</Header>
        </div>
        <div className="layout_menu_pharmacy">
          <Header as="h3">Archivos almacenados</Header>
        </div>
      </Card>
    </div>
  );
};
