import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { UserProfile } from "../../../pages/userprofile/UserProfile";
import "./SideMenu.scss";
import { Farmacies } from "../../../pages/Farmacies/Farmacies";
import { Doctors } from "../../../pages/doctors/Doctors";
import { History } from "../../../pages/history/History";
import { AdminDashboard } from "../../../pages/AdminDashboard/AdminDashboard";
import { MyAttentions } from "../../../pages/DoctorPages/MyAttentions/MyAttentions";
import { NewDiagnostic } from "../../../pages/DoctorPages/NewDiagnostic/NewDiagnostic";

export const SideMenu = () => {
  const { auth } = useAuth();
  console.log(auth?.user);
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
        {auth?.user?.role_id === "62d896e5c3885dab609328d4" && (
          <Menu.Item
            as={Link}
            to={"/atenciones"}
            active={pathname === "/atenciones"}
          >
            <Icon name="hospital" /> Mis atenciones
          </Menu.Item>
        )}
        {auth?.user?.role_id === "62d896e5c3885dab609328d4" && (
          <Menu.Item
            as={Link}
            to={"/nuevo-diagnostico"}
            active={pathname === "/nuevo-diagnostico"}
          >
            <Icon name="hospital" /> Nuevo diagnostico
          </Menu.Item>
        )}
      </Menu>
      <div className="content">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="pharmacies" element={<Farmacies />} />
          <Route path="medical" element={<Doctors />} />
          <Route path="history" element={<History />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="atenciones" element={<MyAttentions />} />
          <Route path="nuevo-diagnostico" element={<NewDiagnostic />} />
          {/* <Route path="" element={<Orders />} />
            <Route path="tables/:id" element={<TableDetailsAdmin />} />
            <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </div>
    </div>
  );
};
