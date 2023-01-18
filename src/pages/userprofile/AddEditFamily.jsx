import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Button, Card, Checkbox, Form, Grid } from "semantic-ui-react";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";

const optionsGender = [
  { key: "M", text: "Masculino", value: "M" },
  { key: "F", text: "Femenino", value: "F" },
  { key: "O", text: "Otro", value: "O" },
];

const optionsKinship = [
  { key: "Padre", text: "Padre", value: "Padre" },
  { key: "Madre", text: "Madre", value: "Madre" },
  { key: "Hijo", text: "Hijo", value: "Hijo" },
  { key: "Hija", text: "Hija", value: "Hija" },
  { key: "Abuelo", text: "Abuelo", value: "Abuelo" },
  { key: "Abuela", text: "Abuela", value: "Abuela" },
  { key: "Tio", text: "Tio", value: "Tio" },
  { key: "Tia", text: "Tia", value: "Tia" },
  { key: "Sobrino", text: "Sobrino", value: "Sobrino" },
  { key: "Sobrina", text: "Sobrina", value: "Sobrina" },
  { key: "Pareja", text: "Pareja", value: "Pareja" },
  { key: "Amistad", text: "Amistad", value: "Amistad" },
];

export const AddEditFamily = ({ user, openCloseModal, onRefetch }) => {
  const [hasDNI, setHasDNI] = useState(true);
  const { loading, createUser, updateUser } = useUser();
  const { auth } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: user
      ? Yup.object(updateValidationSchema)
      : Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (user && formValue?.password === "") {
        delete formValue?.password;
        delete formValue?.confirmpassword;
      }
      if (user) {
        console.log("hola");
        const edited = await updateUser(user?._id, formValue);
        if (edited) {
          toast.success("Familiar editado con exito");
          onRefetch();
          openCloseModal();
        }
      } else {
        const data = {
          ...formValue,
          family: auth?.user?._id,
          role_id: "62e1e4c5111336bdeae5e289",
        };
        const created = await createUser(data);
        if (created?.error) {
          toast.error(res?.error);
        }
        if (created?.msg) {
          toast.success("Tu familiar ha sido creado con exito!");
          onRefetch();
          openCloseModal();
        }
      }
    },
  });
  const onSetDNI = (checked) => {
    setHasDNI(checked);
    if (!checked) {
      formik.setFieldValue("dni", `${auth?.user?.dni}${"1"}`);
    }
  };
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Grid columns={2}>
          <Grid.Column>
            <Form.Input
              fluid
              label="Nombre"
              labelPosition="left"
              icon="user"
              iconPosition="left"
              placeholder="Nombre"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={formik.errors.first_name}
            />
            <Form.Input
              fluid
              label="Apellido"
              labelPosition="left"
              icon="user"
              iconPosition="left"
              placeholder="Apellido"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={formik.errors.last_name}
            />
            {!user && (
              <div style={{ margin: 15 }}>
                <Checkbox
                  label="No posee DNI? (Menor de edad)"
                  onChange={(e, { checked }) => onSetDNI(!checked)}
                ></Checkbox>
              </div>
            )}
            {hasDNI && (
              <Form.Input
                fluid
                label="DNI"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="DNI"
                name="dni"
                value={formik.values.dni}
                onChange={formik.handleChange}
                error={formik.errors.dni}
              />
            )}

            <Form.Input
              fluid
              label="Fecha de nacimiento"
              labelPosition="left"
              type="date"
              icon="user"
              iconPosition="left"
              name="birthdate"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              error={formik.errors.birthdate}
            />
            <Form.Dropdown
              label="Genero"
              labelPosition="left"
              fluid
              icon="sex"
              iconPosition="left"
              placeholder="Selecciona una opción"
              selection
              options={optionsGender}
              name="gender"
              value={formik.values.gender}
              onChange={(e, { value }) => formik.setFieldValue("gender", value)}
              error={formik.errors.gender}
            />
            <Form.Dropdown
              fluid
              label="Parentezco"
              labelPosition="left"
              icon="kinship"
              iconPosition="left"
              placeholder="Selecciona una opción"
              selection
              options={optionsKinship}
              name="kinship"
              value={formik.values.kinship}
              onChange={(e, { value }) =>
                formik.setFieldValue("kinship", value)
              }
              error={formik.errors.kinship}
            />
          </Grid.Column>
          <Grid.Column>
            <Form.Input
              fluid
              label="Correo"
              labelPosition="left"
              icon="user"
              iconPosition="left"
              placeholder="Correo"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <Form.Input
              fluid
              label="Telefono"
              labelPosition="left"
              icon="phone"
              iconPosition="left"
              placeholder="Teléfono"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.errors.phone}
            />
            <Form.Input
              fluid
              label="Password"
              labelPosition="left"
              icon="key"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
            <Form.Input
              fluid
              label="Confirme password"
              labelPosition="left"
              icon="key"
              iconPosition="left"
              type="password"
              name="confirmpassword"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              error={formik.errors.confirmpassword}
            />
            <Form.Input
              fluid
              label="PIN de historia"
              labelPosition="left"
              icon="key"
              iconPosition="left"
              placeholder="Con este PIN se dara el permiso de edicion de historia medica del usuario"
              name="secret_word"
              value={formik.values.secret_word}
              onChange={formik.handleChange}
              error={formik.errors.secret_word}
            />
            <Form.Input
              fluid
              label="Tipo de sangre"
              labelPosition="left"
              icon="user"
              iconPosition="left"
              placeholder="Tipo de sangre"
              name="blood_group"
              value={formik.values.blood_group}
              onChange={formik.handleChange}
              error={formik.errors.blood_group}
            />
          </Grid.Column>
          <Button type="submit" fluid>
            {user ? "Editar familiar" : "Agregar familiar"}
          </Button>
        </Grid>
      </Form>
    </div>
  );
};

