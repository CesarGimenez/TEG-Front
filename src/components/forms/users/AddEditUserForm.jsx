import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";

export const AddEditUserForm = ({ closeModal, onRefetch, user }) => {
  const { createUser, updateUser } = useUser();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(
      user ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (user) {
          await updateUser(user._id, formValue);
          toast.success("Usuario editado con exito");
        } else {
          await createUser(formValue);
          toast.success("Usuario creado con exito");
        }
        onRefetch();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="email"
        autoComplete="off"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && formik.errors.email}
      />
      <Form.Input
        name="first_name"
        placeholder="Nombres"
        autoComplete="off"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.touched.first_name && formik.errors.first_name}
      />
      <Form.Input
        name="last_name"
        placeholder="Apellidos"
        autoComplete="off"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.touched.last_name && formik.errors.last_name}
      />
      <Form.Input
        name="dni"
        placeholder="DNI"
        autoComplete="off"
        value={formik.values.dni}
        onChange={formik.handleChange}
        error={formik.touched.dni && formik.errors.dni}
      />
      <Form.Input
        name="phone"
        placeholder="Telefono"
        autoComplete="off"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && formik.errors.phone}
      />
      <Form.Input
        name="address"
        placeholder="Direccion"
        autoComplete="off"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && formik.errors.address}
      />
      <div className="add-edit-user-form__Active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
          error={formik.errors.active}
        />{" "}
        Usuario activo
      </div>
      <div className="add-edit-user-form__Staff">
        <Checkbox
          toggle
          checked={formik.values.is_Admin}
          onChange={(_, data) => formik.setFieldValue("is_Admin", data.checked)}
          error={formik.errors.is_Admin}
        />{" "}
        Usuario admin
      </div>
      <Button
        type="submit"
        primary
        fluid
        content={user ? "Actualizar" : "Crear"}
      />{" "}
    </Form>
  );
};

const initialValues = (data) => {
  return {
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    dni: data?.dni || "",
    phone: data?.phone || "",
    address: data?.address || "",
    active: data?.active ? true : false,
    is_Admin: data?.is_Admin ? true : false,
  };
};

const newValidationSchema = () => {
  return {
    email: Yup.string().required(true).email("No es un email"),
    first_name: Yup.string().required(true).max(20, "Es muy largo"),
    last_name: Yup.string().required(true).max(20, "Es muy largo"),
    dni: Yup.string().required(true).max(20, "Es muy largo"),
    phone: Yup.string().required(true).max(20, "Es muy largo"),
    address: Yup.string().required(true).max(40, "Es muy largo"),
    active: Yup.bool().required(true),
    is_Admin: Yup.bool().required(true),
  };
};

const updateValidationSchema = () => {
  return {
    email: Yup.string().required(true).email("No es un email"),
    first_name: Yup.string().required(true).max(20, "Es muy largo"),
    last_name: Yup.string().required(true).max(20, "Es muy largo"),
    dni: Yup.string().required(true).max(20, "Es muy largo"),
    phone: Yup.string().max(20, "Es muy largo"),
    address: Yup.string().max(40, "Es muy largo"),
    active: Yup.bool().required(true),
    is_Admin: Yup.bool().required(true),
  };
};
