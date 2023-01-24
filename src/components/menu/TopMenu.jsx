import React from "react";
import { Header, Icon, Image, Menu } from "semantic-ui-react";
import { useAuth } from "../../hooks/useAuth";

export const TopMenu = () => {
  const { auth, logout } = useAuth();
  const { user } = auth;
  return (
    <Menu fixed="top" className="top-menu">
      <Menu.Item className="top-menu__logo">
        <Header size="huge" color="blue">
          <Image
            src={
              "https://res.cloudinary.com/dl57f2zr5/image/upload/v1674012358/LOGO_MEDICPASS-07_wodwjf.png"
            }
          />
          MedicPass
        </Header>
      </Menu.Item>

      <Menu.Item position="right">
        <Menu.Item>
          <Header color="blue" size="medium">
            Sesión de{" "}
            {user?.is_doctor
              ? "Médico"
              : user?.is_admin
              ? "Administrador"
              : "Paciente"}
            , {user.first_name} {user.last_name}
          </Header>
        </Menu.Item>
        <Menu.Item onClick={() => logout()}>
          <Header size="medium">
            <Icon name="sign-out" />
          </Header>
        </Menu.Item>
      </Menu.Item>
    </Menu>
  );
};
