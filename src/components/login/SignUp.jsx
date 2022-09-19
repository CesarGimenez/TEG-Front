import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  Message,
  Segment,
} from "semantic-ui-react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";

const options = [
  {
    key: "medicina interna",
    text: "medicina interna",
    value: "medicina interna",
  },
  { key: "pediatria", text: "pediatria", value: "pediatria" },
  { key: "neumonologia", text: "neumonologia", value: "neumonologia" },
  { key: "traumatologia", text: "traumatologia", value: "traumatologia" },
  { key: "nefrologia", text: "nefrologia", value: "nefrologia" },
  { key: "oncologia", text: "oncologia", value: "oncologia" },
  { key: "urologia", text: "urologia", value: "urologia" },
  { key: "ginecologia", text: "ginecologia", value: "ginecologia" },
  { key: "cirugia general", text: "cirugia general", value: "cirugia general" },
  { key: "cardiologia", text: "cardiologia", value: "cardiologia" },
];

export const SignUp = ({ handleRegister }) => {
  const [checkDoctor, setCheckDoctor] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(checkDoctor),
    validationSchema: Yup.object(validationSchema(checkDoctor)),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
    },
  });

  const handleCheck = (checked) => {
    setCheckDoctor(checked);
    if (checked) formik.setFieldValue("role_id", "62d896e5c3885dab609328d4");
    else {
      formik.setFieldValue("areas", []);
      formik.setFieldValue("role_id", "62e1e4c5111336bdeae5e289");
    }
  };
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ width: 500 }}>
        <Header as="h2" textAlign="center">
          Unete a nosotros!
        </Header>
        <Form size="large" onSubmit={formik.handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
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
              icon="user"
              iconPosition="left"
              placeholder="Apellido"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={formik.errors.last_name}
            />
            <Form.Input
              fluid
              icon="address card "
              iconPosition="left"
              placeholder="DNI"
              name="dni"
              value={formik.values.dni}
              onChange={formik.handleChange}
              error={formik.errors.dni}
            />
            <Form.Input
              fluid
              icon="envelope"
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
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirmar password"
              type="password"
              name="confirmpassword"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              error={formik.errors.confirmpassword}
            />
            <Form.Input
              fluid
              icon="address book"
              iconPosition="left"
              placeholder="Direccion"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            />
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Telefono"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.errors.phone}
            />

            <Form.Input
              fluid
              iconPosition="left"
              type="hidden"
              name="role_id"
              value={formik.values.role_id}
              onChange={formik.handleChange}
              error={formik.errors.role_id}
            />

            <Checkbox
              label={
                checkDoctor
                  ? "Si eres medico, es necesario que ingreses datos adicionales"
                  : "Deseas registrarte como medico?"
              }
              onChange={(e, { checked }) => handleCheck(checked)}
            />

            {checkDoctor ? (
              <Segment>
                {/* <Label color="teal">
                  Desde cuando ejerce como profesional?
                </Label>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Inicio de especialidad"
                  type="date"
                /> */}
                <Label color="teal">Adjunte su titulo obtenido</Label>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Titulo"
                  type="file"
                />
                <Label color="teal">Indique su especialidad</Label>
                <Dropdown
                  placeholder="Skills"
                  fluid
                  multiple
                  selection
                  search
                  value={formik.values.areas || []}
                  options={options}
                  onChange={(_, data) =>
                    formik.setFieldValue("areas", data.value)
                  }
                  name="areas"
                  error={Boolean(formik.errors.areas) && checkDoctor}
                />
              </Segment>
            ) : null}
            <Button color="teal" fluid size="large" type="submit">
              Registro
            </Button>
          </Segment>
        </Form>
        <Message>
          Ya tienes una cuenta?{" "}
          <a href="#" onClick={handleRegister}>
            Inicia sesion
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

const initialValues = (checkDoctor) => {
  return {
    first_name: "",
    last_name: "",
    dni: `V-`,
    email: "",
    password: "",
    confirmpassword: "",
    address: "",
    phone: "",
    certificade: "",
    areas: [],
    role_id: "62e1e4c5111336bdeae5e289",
    secret_word: "",
    blood_group: "",
    parent_phone: "",
    centeradmin: "",
    pharmacyadmin: "",
  };
};

const validationSchema = (checkDoctor) => {
  return {
    first_name: Yup.string()
      .trim()
      .matches(
        /^[aA-zZ\s]+$/,
        "No se admiten numeros y/o caracteres para el nombre"
      )
      .required(true),
    last_name: Yup.string()
      .trim()
      .matches(
        /^[aA-zZ\s]+$/,
        "No se admiten numeros y/o caracteres para el apellido"
      )
      .required(true),
    dni: Yup.string()
      .trim()
      .matches(
        /^[a-z]{1}-[0-9]{7,}?$/i,
        "Formato invalido para DNI, Ejemplo: V-1111111"
      )
      .required(true),
    email: Yup.string().trim().email("No es un email valido").required(true),
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
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords no coinciden'),
    address: Yup.string().required(true).trim(),
    phone: Yup.string()
      .trim()
      .required(true)
      .matches(
        /^[0-9]{7,}?$/i,
        "Formato invalido para telefono. Ejemplo: 02125554433"
      ),
    areas: checkDoctor ? Yup.array().min(1) : Yup.array(),
    role_id: Yup.string(),
  };
};
