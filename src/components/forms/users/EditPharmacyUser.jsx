import React, { useEffect } from "react";
import { Button, Checkbox, Dropdown, Form, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import { usePharmacy } from "../../../hooks/usePharmacy";

export const EditPharmacyUser = ({ closeModal, onRefetch, user }) => {
  const { updateUser } = useUser();
  const { loading, pharmacies, getPharmacies } = usePharmacy();

  useEffect(() => {
    getPharmacies();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(updateValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await updateUser(user._id, formValue);
        toast.success("Farmacia asignada con exito");
        onRefetch();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const pharmaOptions = (pharmacies) => {
    return pharmacies?.map((f) => {
      return {
        key: f._id,
        text: f.name,
        value: f._id,
      };
    });
  };

  console.log(pharmaOptions(pharmacies));
  console.log(user);
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
                options={pharmaOptions(pharmacies)}
                defaultValue={user?.pharmacyadmin}
                onChange={(e, { value }) =>
                  formik.setFieldValue("pharmacyadmin", value)
                }
                defaultSelectedLabel="Selecciona una farmacia"
              />
            </div>
            <Button type="submit" primary fluid content={"Asignar Farmacia"} />{" "}
          </>
        )}
      </Form>
    </div>
  );
};

const initialValues = (data) => {
  return {
    pharmacyadmin: data?.pharmacyadmin || "",
  };
};

const updateValidationSchema = () => {
  return {
    pharmacyadmin: Yup.string().required(true),
  };
};
