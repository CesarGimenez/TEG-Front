import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Form, Image } from "semantic-ui-react";
import { useCloudinary } from "../../../../hooks/useCloudinary";
import { useAuth } from "../../../../hooks/useAuth";
import { useAttachment } from "../../../../hooks/useAttachment";

export const UploadDocument = ({ patient, onClose, onRefetch }) => {
  const [document, setDocument] = useState(null);
  const { loading, docs, createDoc } = useAttachment();
  const { uploadImageToCloudinary } = useCloudinary();
  const { auth } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      // const updated = await updateUser(user?._id, formValue);
      // if (updated) {
      //   onRefetch();
      //   openCloseModal();
      //   toast.success("Se ha cambiado la informacion del usuario");
      // } else {
      //   toast.error("Ocurrio un error al actualizar informacion del usuario");
      // }
    },
  });

  const uploadDocument = async () => {
    const result = await uploadImageToCloudinary(formik.values.url_doc);
    const { secure_url, format } = result;
    const body = {
      url_doc: secure_url,
      description: formik.values.description,
      type: format,
      uploaded_by: auth?.user?._id,
      patient: patient?._id,
    };
    if (result) {
      await createDoc(body);
      onRefetch();
      onClose();
      toast.success("Se ha subido el documento");
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    formik.setFieldValue("url_doc", file);
    setDocument(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*, application/pdf, .doc, .docx, .csv, .odt",
    noKeyboard: true,
    multiple: true,
    onDrop,
  });
  return (
    <div>
      <Form>
        <input {...getInputProps()} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image src={document} size="big" />
        </div>
        {document && (
          <Form.Input
            label="Descripcion breve de documento"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        )}
        {!document ? (
          <Button
            type="button"
            fluid
            {...getRootProps()}
            content="Seleccionar documento"
          />
        ) : (
          <Button
            type="button"
            fluid
            content="Subir documento"
            onClick={() => uploadDocument()}
          />
        )}
      </Form>
    </div>
  );
};

const initialValues = () => {
  return {
    description: "",
    url_doc: "",
  };
};

const validationSchema = () => {
  return {
    description: Yup.string().required().trim(),
    url_doc: Yup.string().required(),
  };
};
