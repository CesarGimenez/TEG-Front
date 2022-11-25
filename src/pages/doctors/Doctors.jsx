import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  Header,
  Loader,
} from "semantic-ui-react";
import { useArea } from "../../hooks/useArea";
import { useUser } from "../../hooks/useUser";
import { DoctorsList } from "./DoctorsList";
import { ReactComponent as AttentionSVG } from "../../assets/doctor_attention.svg";

import "./Doctors.scss";

export const Doctors = () => {
  const { areas, getAreas } = useArea();
  const { users, loading, getUsersDoctors } = useUser();
  const [checkVerified, setCheckVerified] = useState();

  useEffect(() => {
    getAreas();
    getUsersDoctors();
  }, []);

  const formatAreas = (areas) => {
    return areas?.map((item) => {
      return {
        key: item._id,
        text: item?.name,
        value: item?._id,
      };
    });
  };

  const filterVerifiedDoctors = (users) => {
    if (checkVerified) {
      return users?.filter((user) => user?.is_verified);
    }
    return users;
  };
  return (
    <div>
      <Card fluid centered>
        <Header as="h1">Atencion medica de especialistas</Header>
        <AttentionSVG className="svg_component animate__animated animate__fadeInRight" />
        <div className="layout_menu_pharmacy">
          <Form>
            <Header as="h3">Consulte los especialistas en su area</Header>
            <div className="form_filter">
              <Dropdown
                placeholder="Area de especialidad"
                multiple
                selection
                search
                options={formatAreas(areas)}
                // onChange={setMedicinesListOnChange}
              />
              <Button className="btn__search__doctors">Consultar</Button>
              <div style={{ marginLeft: 10, color: "blue" }}>
                <Checkbox
                  label="Solo especialistas verificados"
                  onChange={(e, { checked }) => setCheckVerified(checked)}
                />
              </div>
            </div>
          </Form>
        </div>
        {loading ? (
          <Loader active inline="centered">
            Cargando..
          </Loader>
        ) : (
          <DoctorsList doctors={filterVerifiedDoctors(users)} />
        )}
      </Card>
    </div>
  );
};
