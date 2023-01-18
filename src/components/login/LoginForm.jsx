import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { LoginAPI } from "../../api/auth";
import { toast } from "react-toastify";
import { Home } from "../../pages/home/Home";

export const LoginForm = ({ handleRegister }) => {
  const { login, auth } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const res = await LoginAPI(formValue);
        const { user } = res;
        if (res?.statusCode === 403 || !user?.data?.active) {
          toast.error("Credenciales invalidas");
          return;
        }
        login(user.access);
        toast.success("Ingreso con exito");
        return <Home />;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ width: 500 }}>
        <Image
          size="small"
          src={
            "https://res.cloudinary.com/dl57f2zr5/image/upload/v1674012358/LOGO_MEDICPASS-04_kvkjig.png"
          }
          verticalAlign="middle"
        />
        <Header as="h2" textAlign="center">
          Ingresa con tu cuenta
        </Header>
        <Form size="large" onSubmit={formik.handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              autoComplete="off"
              icon="user"
              iconPosition="left"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />

            <Button color="teal" fluid size="large" type="submit">
              Inicio
            </Button>
          </Segment>
        </Form>
        <Message>
          Eres nuevo?{" "}
          <a href="#" onClick={handleRegister}>
            Registrate!
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

const initialValues = () => {
  return {
    email: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    email: Yup.string()
      .email("No es un email valido")
      .required("Es un campo requerido"),
    password: Yup.string()
      .required("Es un campo requerido")
      .min(6, "El password debe contener al menos 6 caracteres")
      .max(12, "El password no debe ser mayor a 12 caracteres"),
  };
};
