import React, { useEffect } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  TextArea,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../../hooks/useAuth";
import { useCenter } from "../../../../hooks/useCenter";
import { useDiagnosis } from "../../../../hooks/useDiagnosys";
import { toast } from "react-toastify";

export const CreateNewDiagnosis = ({ patient, onClose, onRefetch }) => {
  const { loading, centers, getCentersByDoctor } = useCenter();
  const { createDiagnosis } = useDiagnosis();
  const { auth } = useAuth();
  const { user } = auth;
  useEffect(() => {
    getCentersByDoctor(user._id);
  }, []);

  const formatCenters = (centers) => {
    return centers?.map((c) => {
      return {
        key: c._id,
        text: `${c.name} - ${c.address}`,
        value: c._id,
      };
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(updateValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = { ...formValue, patient: patient?._id, doctor: user?._id };
        const res = await createDiagnosis(data);

        if (res) toast.success("Diagnóstico generado");
        onRefetch();
        onClose();

        // const data = { ...formValue, last_update: auth?.user?._id };
        // const res = await updateMedicalRecord(medicalRecordDetail?._id, data);
        // if (res)
        //   toast.success("Se ha editado la informacion de historia medica");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const DiagnosysType = [
    { key: "Clínico", text: "Clínico", value: "Clínico" },
    { key: "Certeza", text: "Certeza", value: "Certeza" },
    { key: "Diferencial", text: "Diferencial", value: "Diferencial" },
    { key: "Etiológico", text: "Etiológico", value: "Etiológico" },
    { key: "Genérico", text: "Genérico", value: "Genérico" },
    { key: "Anatómico", text: "Anatómico", value: "Anatómico" },
    { key: "Preliminar", text: "Preliminar", value: "Preliminar" },
    { key: "Sintomático", text: "Sintomático", value: "Sintomático" },
    { key: "Otro", text: "Otro", value: "Otro" },
  ];
  return (
    <div style={{ maxHeight: 800, overflowY: "auto", overflowX: "hidden" }}>
      <Form onSubmit={formik.handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Descripción general</Label>
              <TextArea
                placeholder="Descripción general"
                style={{ minHeight: 100 }}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.errors.description}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Tipo de diagnóstico</Label>
              <Dropdown
                Label="Tipo de diagnóstico"
                selection
                search
                fluid
                name="type"
                options={DiagnosysType}
                onChange={(e, { value }) => formik.setFieldValue("type", value)}
                error={formik.errors.type}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Lugar</Label>
              <Dropdown
                selection
                search
                fluid
                name="healthcenter"
                options={formatCenters(centers)}
                onChange={(e, { value }) =>
                  formik.setFieldValue("healthcenter", value)
                }
                error={formik.errors.healthcenter}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Síntomas</Label>
              <TextArea
                placeholder="Síntomas"
                style={{ minHeight: 100 }}
                name="symptoms"
                value={formik.values.symptoms}
                onChange={formik.handleChange}
                error={formik.errors.symptoms}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Recomendación médica</Label>
              <TextArea
                placeholder="Recomendación médica
                "
                style={{ minHeight: 100 }}
                name="medic_recomendation"
                value={formik.values.medic_recomendation}
                onChange={formik.handleChange}
                error={formik.errors.medic_recomendation}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Recomendación farmacéutica</Label>
              <TextArea
                placeholder="Recomendación farmacéutica"
                style={{ minHeight: 100 }}
                name="pharmaceutic_recomendation"
                value={formik.values.pharmaceutic_recomendation}
                onChange={formik.handleChange}
                error={formik.errors.pharmaceutic_recomendation}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Tratamiento a seguir</Label>
              <TextArea
                placeholder="Tratamiento"
                style={{ minHeight: 100 }}
                name="treatment"
                value={formik.values.treatment}
                onChange={formik.handleChange}
                error={formik.errors.treatment}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column centered>
              <Button type="submit">Guardar</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
};

const initialValues = () => {
  return {
    type: "",
    symptoms: "",
    description: "",
    pharmaceutic_recomendation: "",
    medic_recomendation: "",
    treatment: "",
    healthcenter: "",
  };
};

const updateValidationSchema = () => {
  return {
    type: Yup.string().required(),
    symptoms: Yup.string().required(),
    description: Yup.string().required(),
    pharmaceutic_recomendation: Yup.string().required(),
    medic_recomendation: Yup.string().required(),
    treatment: Yup.string().required(),
    healthcenter: Yup.string().required(),
  };
};
