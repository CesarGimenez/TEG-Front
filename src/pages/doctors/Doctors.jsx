import React, { useEffect } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Header,
  Loader,
} from "semantic-ui-react";
import { useArea } from "../../hooks/useArea";
import { useUser } from "../../hooks/useUser";
import { DoctorsList } from "./DoctorsList";

export const Doctors = () => {
  const { areas, getAreas } = useArea();
  const { users, loading, getUsersDoctors } = useUser();

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

  return (
    <div>
      <Card fluid centered>
        <Header as="h1">Atencion medica de especialistas</Header>
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
              <Button>Consultar</Button>
            </div>
          </Form>
        </div>
        {loading ? (
          <Loader active inline="centered">
            Cargando..
          </Loader>
        ) : (
          <DoctorsList doctors={users} />
        )}
      </Card>
    </div>
  );
};
