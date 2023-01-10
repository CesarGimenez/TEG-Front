import React, { useEffect, useState } from "react";
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
import moment from "moment";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { useArea } from "../../hooks/useArea";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";

const optionsNumber = [
  {
    key: "0412",
    text: "0412",
    value: "0412",
  },
  {
    key: "0414",
    text: "0414",
    value: "0414",
  },
  {
    key: "0416",
    text: "0416",
    value: "0416",
  },
  {
    key: "0424",
    text: "0424",
    value: "0424",
  },
  {
    key: "0426",
    text: "0426",
    value: "0426",
  },
  {
    key: "0252",
    text: "0251",
    value: "0251",
  },
];

const genderOptions = [
  {
    key: "M",
    text: "Masculino",
    value: "M",
  },
  {
    key: "F",
    text: "Femenino",
    value: "F",
  },
  {
    key: "O",
    text: "Otro",
    value: "O",
  },
];

export const SignUp = ({ handleRegister }) => {
  const { areas, getAreas } = useArea();
  const { loading, createUser } = useUser();
  const [checkDoctor, setCheckDoctor] = useState(false);
  const [codeNumber, setCodeNumber] = useState(null);

  useEffect(() => {
    getAreas();
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

  const formik = useFormik({
    initialValues: initialValues(checkDoctor),
    validationSchema: Yup.object(validationSchema(checkDoctor)),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        formValue.birthdate = new Date(formValue.birthdate).toISOString();
        formValue.phone = `${codeNumber}-${formValue.phone}`;
        formValue.is_doctor = checkDoctor ? true : false;
        const res = await createUser(formValue);
        if (res?.error) {
          toast.error(res?.error);
        }
        if (res?.msg) {
          toast.success(res?.msg);
        }
        setTimeout(handleRegister(), 2000);
      } catch (error) {
        throw error;
      }
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ width: "48%" }}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  placeholder="Nombre"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={formik.errors.first_name}
                />
              </div>
              <div style={{ width: "48%" }}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  placeholder="Apellido"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={formik.errors.last_name}
                />
              </div>
            </div>

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ width: "48%" }}>
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.errors.password}
                />
              </div>
              <div style={{ width: "48%" }}>
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
              </div>
            </div>

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
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div style={{ marginRight: 5 }}>
                <Dropdown
                  placeholder="Code"
                  compact
                  selection
                  options={optionsNumber}
                  onChange={(_, data) => setCodeNumber(data.value)}
                />
              </div>
              <div style={{ width: "90%" }}>
                <Form.Input
                  icon="phone"
                  iconPosition="left"
                  placeholder="Telefono"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.errors.phone}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ width: "48%" }}>
                <Form.Input
                  icon="calendar"
                  iconPosition="left"
                  placeholder="Fecha de nacimiento"
                  type="date"
                  name="birthdate"
                  value={formik.values.birthdate}
                  onChange={formik.handleChange}
                  error={formik.errors.birthdate}
                />
              </div>
              <div style={{ width: "48%" }}>
                <Dropdown
                  icon="genderless"
                  iconPosition="right"
                  placeholder="Genero"
                  name="gender"
                  selection
                  options={genderOptions}
                  value={formik.values.gender}
                  onChange={(_, data) =>
                    formik.setFieldValue("gender", data.value)
                  }
                  error={Boolean(formik.errors.gender)}
                />
              </div>
            </div>
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
                  options={formatAreas(areas)}
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
    dni: ``,
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
    gender: "",
    birthdate: "",
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
      .matches(/^[0-9]{7,}?$/i, "Formato invalido para DNI, Ejemplo: 1111111")
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
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords no coinciden"
    ),
    address: Yup.string().required(true).trim(),
    phone: Yup.string()
      .trim()
      .required(true)
      .matches(
        /^[0-9]{7,}?$/i,
        "Formato invalido para telefono. Ejemplo: 04125554433"
      ),
    areas: checkDoctor ? Yup.array().min(1) : Yup.array(),
    role_id: Yup.string(),
    gender: Yup.string().required("Es un campo requerido"),
    birthdate: Yup.string()
      .test(Yup.string, "No es una fecha valida", (value) => {
        const now = new moment();
        const birthdate = new moment(value);
        const diff = now.diff(birthdate, "years");
        if (diff <= 0 || diff >= 100) {
          return false;
        }
        return true;
      })
      .test(
        Yup.string,
        "No puede registrar un menor de edad con perfil medico",
        (value) => {
          const now = new moment();
          const birthdate = new moment(value);
          const diff = now.diff(birthdate, "years");
          if (diff < 21 && checkDoctor) {
            return false;
          }
          return true;
        }
      )
      .required("Es un campo requerido"),
  };
};
