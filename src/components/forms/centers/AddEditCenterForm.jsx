import React, { useEffect, useState } from "react";
import { Button, Checkbox, Dropdown, Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import GoogleMapReact from "google-map-react";
import { useCenter } from "../../../hooks/useCenter";

export const AddEditCenterForm = ({ closeModal, onRefetch, center }) => {
  const { loading, createCenter, updateCenter } = useCenter();
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  const formik = useFormik({
    initialValues: initialValues(center),
    validationSchema: Yup.object(
      center ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (center) {
          await updateCenter(center?._id, formValue);
          toast.success("Centro de salud actualizado con exito");
        } else {
          await createCenter(formValue);
          toast.success("Centro de salud creado con exito");
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
        placeholder="Nombre del centro"
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
        placeholder="Telefonos"
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
        Centro activo
      </div>
      <div className="add-edit-form__Active">
        <Checkbox
          toggle
          checked={formik.values.is_public}
          onChange={(_, data) =>
            formik.setFieldValue("is_public", data.checked)
          }
          error={formik.errors.is_public}
        />{" "}
        Es publico
      </div>
      <div className="map_container_modal" style={{ height: 400 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAfwClphOoi7iVTBDmOmIqW47k3HfJ8AgU" }}
          defaultCenter={center ? formik.values?.location : coordinates}
          center={center ? formik.values?.location : coordinates}
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
        content={center ? "Actualizar" : "Crear"}
      />{" "}
    </Form>
  );
};

const initialValues = (data) => {
  return {
    name: data?.name || "",
    address: data?.address || "",
    phones: data?.phones || "",
    is_active: data?.is_active ? true : false,
    is_public: data?.is_public ? true : false,
    location: data?.location || null,
  };
};

const newValidationSchema = () => {
  return {
    name: Yup.string().required(true).max(40, "Es muy largo"),
    is_active: Yup.bool().required(true),
    is_public: Yup.bool().required(true),
    address: Yup.string().required(true).max(40, "Es muy largo"),
    phones: Yup.string().required(true).max(20, "Es muy largo"),
  };
};

const updateValidationSchema = () => {
  return {
    name: Yup.string().required(true).max(40, "Es muy largo"),
    is_active: Yup.bool().required(true),
    is_public: Yup.bool().required(true),
    address: Yup.string().required(true).max(40, "Es muy largo"),
    phones: Yup.string().required(true).max(20, "Es muy largo"),
  };
};
