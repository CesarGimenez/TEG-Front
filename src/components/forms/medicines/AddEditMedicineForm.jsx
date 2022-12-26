import React, { useEffect, useState } from "react";
import { Button, Checkbox, Dropdown, Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMedicine } from "../../../hooks/useMedicine";

const wayOptions = [
  { key: 1, text: "Oral", value: "Oral" },
  { key: 2, text: "Intravenosa", value: "Intravenosa" },
  { key: 3, text: "Intramuscular", value: "Intramuscular" },
  { key: 4, text: "Intratecal", value: "Intratecal" },
  { key: 5, text: "Subcutánea", value: "Subcutánea" },
  { key: 6, text: "Sublingual", value: "Sublingual" },
  { key: 7, text: "Bucal", value: "Bucal" },
  { key: 8, text: "Vaginal", value: "Vaginal" },
  { key: 9, text: "Ocular", value: "Ocular" },
  { key: 10, text: "Rectal", value: "Rectal" },
  { key: 11, text: "Otica", value: "Otica" },
  { key: 12, text: "Nasal", value: "Nasal" },
  { key: 13, text: "Nebulizacion", value: "Nebulizacion" },
  { key: 14, text: "Inhalacion", value: "Inhalacion" },
  { key: 15, text: "transdérmico", value: "transdérmico" },
  { key: 16, text: "Otro", value: "Otro" },
];

export const AddEditMedicineForm = ({ closeModal, onRefetch, medicine }) => {
  const { loading, createMedicine, updateMedicine } = useMedicine();
  const formik = useFormik({
    initialValues: initialValues(medicine),
    validationSchema: Yup.object(
      medicine ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (medicine) {
          await updateMedicine(medicine?._id, formValue);
          toast.success("Medicamento actualizado con exito");
        } else {
          await createMedicine(formValue);
          toast.success("Medicamento creado con exito");
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
        placeholder="Nombre del medicamento"
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
        name="posology"
        placeholder="Posologia"
        autoComplete="off"
        value={formik.values.posology}
        onChange={formik.handleChange}
        error={formik.touched.posology && formik.errors.posology}
      />
      <Form.Input
        name="principle"
        placeholder="Principio activo"
        autoComplete="off"
        value={formik.values.principle}
        onChange={formik.handleChange}
        error={formik.touched.principle && formik.errors.principle}
      />
      <Dropdown
        selection
        search
        options={wayOptions}
        value={formik.values.way}
        placeholder="Via de administracion"
        onChange={(e, { value }) => formik.setFieldValue("way", value)}
      />
      <div className="add-edit-form__Active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
          error={formik.errors.active}
        />{" "}
        Medicamento activo
      </div>
      <div className="add-edit-form__Active">
        <Checkbox
          toggle
          checked={formik.values.high_price}
          onChange={(_, data) =>
            formik.setFieldValue("high_price", data.checked)
          }
          error={formik.errors.high_price}
        />{" "}
        Alto costo
      </div>
      <Button
        type="submit"
        primary
        fluid
        content={medicine ? "Actualizar" : "Crear"}
      />{" "}
    </Form>
  );
};

const initialValues = (data) => {
  return {
    name: data?.name || "",
    description: data?.description || "",
    posology: data?.posology || "",
    active: data?.active ? true : false,
    high_price: data?.high_price ? true : false,
    principle: data?.principle || "",
    way: data?.way || "",
  };
};

const newValidationSchema = () => {
  return {
    name: Yup.string().required(true).max(40, "Es muy largo"),
    description: Yup.string().required(true),
    posology: Yup.string().required(true),
    active: Yup.bool().required(true),
    high_price: Yup.bool().required(true),
    principle: Yup.string().required(true).max(40, "Es muy largo"),
    way: Yup.string().required(true),
  };
};

const updateValidationSchema = () => {
  return {
    name: Yup.string().required(true).max(40, "Es muy largo"),
    description: Yup.string().required(true),
    posology: Yup.string().required(true),
    active: Yup.bool().required(true),
    high_price: Yup.bool().required(true),
    principle: Yup.string().required(true).max(40, "Es muy largo"),
    way: Yup.string().required(true),
  };
};
