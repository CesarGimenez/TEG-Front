import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
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
      await updateUser(user?._id, formValue);
      onRefetch();
      openCloseModal();
      toast.success("Se ha cambiado la informacion del usuario");
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
  };
  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
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
                <Image src={previewImage} size="small" circular />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
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
              />
              <Form.Input
                fluid
                label="Fecha de nacimiento"
                labelPosition="left"
                type="date"
                icon="user"
                iconPosition="left"
                onChange={async (e) => {
                  const newDate = new Date(e.target.value).toISOString();
                  await formik.setFieldValue("birthdate", newDate);
                }}
              />
              <Form.Dropdown
                label="Genero"
                labelPosition="left"
                fluid
                icon="sex"
                iconPosition="left"
                placeholder="Selecciona una opcion"
                selection
                options={optionsGender}
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
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
              />
              <Form.Input
                fluid
                label="DNI"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="V-11.111.111"
                name="dni"
                value={formik.values.dni}
                onChange={formik.handleChange}
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
              />
              <Form.Input
                fluid
                label="Telefono personal"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="04**11111111"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              <Form.Input
                fluid
                label="Telefono Emergencia"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="04**11111111"
                name="parent_phone"
                value={formik.values.parent_phone}
                onChange={formik.handleChange}
              />
              <Form.Input
                fluid
                label="Direccion"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="Direccion exacta"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
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
  };
};

const validationSchema = () => {
  return {};
};
