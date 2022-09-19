import React from "react";
import { Button, Card, Header, Image } from "semantic-ui-react";
import { useAuth } from "../../hooks/useAuth";

export const UserProfile = () => {
  const { auth } = useAuth();
  const { user } = auth;
  return (
    <Card fluid centered>
      <div className="user_header">
        <Header as="h1" color="blue">
          Hola de nuevo, {user.first_name} {user.last_name}
        </Header>
        <Button> Editar perfil </Button>
      </div>
      <div className="user_home">
        <Image
          src="https://react.semantic-ui.com/images/wireframe/square-image.png"
          size="medium"
          circular
        />
        <div className="user_home__info">
          <Header as="h3">Fecha de nacimiento: {user.birthdate}</Header>
          <Header as="h3">Correo: {user.email}</Header>
          <Header as="h3">Numero de telefono: {user.phone}</Header>
          <Header as="h3">Contacto de emergencia: {user.parent_phone}</Header>
        </div>
      </div>
      <div className="parents_registered">
        {user?.family ? (
          <div>
            <Header as="h1" color="blue">
              Familiares registrados (ni;os y adultos mayores)
            </Header>
            <Button> Agregar nuevos familiares</Button>
          </div>
        ) : (
          <Button> Agregar un familiar (Ni;o o adulto mayor)</Button>
        )}
      </div>
    </Card>
  );
};
