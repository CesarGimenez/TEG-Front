import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Button, Form, Grid, Image } from "semantic-ui-react";
import { useCloudinary } from "../../hooks/useCloudinary";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";

export const EditUserProfile = ({ user, onRefetch, openCloseModal }) => {
  const [previewImage, setPreviewImage] = useState(user ? user?.image : null);
  const { uploadImageToCloudinary, uploadImageUser } = useCloudinary();
  const { updateUser, loading } = useUser();
  const optionsGender = [
    { key: "M", value: "M", text: "Masculino" },
    { key: "F", value: "F", text: "Femenino" },
    { key: "O", value: "O", text: "Otro" },
  ];
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const updated = await updateUser(user?._id, formValue);
      if (updated) {
        onRefetch();
        openCloseModal();
        toast.success("Se ha cambiado la informacion del usuario");
      } else {
        toast.error("Ocurrio un error al actualizar informacion del usuario");
      }
    },
  });

  const uploadImage = async () => {
    const result = await uploadImageToCloudinary(formik.values.image);
    const { secure_url } = result;
    const body = {
      image: secure_url,
    };
    await uploadImageUser(body, user?._id);
    setPreviewImage(secure_url);
    onRefetch();
    toast.success("Se ha cambiado la imagen");
    formik.setFieldValue("image", secure_url);
  };
  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <input {...getInputProps()} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src={previewImage}
                  size="small"
                  circular
                  className="img__edit__profile"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Button
                  type="button"
                  fluid
                  {...getRootProps()}
                  content="Cambiar imagen"
                />

                {previewImage && (
                  <Button
                    type="button"
                    fluid
                    content="Subir Imagen"
                    onClick={() => uploadImage()}
                  />
                )}
              </div>

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
              <Form.Input
                fluid
                label="Fecha de nacimiento"
                labelPosition="left"
                type="date"
                icon="user"
                iconPosition="left"
                value={formik.values.birthdate}
                onChange={async (e) => {
                  const newDate = new Date(e.target.value).toISOString();
                  await formik.setFieldValue("birthdate", newDate);
                }}
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
                onChange={(e, { value }) =>
                  formik.setFieldValue("gender", value)
                }
                error={formik.errors.gender}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                fluid
                label="Grupo sanguineo"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="A+, O+"
                name="blood_group"
                value={formik.values.blood_group}
                onChange={formik.handleChange}
                error={formik.errors.blood_group}
              />
              <Form.Input
                fluid
                label="PIN de historia"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="******"
                name="secret_word"
                value={formik.values.secret_word}
                onChange={formik.handleChange}
                error={formik.errors.secret_word}
              />
              <Form.Input
                fluid
                label="DNI"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="11.111.111"
                name="dni"
                value={formik.values.dni}
                onChange={formik.handleChange}
                error={formik.errors.dni}
              />
              <Form.Input
                fluid
                label="Email"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="ejemplo@gmail.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
              />
              <Form.Input
                fluid
                label="Teléfono personal"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="04**11111111"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone}
              />
              <Form.Input
                fluid
                label="Teléfono Emergencia"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="04**11111111"
                name="parent_phone"
                value={formik.values.parent_phone}
                onChange={formik.handleChange}
                error={formik.errors.parent_phone}
              />
              <Form.Input
                fluid
                label="Direccion"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="Dirección exacta"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.errors.address}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button fluid type="submit">
          Editar perfil
        </Button>
      </Form>
    </div>
  );
};

const initialValues = (user) => {
  return {
    first_name: user?.first_name || "",
    last_name: user.last_name || "",
    birthdate: user?.birthdate || "",
    blood_group: user?.blood_group || "",
    dni: user?.dni || "",
    email: user?.email || "",
    image: user?.image || "",
    parent_phone: user?.parent_phone || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    address: user?.address || "",
    secret_word: user?.secret_word || "",
  };
};

const validationSchema = () => {
  return {
    first_name: Yup.string()
      .trim()
      .matches(
        /^[aA-zZ\s]+$/,
        "No se admiten numeros y/o caracteres para el nombre"
      )
      .required(),
    last_name: Yup.string()
      .trim()
      .matches(
        /^[aA-zZ\s]+$/,
        "No se admiten numeros y/o caracteres para el apellido"
      )
      .required(),
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
    address: Yup.string().required(true).trim(),
    secret_word: Yup.string().required().trim(),
  };
};
