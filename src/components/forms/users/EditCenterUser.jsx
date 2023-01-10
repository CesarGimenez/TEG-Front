import React, { useEffect } from "react";
import { Button, Checkbox, Dropdown, Form, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import { useCenter } from "../../../hooks/useCenter";

export const EditCenterUser = ({ closeModal, onRefetch, user }) => {
  const { updateUser } = useUser();
  const { loading, centers, getCenters } = useCenter();

  useEffect(() => {
    getCenters();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(updateValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await updateUser(user._id, formValue);
        toast.success("Centro de salud asignado con exito");
        onRefetch();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const centersOptions = (centers) => {
    return centers?.map((c) => {
      return {
        key: c._id,
        text: c.name,
        value: c._id,
      };
    });
  };
  return (
    <div>
      <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="add-edit-user-form__Active">
              <Dropdown
                search
                selection
                fluid
                options={centersOptions(centers)}
                defaultValue={user?.centeradmin}
                onChange={(e, { value }) =>
                  formik.setFieldValue("centeradmin", value)
                }
                defaultSelectedLabel="Selecciona un centro de salud"
              />
            </div>
            <Button type="submit" primary fluid content={"Asignar centro"} />{" "}
          </>
        )}
      </Form>
    </div>
  );
};

const initialValues = (data) => {
  return {
    centeradmin: data?.centeradmin || "",
  };
};

const updateValidationSchema = () => {
  return {
    centeradmin: Yup.string().required(true),
  };
};
