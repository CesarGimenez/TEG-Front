import React, { useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Label,
  Table,
  TextArea,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from "lodash";
import moment from "moment";
import { useDiagnosis } from "../../../hooks/useDiagnosys";
import { HeaderPage } from "../../AdminDashboard/Header";
import { useMedicalRecord } from "../../../hooks/useMedicalRecord";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useAttachment } from "../../../hooks/useAttachment";

export const DetailHistory = ({
  medicalRecordDetail,
  patient,
  addNewDiagnosis,
  addNewDocument,
  refetch,
  showDetailDiagnosys,
}) => {
  const { loading, diagnosis, getDiagnosisByPatient } = useDiagnosis();
  const { docs, getDocsByPatient } = useAttachment();
  const { updateMedicalRecord } = useMedicalRecord();
  const { auth } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(medicalRecordDetail),
    validationSchema: Yup.object(updateValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = { ...formValue, last_update: auth?.user?._id };
        const res = await updateMedicalRecord(medicalRecordDetail?._id, data);
        if (res)
          toast.success("Se ha editado la informacion de historia medica");
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    getDiagnosisByPatient(patient?._id);
    getDocsByPatient(patient?._id);
  }, [refetch]);

  return (
    <div>
      <div style={{ marginTop: 20, marginBottom: 30 }}>
        <Header as="h3">Historia médica</Header>
      </div>
      <div>
        <div>
          <Form onSubmit={formik.handleSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Antecedentes generales</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Antecedentes generales.."
                    onChange={formik.handleChange}
                    name="general"
                    value={formik.values.general}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Antecedentes personales</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Antecedentes personales.."
                    onChange={formik.handleChange}
                    name="personal_history"
                    value={formik.values.personal_history}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Antecedentes familiares</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Antecedentes familiares.."
                    onChange={formik.handleChange}
                    name="family_history"
                    value={formik.values.family_history}
                  />
                </Grid.Column>
              </Grid.Row>
              {patient?.gender === "F" && (
                <Grid.Row>
                  <Grid.Column>
                    <Label size="large">
                      Antecedentes ginecológicos-ginecobstetricos{" "}
                    </Label>
                    <TextArea
                      style={{ minHeight: 100 }}
                      placeholder="Antecedentes ginecológicos-ginecobstetricos.."
                      onChange={formik.handleChange}
                      name="gynecologic_history"
                      value={formik.values.gynecologic_history}
                    />
                  </Grid.Column>
                </Grid.Row>
              )}

              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Antecedentes quirúrgicos</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Antecedentes quirúrgicos.."
                    onChange={formik.handleChange}
                    name="surgical_history"
                    value={formik.values.surgical_history}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Padecimiento actual</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Padecimiento actual.."
                    onChange={formik.handleChange}
                    name="current_illness"
                    value={formik.values.current_illness}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Inmunizaciones</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Describa las inmunizaciones.."
                    onChange={formik.handleChange}
                    name="immunizations"
                    value={formik.values.immunizations}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Tratamiento actual</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Describa el Tratamiento.."
                    onChange={formik.handleChange}
                    name="treatment"
                    value={formik.values.treatment}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Plan terapeutico actual</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Describa el plan terapeutico.."
                    onChange={formik.handleChange}
                    name="therapeutic_plan"
                    value={formik.values.therapeutic_plan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">
                    Ultima edicion:{" "}
                    {medicalRecordDetail?.last_update ? (
                      <>
                        {`${medicalRecordDetail?.last_update?.first_name} ${
                          medicalRecordDetail?.last_update?.last_name
                        }, ${moment(medicalRecordDetail?.updatedAt).format(
                          "DD/MM/yyyy hh:mm"
                        )}`}
                      </>
                    ) : (
                      <p>Aun no se registran cambios</p>
                    )}
                  </Label>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button type="submit">Actualizar historia</Button>
          </Form>
        </div>
      </div>
      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <HeaderPage
          titlePage="Historial de diagnosticos medicos"
          btnTitle="Generar diagnostico"
          btnClick={addNewDiagnosis}
        />
      </div>
      <Table>
        <Table.Row>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell>Atendido por</Table.HeaderCell>
          <Table.HeaderCell>Lugar de atención</Table.HeaderCell>
          <Table.HeaderCell>Tipo de diagnóstico</Table.HeaderCell>
          <Table.HeaderCell>Información detallada</Table.HeaderCell>
        </Table.Row>
        {diagnosis && (
          <Table.Body>
            {map(diagnosis, (d, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  {moment(d?.createdAt).format("DD/MM/yyyy hh:mm")}
                </Table.Cell>
                <Table.Cell style={{ maxWidth: 300 }}>
                  {d?.doctor?.gender === "M" ? "Dr." : "Dra"}
                  {d?.doctor?.first_name} {d?.doctor?.last_name}
                </Table.Cell>
                <Table.Cell>{d?.healthcenter?.name}</Table.Cell>
                <Table.Cell>{d?.type}</Table.Cell>

                <Table.Cell>
                  <Button
                    content="Ver"
                    onClick={() => showDetailDiagnosys(d)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <HeaderPage
          titlePage="Documentos o examenes cargados a este paciente"
          btnTitle="Subir nuevo"
          btnClick={addNewDocument}
        />
      </div>
      <Table>
        <Table.Row>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell>Subido por</Table.HeaderCell>
          <Table.HeaderCell>Descripción</Table.HeaderCell>
          <Table.HeaderCell>Tipo de archivo</Table.HeaderCell>
          <Table.HeaderCell>Ver/Descargar</Table.HeaderCell>
        </Table.Row>
        {docs && (
          <Table.Body>
            {map(docs, (d, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  {moment(d?.createdAt).format("DD/MM/yyyy hh:mm")}
                </Table.Cell>
                <Table.Cell style={{ maxWidth: 300 }}>
                  {d?.uploaded_by?.first_name || "Sin detalles"}{" "}
                  {d?.uploaded_by?.last_name || "Sin detalles"}
                </Table.Cell>
                <Table.Cell style={{ maxWidth: 300 }}>
                  {d?.description || "Sin detalles"}
                </Table.Cell>
                <Table.Cell>{d?.type}</Table.Cell>
                <Table.Cell>
                  <Button
                    content="Ver/Descargar"
                    onClick={() => window.open(d?.url_doc)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
    </div>
  );
};

const initialValues = (data) => {
  return {
    general: data?.general || "Sin información",
    current_illness: data?.current_illness || "Sin información",
    personal_history: data?.personal_history || "Sin información",
    family_history: data?.family_history || "Sin información",
    surgical_history: data?.surgical_history || "Sin información",
    immunizations: data?.immunizations || "Sin información",
    gynecologic_history: data?.gynecologic_history || "Sin información",
    treatment: data?.treatment || "Sin información",
    therapeutic_plan: data?.therapeutic_plan || "Sin información",
  };
};

const updateValidationSchema = () => {
  return {
    general: Yup.string(),
    current_illness: Yup.string(),
    personal_history: Yup.string(),
    family_history: Yup.string(),
    surgical_history: Yup.string(),
    immunizations: Yup.string(),
    gynecologic_history: Yup.string(),
    treatment: Yup.string(),
    therapeutic_plan: Yup.string(),
  };
};
