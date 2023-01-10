import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Grid } from "semantic-ui-react";
import { useUser } from "../../hooks/useUser";

export const EditUserPassword = ({ openCloseModal, onRefetch, user }) => {
  const { updatePassword } = useUser();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const updated = await updatePassword(user?._id, formValue);
      if (updated) {
        onRefetch();
        openCloseModal();
        toast.success("Se ha cambiado la informacion de la contrase;a");
      } else {
        toast.error("Ocurrio un error al actualizar informacion del usuario");
      }
    },
  });
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Grid>
          <Grid.Column>
            <Form.Input
              fluid
              label="Nueva contrase'a"
              labelPosition="left"
              icon="key"
              iconPosition="left"
              placeholder="Escriba aca su nueva contrase;a"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
            <Form.Input
              fluid
              label="Confirmar contrase'a"
              labelPosition="left"
              icon="key"
              iconPosition="left"
              placeholder="Confirme su contrase;a"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.errors.confirmPassword}
            />
            <Button type="submit">Actualizar</Button>
          </Grid.Column>
        </Grid>
      </Form>
    </>
  );
};

const initialValues = () => {
  return {
    password: "",
    confirmPassword: "",
  };
};

const validationSchema = () => {
  return {
    password: Yup.string()
      .trim()
      .required(true)
      .min(6, "El password debe contener al menos 6 caracteres")
      .max(12, "El password no debe ser mayor a 12 caracteres")
      .test(
        "",
        "El password debe contener 6 caracteres, al menos 1 mayuscula, 1 minuscula, 1 numero y un caracter especial",
        (value, context) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSymbole = /[!@#%&]/.test(value);
          let validConditions = 0;
          const numberOfMustBeValidConditions = 3;
          const conditions = [
            hasLowerCase,
            hasUpperCase,
            hasNumber,
            hasSymbole,
          ];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      ),
    confirmPassword: Yup.string()
      .required(true, "Es un campo requerido")
      .oneOf([Yup.ref("password"), null], "Passwords no coinciden"),
  };
};
