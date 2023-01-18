import React, { useCallback, useEffect, useState } from "react";
import { useCloudinary } from "../../hooks/useCloudinary";
import { useUser } from "../../hooks/useUser";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Button, Form, Grid, Image } from "semantic-ui-react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useArea } from "../../hooks/useArea";

export const EditMedicProfileUser = ({ user, onRefetch, openCloseModal }) => {
  const [previewImage, setPreviewImage] = useState(
    user ? user?.doctor_signature : null
  );
  const { uploadImageToCloudinary, uploadImageUser } = useCloudinary();
  const { updateUser, loading } = useUser();
  const { getAreas, areas } = useArea();

  useEffect(() => {
    getAreas();
  }, []);

  const optionsAreas = (areas) => {
    return areas?.map((a) => {
      return {
        key: a._id,
        text: a.name,
        value: a._id,
      };
    });
  };
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const updated = await updateUser(user?._id, formValue);
      if (updated) {
        onRefetch();
        openCloseModal();
        toast.success("Se ha cambiado la informacion del usuario medico");
      } else {
        toast.error("Ocurrio un error al actualizar informacion del usuario");
      }
    },
  });
  const uploadImage = async () => {
    const result = await uploadImageToCloudinary(
      formik.values.doctor_signature
    );
    const { secure_url } = result;
    const body = {
      doctor_signature: secure_url,
    };
    await uploadImageUser(body, user?._id);
    setPreviewImage(secure_url);
    onRefetch();
    toast.success("Se ha cambiado la imagen");
    formik.setFieldValue("doctor_signature", secure_url);
  };
  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    formik.setFieldValue("doctor_signature", file);
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
        <Grid columns={1} divided>
          <Grid.Row>
            <Grid.Column>
              <input {...getInputProps()} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src={previewImage}
                  size="medium"
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
                  content="Cambiar firma"
                />

                {previewImage && (
                  <Button
                    type="button"
                    fluid
                    content="Subir firma"
                    onClick={() => uploadImage()}
                  />
                )}
              </div>

              <Form.Input
                fluid
                label="M.P.P.S"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="Codigo del M.P.PS"
                name="mpps_id"
                value={formik.values.mpps_id}
                onChange={formik.handleChange}
              />
              <Form.Input
                fluid
                label="Código de colegio de Médicos"
                labelPosition="left"
                icon="user"
                iconPosition="left"
                placeholder="Código de colegio de Médicos"
                name="college_medic_id"
                value={formik.values.college_medic_id}
                onChange={formik.handleChange}
              />
              <Form.Dropdown
                label="Especialidades"
                labelPosition="left"
                fluid
                icon="area"
                iconPosition="left"
                placeholder="Selecciona una opción"
                selection
                options={optionsAreas(areas)}
                name="areas"
                multiple
                value={formik.values.areas}
                onChange={(e, { value }) =>
                  formik.setFieldValue("areas", value)
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button fluid type="submit">
          Editar perfil Médico
        </Button>
      </Form>
    </div>
  );
};

const initialValues = (user) => {
  return {
    mpps_id: user?.mpps_id || "",
    college_medic_id: user?.college_medic_id || "",
    doctor_signature: user?.doctor_signature || "",
    areas: user?.areas.map((a) => a._id) || [],
  };
};

const validationSchema = () => {
  return {};
};
