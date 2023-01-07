import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Form, Image } from "semantic-ui-react";
import { useCloudinary } from "../../../../hooks/useCloudinary";

export const UploadDocument = ({ patient }) => {
  const [document, setDocument] = useState(null);
  const { uploadImageToCloudinary, uploadImageUser } = useCloudinary();
  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    // await formik.setFieldValue("image", file);
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
        {document && <Form.Input label="Descripcion breve de documento" />}
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
            onClick={() => console.log("subido")}
          />
        )}
      </Form>
    </div>
  );
};
