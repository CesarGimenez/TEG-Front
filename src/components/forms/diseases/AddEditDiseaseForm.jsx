import React, { useEffect, useState } from "react";
import { Button, Checkbox, Dropdown, Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDisease } from "../../../hooks/useDisease";

export const AddEditDiseaseForm = ({ closeModal, onRefetch, disease }) => {
  const { loading, createDisease, updateDisease } = useDisease();

  const formik = useFormik({
    initialValues: initialValues(disease),
    validationSchema: Yup.object(
      disease ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (disease) {
          await updateDisease(disease?._id, formValue);
          toast.success("Enfermedad actualizada con exito");
        } else {
          await createDisease(formValue);
          toast.success("Enfermedad creada con exito");
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
        placeholder="Nombre de la enffermedad"
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
      <Form.Input
        name="syntoms"
        placeholder="Sintomas"
        autoComplete="off"
        value={formik.values.syntoms}
        onChange={formik.handleChange}
        error={formik.touched.syntoms && formik.errors.syntoms}
      />
      <Form.Input
        name="transmission"
        placeholder="Transmision"
        autoComplete="off"
        value={formik.values.transmission}
        onChange={formik.handleChange}
        error={formik.touched.transmission && formik.errors.transmission}
      />
      <Form.Input
        name="treatment"
        placeholder="Tratamiento"
        autoComplete="off"
        value={formik.values.treatment}
        onChange={formik.handleChange}
        error={formik.touched.treatment && formik.errors.treatment}
      />
      {/* <Dropdown
        selection
        search
        options={wayOptions}
        value={formik.values.way}
        placeholder="Via de administracion"
        onChange={(e, { value }) => formik.setFieldValue("way", value)}
      /> */}
      <div className="add-edit-form__Active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
          error={formik.errors.active}
        />{" "}
        Enfermedad activa
      </div>
      <div className="add-edit-form__Active">
        <Checkbox
          toggle
          checked={formik.values.require_diagnosys}
          onChange={(_, data) =>
            formik.setFieldValue("require_diagnosys", data.checked)
          }
          error={formik.errors.require_diagnosys}
        />{" "}
        Requiere diagnostico
      </div>
      <Button
        type="submit"
        primary
        fluid
        content={disease ? "Actualizar" : "Crear"}
      />{" "}
    </Form>
  );
};

const initialValues = (data) => {
  return {
    name: data?.name || "",
    description: data?.description || "",
    syntoms: data?.syntoms || "",
    active: data?.active ? true : false,
    require_diagnosys: data?.require_diagnosys ? true : false,
    transmission: data?.transmission || "",
    treatment: data?.treatment || "",
  };
};

const newValidationSchema = () => {
  return {
    name: Yup.string().required(true).max(40, "Es muy largo"),
    description: Yup.string().required(true),
    syntoms: Yup.string().required(true),
    active: Yup.bool().required(true),
    require_diagnosys: Yup.bool().required(true),
    transmission: Yup.string().required(true),
    treatment: Yup.string().required(true),
  };
};

const updateValidationSchema = () => {
  return {
    name: Yup.string().required(true).max(40, "Es muy largo"),
    description: Yup.string().required(true),
    syntoms: Yup.string().required(true),
    active: Yup.bool().required(true),
    require_diagnosys: Yup.bool().required(true),
    transmission: Yup.string().required(true),
    treatment: Yup.string().required(true),
  };
};
