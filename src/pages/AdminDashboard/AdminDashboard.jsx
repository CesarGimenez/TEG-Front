import React from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Card, Menu, Segment } from "semantic-ui-react";
import { useAuth } from "../../hooks/useAuth";
import "./AdminDashboard.scss";
import { DiseaseTable } from "./diseases/DiseaseTable";
import { MedicinesTable } from "./medicines/MedicinesTable";
import { PharmaciesTable } from "./pharmacies/PharmaciesTable";
import { UserTable } from "./users/UserTable";
import { CentersTable } from "./centers/CentersTable";
import { AreasTable } from "./areas/AreasTable";

export const AdminDashboard = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();
  if (!auth?.user?.is_Admin) return <Navigate to="/" replace />;
  return (
    <div>
      <Card fluid centered>
        <Segment>
          <Menu fluid secondary>
            <Menu.Item
              name="Usuarios"
              as={Link}
              to={"users"}
              active={pathname === "/admin/users" || pathname === "/admin"}
            />
            <Menu.Item
              name="Centros de salud"
              as={Link}
              to={"healthcenters"}
              active={pathname === "/admin/healthcenters"}
            />
            <Menu.Item
              name="Farmacias"
              as={Link}
              to={"pharmacies"}
              active={pathname === "/admin/pharmacies"}
            />
            <Menu.Item
              name="Medicamentos"
              as={Link}
              to={"medicines"}
              active={pathname === "/admin/medicines"}
            />
            <Menu.Item
              name="Enfermedades"
              as={Link}
              to={"diseases"}
              active={pathname === "/admin/diseases"}
            />
            <Menu.Item
              name="Areas"
              as={Link}
              to={"areas"}
              active={pathname === "/admin/areas"}
            />
            <Menu.Item name="Historias" />
          </Menu>
        </Segment>
        <div>
          <Routes>
            <Route path="/" element={<UserTable />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/healthcenters" element={<CentersTable />} />
            <Route path="/pharmacies" element={<PharmaciesTable />} />
            <Route path="/medicines" element={<MedicinesTable />} />
            <Route path="/diseases" element={<DiseaseTable />} />
            <Route path="/areas" element={<AreasTable />} />
          </Routes>
        </div>
      </Card>
    </div>
  );
};
