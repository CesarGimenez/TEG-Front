import React from "react";
import { Button, Checkbox, Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";

export const EditMedicProfileUser = ({ closeModal, onRefetch, user }) => {
  const { updateUser } = useUser();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(updateValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await updateUser(user._id, formValue);
        toast.success("Usuario medico editado con exito");
        onRefetch();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div>
      <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
        <div className="add-edit-user-form__Active">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={formik.values.certificate}
              size="medium"
              className="img__edit__profile"
            />
          </div>

          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Checkbox
              toggle
              checked={formik.values.is_verified}
              onChange={(_, data) =>
                formik.setFieldValue("is_verified", data.checked)
              }
              error={formik.errors.is_verified}
            />{" "}
            Es medico verificado
          </div>
        </div>
        <Button type="submit" primary fluid content={"Actualizar Medico"} />{" "}
      </Form>
    </div>
  );
};

const initialValues = (data) => {
  return {
    certificate: data?.certificate || "",
    is_verified: data?.is_verified ? true : false,
  };
};

const updateValidationSchema = () => {
  return {
    is_verified: Yup.bool().required(true),
  };
};