const initialValues = (user) => {
  return {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    birthdate: user?.birthdate || "",
    blood_group: user?.blood_group || "",
    dni: user?.dni || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    secret_word: user?.secret_word || "",
    kinship: user?.kinship || "",
    password: "",
    confirmpassword: "",
  };
};

const newValidationSchema = () => {
  return {
    first_name: Yup.string()
      .trim()
      .matches(
        /^[aA-zZ\s]+$/,
        "No se admiten numeros y/o caracteres para el nombre"
      )
      .required(true, "Este campo es requerido"),
    last_name: Yup.string()
      .trim()
      .matches(
        /^[aA-zZ\s]+$/,
        "No se admiten numeros y/o caracteres para el apellido"
      )
      .required(true, "Este campo es requerido"),
    birthdate: Yup.string().test(
      Yup.string,
      "No es una fecha valida",
      (value) => {
        const now = new moment();
        const birthdate = new moment(value);
        const diff = now.diff(birthdate, "years");
        if (diff <= 0 || diff >= 100) {
          return false;
        }
        return true;
      }
    ),
    blood_group: Yup.string(),
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
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords no coinciden"
    ),
    dni: Yup.string()
      .trim()
      .matches(/^[0-9]{7,}?$/i, "Formato invalido para DNI, Ejemplo: 1111111")
      .required(true),
    email: Yup.string().trim().email("No es un email valido").required(true),
    image: Yup.string(),
    parent_phone: Yup.string(),
    phone: Yup.string()
      .trim()
      .required(true)
      .matches(
        /^[0-9]{7,}?$/i,
        "Formato invalido para telefono. Ejemplo: 04125554433"
      ),
    gender: Yup.string().required(),
    secret_word: Yup.string().required().trim(),
  };
};

const updateValidationSchema = () => {
  return {
    first_name: Yup.string()
      .trim()
      .matches(
        /^[aA-zZ\s]+$/,
        "No se admiten numeros y/o caracteres para el nombre"
      )
      .required(true, "Este campo es requerido"),
    last_name: Yup.string()
      .trim()
      .matches(
        /^[aA-zZ\s]+$/,
        "No se admiten numeros y/o caracteres para el apellido"
      )
      .required(true, "Este campo es requerido"),
    birthdate: Yup.string().test(
      Yup.string,
      "No es una fecha valida",
      (value) => {
        const now = new moment();
        const birthdate = new moment(value);
        const diff = now.diff(birthdate, "years");
        if (diff <= 0 || diff >= 100) {
          return false;
        }
        return true;
      }
    ),
    blood_group: Yup.string(),
    dni: Yup.string()
      .trim()
      .matches(/^[0-9]{7,}?$/i, "Formato invalido para DNI, Ejemplo: 1111111")
      .required(true),
    email: Yup.string().trim().email("No es un email valido").required(true),
    image: Yup.string(),
    parent_phone: Yup.string(),
    phone: Yup.string()
      .trim()
      .required(true)
      .matches(
        /^[0-9]{7,}?$/i,
        "Formato invalido para telefono. Ejemplo: 04125554433"
      ),
    gender: Yup.string().required(),
    secret_word: Yup.string().required().trim(),
  };
};
