import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { UserProfile } from "../../../pages/userprofile/UserProfile";
import "./SideMenu.scss";
import { Farmacies } from "../../../pages/Farmacies/Farmacies";

export const SideMenu = () => {
  const { auth } = useAuth();

  const { pathname } = useLocation();
  return (
    <div className="side_menu">
      <Menu fixed="left" borderless className="side" vertical>
        <Menu.Item as={Link} to={"/"} active={pathname === "/"}>
          <Icon name="home" /> Mis datos
        </Menu.Item>

        <Menu.Item as={Link} to={"/history"} active={pathname === "/history"}>
          <Icon name="history" /> Mi historial Medico
        </Menu.Item>

        <Menu.Item
          as={Link}
          to={"/pharmacies"}
          active={pathname === "/pharmacies"}
        >
          <Icon name="heartbeat" /> Informacion Farmaceutica
        </Menu.Item>

        <Menu.Item as={Link} to={"/medical"} active={pathname === "/medical"}>
          <Icon name="user md" /> Atencion medica
        </Menu.Item>
        {auth?.user?.is_Admin && (
          <Menu.Item as={Link} to={"/admin"} active={pathname === "/admin"}>
            <Icon name="user" /> Administracion del sistema
          </Menu.Item>
        )}
        {auth?.user?.pharmacyadmin && (
          <Menu.Item
            as={Link}
            to={"/pharmadmin"}
            active={pathname === "/pharmadmin"}
          >
            <Icon name="medkit" /> Mi farmacia
          </Menu.Item>
        )}
        {auth?.user?.centeradmin && (
          <Menu.Item
            as={Link}
            to={"/centeradmin"}
            active={pathname === "/centeradmin"}
          >
            <Icon name="hospital" /> Mi centro de salud
          </Menu.Item>
        )}
      </Menu>
      <div className="content">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="pharmacies" element={<Farmacies />} />
          {/* <Route path="users" element={<Users />} />
            <Route path="tables" element={<Tables />} />
            <Route path="payments" element={<PaymentsHistory />} />
            <Route path="" element={<Orders />} />
            <Route path="tables/:id" element={<TableDetailsAdmin />} />
            <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </div>
    </div>
  );
};
