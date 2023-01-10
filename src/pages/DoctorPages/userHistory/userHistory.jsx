import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Label,
  Loader,
} from "semantic-ui-react";
import { useUser } from "../../../hooks/useUser";
import { useMedicalRecord } from "../../../hooks/useMedicalRecord";
import { ModalBasic } from "../../../components/modals/ModalBasic";
import { RequestUserHistory } from "../userHistory/requestUserHistory";
import { DetailHistory } from "./DetailHistory";
import { CreateNewDiagnosis } from "./forms/CreateNewDiagnosis";
import { UploadDocument } from "./forms/UploadDocument";
import { DetailDiagnosys } from "./DetailDiagnosys";

export const UserHistory = () => {
  const params = useParams();
  const { loading, getUser, userDetail } = useUser();
  const { medicalRecordDetail, getMedicalRecordByPatient } = useMedicalRecord();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(false);

  const [refetch, setRefetch] = useState(false);
  const [validate, setValidate] = useState(false);

  const onValidate = () => setValidate((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const requestPermissionMedicalRecord = () => {
    setTitleModal("Permiso de acceso");
    setContentModal(
      <RequestUserHistory
        user={userDetail}
        onValidate={onValidate}
        onClose={openCloseModal}
      />
    );
    openCloseModal();
  };

  const addNewDiagnosis = () => {
    setTitleModal("Creacion de nuevo diagnostico");
    setContentModal(
      <CreateNewDiagnosis
        patient={userDetail}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const addNewDocument = () => {
    setTitleModal("Subida de nuevo documento");
    setContentModal(
      <UploadDocument
        patient={userDetail}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const showDetailDiagnosys = (diagnosys) => {
    setTitleModal("Detalle de diagnostico medico");
    setContentModal(<DetailDiagnosys diagnosys={diagnosys} />);
    openCloseModal();
  };

  useEffect(() => {
    getUser(params?.id);
    getMedicalRecordByPatient(params?.id);
  }, []);

  return (
    <>
      {loading ? (
        <Loader>... Cargando</Loader>
      ) : (
        <Card fluid centered>
          <Header as="h2">Informacion de paciente</Header>
          <Header as="h3">Datos basicos</Header>
          <div>
            <div>
              <Form>
                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Input
                        label="Nombre completo"
                        value={`${userDetail?.first_name} ${userDetail?.last_name}`}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input label="DNI" value={`${userDetail?.dni}`} />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        label="Fecha de nacimiento"
                        value={`${moment(userDetail?.birthdate).format(
                          "DD/MM/yyyy"
                        )}`}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        label="Genero"
                        value={`${
                          userDetail?.gender === "M" ? "Masculino" : "Femenino"
                        }`}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Input
                        label="Telefono"
                        value={`${userDetail?.phone}`}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        label="Telefono de familiar"
                        value={`${userDetail?.parent_phone}`}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        label="Correo electronico"
                        value={`${userDetail?.email}`}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        label="Direccion"
                        value={`${userDetail?.address}`}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Input
                        label="Grupo sanguineo"
                        value={`${userDetail?.blood_group}`}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            {!loading && medicalRecordDetail ? (
              <>
                {!validate && (
                  <Button onClick={() => requestPermissionMedicalRecord()}>
                    Ver historia medica
                  </Button>
                )}
              </>
            ) : (
              <Label centered size="large">
                Este paciente aun no posee historia medica, solicite ayuda con
                administracion
              </Label>
            )}
          </div>
          {validate && (
            <>
              <DetailHistory
                medicalRecordDetail={medicalRecordDetail}
                patient={userDetail}
                addNewDiagnosis={addNewDiagnosis}
                addNewDocument={addNewDocument}
                refetch={refetch}
                showDetailDiagnosys={showDetailDiagnosys}
              />
            </>
          )}
        </Card>
      )}
      <ModalBasic
        show={showModal}
        size={validate ? "huge" : "tiny"}
        title={titleModal}
        onClose={openCloseModal}
        content={contentModal}
      />
    </>
  );
};
