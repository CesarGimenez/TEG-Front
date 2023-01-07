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
import { map } from "lodash";
import { useDiagnosis } from "../../../hooks/useDiagnosys";
import { HeaderPage } from "../../AdminDashboard/Header";

export const DetailHistory = ({
  medicalRecordDetail,
  patient,
  addNewDiagnosis,
  addNewDocument,
}) => {
  const { loading, diagnosis, getDiagnosisByPatient } = useDiagnosis();
  useEffect(() => {
    getDiagnosisByPatient(patient?._id);
  }, []);
  return (
    <div>
      <div style={{ marginTop: 20, marginBottom: 30 }}>
        <Header as="h3">Historia medica</Header>
      </div>
      <div>
        <div>
          <Form>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Antescedentes generales</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Antescedentes generales.."
                    value={medicalRecordDetail?.general}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Antescedentes personales</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Antescedentes personales.."
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Antescedentes familiares</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Antescedentes familiares.."
                  />
                </Grid.Column>
              </Grid.Row>
              {patient?.gender === "F" && (
                <Grid.Row>
                  <Grid.Column>
                    <Label size="large">
                      Antescedentes ginecologicos-ginecobstetricos
                    </Label>
                    <TextArea
                      style={{ minHeight: 100 }}
                      placeholder="Antescedentes ginecologicos-ginecobstetricos.."
                    />
                  </Grid.Column>
                </Grid.Row>
              )}

              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Antescedentes quirurgicos</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Antescedentes quirurgicos.."
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Padecimiento actual</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Padecimiento actual.."
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Inmunizaciones</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Describa las inmunizaciones.."
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Tratamiento actual</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Describa el Tratamiento.."
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Label size="large">Plan terapeutico actual</Label>
                  <TextArea
                    style={{ minHeight: 100 }}
                    placeholder="Describa el plan terapeutico.."
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button>Actualizar historia</Button>
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
          <Table.HeaderCell>Lugar de atencion</Table.HeaderCell>
          <Table.HeaderCell>Tipo</Table.HeaderCell>
          <Table.HeaderCell>Informacion detallada</Table.HeaderCell>
        </Table.Row>
        {diagnosis && (
          <Table.Body>
            {map(diagnosis, (d, index) => (
              <Table.Row key={index}>
                {/* <Table.Cell>{area?.name || "Sin informacion"}</Table.Cell>
                  <Table.Cell style={{ maxWidth: 300 }}>
                    {area?.description || "Sin informacion"}
                  </Table.Cell>
                  <Table.Cell>
                    {area?.active ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>

                  <Actions
                    area={area}
                    updateArea={updateArea}
                    showConfirm={showConfirm}
                  /> */}
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
          <Table.HeaderCell>Descripcion</Table.HeaderCell>
          <Table.HeaderCell>Tipo de archivo</Table.HeaderCell>
          <Table.HeaderCell>Ver/Descargar</Table.HeaderCell>
        </Table.Row>
      </Table>
    </div>
  );
};
