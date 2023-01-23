import React from "react";
import { Icon, Image, Menu } from "semantic-ui-react";
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
import { UserHistory } from "../../../pages/DoctorPages/userHistory/userHistory";
import { AdminCenter } from "../../../pages/AdminCenter/AdminCenter";
import { AdminPharmacy } from "../../../pages/AdminPharmacy/AdminPharmacy";
import { MyTreatment } from "../../../pages/Treattments/MyTreatment";

export const SideMenu = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="side_menu">
      <Menu fixed="left" borderless className="side" vertical>
        <Menu.Item as={Link} to={"/"} active={pathname === "/"}>
          <Icon name="home" /> Mis datos
        </Menu.Item>

        <Menu.Item
          as={Link}
          to={"/treattment"}
          active={pathname === "/treattment"}
        >
          <Icon name="user" /> Mis tratamientos
        </Menu.Item>

        <Menu.Item
          as={Link}
          to={"/pharmacies"}
          active={pathname === "/pharmacies"}
        >
          <Icon name="heartbeat" /> Información Farmacéutica
        </Menu.Item>

        <Menu.Item as={Link} to={"/medical"} active={pathname === "/medical"}>
          <Icon name="user md" /> Atención médica
        </Menu.Item>
        {auth?.user?.is_Admin && (
          <Menu.Item as={Link} to={"/admin"} active={pathname === "/admin"}>
            <Icon name="user" /> Administración del sistema
          </Menu.Item>
        )}
        {auth?.user?.pharmacyadmin && (
          <Menu.Item
            as={Link}
            to={"/pharmadmin"}
            active={pathname === "/pharmadmin"}
          >
            <Icon name="medkit" /> Administración Farmacéutica
          </Menu.Item>
        )}
        {auth?.user?.centeradmin && (
          <Menu.Item
            as={Link}
            to={"/centeradmin"}
            active={pathname === "/centeradmin"}
          >
            <Icon name="hospital" /> Administración Sanitaria
          </Menu.Item>
        )}
        {(auth?.user?.role_id === "62d896e5c3885dab609328d4" ||
          auth?.user?.is_doctor) && (
          <Menu.Item
            as={Link}
            to={"/atenciones"}
            active={pathname === "/atenciones"}
          >
            <Icon name="hospital" /> Mis atenciones
          </Menu.Item>
        )}
        {(auth?.user?.role_id?._id === "62d896e5c3885dab609328d4" ||
          auth?.user?.is_doctor) &&
          auth?.user?.is_verified && (
            <Menu.Item
              as={Link}
              to={"/nuevo-diagnostico"}
              active={pathname === "/nuevo-diagnostico"}
            >
              <Icon name="hospital" /> Generar consulta
            </Menu.Item>
          )}
        <div>
          <Image
            src={
              "https://res.cloudinary.com/dl57f2zr5/image/upload/v1674012359/LOGO_MEDICPASS-10_w5g36q.png"
            }
          />
        </div>
      </Menu>
      <div className="content">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="pharmacies" element={<Farmacies />} />
          <Route path="medical" element={<Doctors />} />
          <Route path="history" element={<UserHistory />} />
          <Route path="admin/*" element={<AdminDashboard />} />
          <Route path="atenciones" element={<MyAttentions />} />
          <Route path="nuevo-diagnostico" element={<NewDiagnostic />} />
          <Route path="user-history/:id" element={<UserHistory />} />
          <Route path="centeradmin" element={<AdminCenter />} />
          <Route path="pharmadmin" element={<AdminPharmacy />} />
          <Route path="treattment" element={<MyTreatment />} />
          {/* <Route path="tables/:id" element={<TableDetailsAdmin />} />
            <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </div>
    </div>
  );
};
