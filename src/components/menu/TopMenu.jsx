import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { useAuth } from "../../hooks/useAuth";

export const TopMenu = () => {
  const { auth, logout } = useAuth();
  const { user } = auth;
  return (
    <Menu fixed="top" className="top-menu">
      <Menu.Item className="top-menu__logo">Sistema</Menu.Item>

      <Menu.Item position="right">
        <Menu.Item>
          Hola, {user.first_name} {user.last_name}
        </Menu.Item>
        <Menu.Item onClick={() => logout()}>
          <Icon name="sign-out" />
        </Menu.Item>
      </Menu.Item>
    </Menu>
  );
};
