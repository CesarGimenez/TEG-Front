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
          <Icon name="home" /> Mi historial Medico
        </Menu.Item>

        <Menu.Item
          as={Link}
          to={"/pharmacies"}
          active={pathname === "/pharmacies"}
        >
          <Icon name="home" /> Informacion Farmaceutica
        </Menu.Item>

        <Menu.Item as={Link} to={"/medical"} active={pathname === "/medical"}>
          <Icon name="home" /> Atencion medica
        </Menu.Item>
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
