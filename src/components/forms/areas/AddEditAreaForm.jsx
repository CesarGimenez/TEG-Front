import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useArea } from "../../../hooks/useArea";

export const AddEditAreaForm = ({ closeModal, onRefetch, area }) => {
  const { loading, createArea, updateArea } = useArea();

  const formik = useFormik({
    initialValues: initialValues(area),
    validationSchema: Yup.object(
      area ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (area) {
          await updateArea(area?._id, formValue);
          toast.success("Area de especialidad actualizada con exito");
        } else {
          await createArea(formValue);
          toast.success("Area de especialidad creada con exito");
        }
        onRefetch();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className="add-edit-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        placeholder="Nombre de la especialidad"
        autoComplete="off"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
      />
      <Form.Input
        name="description"
        placeholder="Descripcion"
        autoComplete="off"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && formik.errors.description}
      />
      <div className="add-edit-form__Active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
          error={formik.errors.active}
        />{" "}
        Especialidad activa
      </div>
      <Button
        type="submit"
        primary
        fluid
        content={area ? "Actualizar" : "Crear"}
      />{" "}
    </Form>
  );
};

const initialValues = (data) => {
  return {
    name: data?.name || "",
    description: data?.description || "",
    active: data?.active ? true : false,
  };
};

const newValidationSchema = () => {
  return {
    name: Yup.string().required(true).max(40, "Es muy largo"),
    description: Yup.string().required(true),
    active: Yup.bool().required(true),
  };
};

const updateValidationSchema = () => {
  return {
    name: Yup.string().required(true).max(40, "Es muy largo"),
    description: Yup.string().required(true),
    active: Yup.bool().required(true),
  };
};
