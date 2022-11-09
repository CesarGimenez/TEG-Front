import React from "react";
import { Card, Menu, Segment } from "semantic-ui-react";
import "./AdminDashboard.scss";

export const AdminDashboard = () => {
  return (
    <div>
      <Card fluid centered>
        <Segment>
          <Menu fluid secondary>
            <Menu.Item name="Usuarios" />
            <Menu.Item name="Centros de salud" />
            <Menu.Item name="Farmacias" />
            <Menu.Item name="Medicamentos" />
            <Menu.Item name="Enfermedades" />
            <Menu.Item name="Areas" />
            <Menu.Item name="Reportes" />
          </Menu>
        </Segment>
      </Card>
    </div>
  );
};
