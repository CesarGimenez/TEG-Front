import React from "react";
import {
  Button,
  Card,
  Form,
  Header,
  ItemGroup,
  Segment,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "./NewDiagnostic.scss";
import { useUser } from "../../../hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NewDiagnostic = () => {
  const navigate = useNavigate();
  const { loading, usersQuery, getUsersByQuery } = useUser();

  useEffect(() => {}, [usersQuery]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const users = await getUsersByQuery(formValue);
    },
  });
  return (
    <>
      <Card fluid centered>
        <Header as="h1">Realizar una nueva consulta medica</Header>
        <div className="form_content">
          <div style={{ width: 500 }}>
            <div className="title_form">
              <Header as="h4" color="teal">
                Puedes encontrar el paciente para generar la consulta mediante
                su Nombre, Apellido o DNI
              </Header>
            </div>

            <Form onSubmit={formik.handleSubmit}>
              <Form.Input
                className="input"
                label="Nombre"
                name="first_name"
                placeholder="Nombre"
                autoComplete="off"
                value={formik.values?.first_name}
                onChange={formik.handleChange}
                error={formik.touched.first_name && formik.errors.first_name}
              />
              <Form.Input
                className="input"
                label="Apellido"
                name="last_name"
                placeholder="Apellido"
                autoComplete="off"
                value={formik.values?.last_name}
                onChange={formik.handleChange}
                error={formik.touched.last_name && formik.errors.last_name}
              />
              <Form.Input
                className="input"
                label="DNI"
                name="dni"
                placeholder="Numero de documento"
                autoComplete="off"
                value={formik.values?.dni}
                onChange={formik.handleChange}
                error={formik.touched.dni && formik.errors.dni}
              />
              <div className="btn_container">
                <Button
                  primary
                  fluid
                  disabled={
                    formik.values?.first_name !== "" ||
                    formik.values?.last_name !== "" ||
                    formik.values?.dni !== ""
                      ? false
                      : true
                  }
                  centered
                  type="submit"
                  style={{ padding: 15, fontSize: 17, width: 200 }}
                >
                  Buscar
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {usersQuery && (
            <div className="items_group">
              {usersQuery?.map((user) => {
                return (
                  <Segment>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Header as="h4" color="teal">
                          {user?.first_name} {user?.last_name} {" - "}(
                          {moment().diff(user?.birthdate, "years") || "(N/A)"}){" "}
                        </Header>
                        <span>
                          <strong>Genero: </strong>
                          {user.gender === "M" ? "Masculino" : "Femenino"}
                        </span>
                        <span>
                          <strong>DNI: </strong>
                          {user.dni}
                        </span>
                        <span>
                          <strong>Telefono: </strong>
                          {user.phone}
                        </span>
                      </div>
                      <div>
                        <Button
                          primary
                          onClick={() => navigate(`/user-history/${user?._id}`)}
                        >
                          Crear consulta
                        </Button>
                      </div>
                    </div>
                  </Segment>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

const initialValues = () => {
  return {
    first_name: "",
    last_name: "",
    dni: "",
  };
};

const validationSchema = () => {
  return {
    first_name: Yup.string().max(40, "Es muy largo"),
    last_name: Yup.string().max(40, "Es muy largo"),
    dni: Yup.string().max(40, "Es muy largo"),
  };
};
