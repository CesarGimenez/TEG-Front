import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleMapReact from "google-map-react";
import { toast } from "react-toastify";
import { usePharmacy } from "../../../hooks/usePharmacy";

export const AddEditPharmacyForm = ({ closeModal, onRefetch, pharma }) => {
  const [coordinates, setCoordinates] = useState(null);

  const { loading, createPharmacy, updatePharmacy } = usePharmacy();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  const formik = useFormik({
    initialValues: initialValues(pharma),
    validationSchema: Yup.object(
      pharma ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (pharma) {
          await updatePharmacy(pharma?._id, formValue);
          toast.success("Farmacia editada con exito");
        } else {
          await createPharmacy(formValue);
          toast.success("Farmacia creada con exito");
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
        placeholder="Nombre de la farmacia"
        autoComplete="off"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
      />
      <Form.Input
        name="address"
        placeholder="Direccion"
        autoComplete="off"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && formik.errors.address}
      />
      <Form.Input
        name="phones"
        placeholder="Telefono"
        autoComplete="off"
        value={formik.values.phones}
        onChange={formik.handleChange}
        error={formik.touched.phones && formik.errors.phones}
      />
      <div className="add-edit-form__Active">
        <Checkbox
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
          error={formik.errors.is_active}
        />{" "}
        Farmacia activa
      </div>
      <div className="map_container_modal" style={{ height: 400 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAfwClphOoi7iVTBDmOmIqW47k3HfJ8AgU" }}
          defaultCenter={pharma ? formik.values.location : coordinates}
          center={pharma ? formik.values.location : coordinates}
          defaultZoom={15}
          margin={[50, 50, 50, 50]}
          onClick={(e) => {
            let newLocation = { lat: e.lat, lng: e.lng };
            formik.setFieldValue("location", newLocation);
          }}
        >
          {formik.values.location && (
            <div
              lat={formik?.values?.location?.lat}
              lng={formik?.values?.location?.lng}
              className="marker_container"
            >
              <Icon className="marker_icon" name="map marker alternate" />
            </div>
          )}
        </GoogleMapReact>
      </div>
      <Button
        type="submit"
        primary
        fluid
        content={pharma ? "Actualizar" : "Crear"}
      />{" "}
    </Form>
  );
};

const initialValues = (data) => {
  return {
    name: data?.name || "",
    phones: data?.phones || "",
    address: data?.address || "",
    is_active: data?.is_active ? true : false,
    location: data?.location || null,
  };
};

const newValidationSchema = () => {
  return {
    name: Yup.string().required(true),
    phones: Yup.string().required(true).max(20, "Es muy largo"),
    address: Yup.string().required(true).max(40, "Es muy largo"),
    is_active: Yup.bool().required(true),
  };
};

const updateValidationSchema = () => {
  return {
    name: Yup.string().required(true),
    phones: Yup.string().max(20, "Es muy largo"),
    address: Yup.string().max(40, "Es muy largo"),
    is_active: Yup.bool().required(true),
  };
};
