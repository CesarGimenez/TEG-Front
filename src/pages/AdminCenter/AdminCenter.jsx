import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Header,
  Icon,
  Label,
  Loader,
  Table,
} from "semantic-ui-react";
import { map } from "lodash";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";
import { useCenter } from "../../hooks/useCenter";
import { HeaderPage } from "../AdminDashboard/Header";
import { ModalBasic } from "../../components/modals/ModalBasic";
import { AddEditCenterForm } from "../../components/forms/centers/AddEditCenterForm";
import { AddDoctorToCenter } from "../../components/forms/centers/AddDoctorToCenter";
import "./AdminCenter.scss";
import { Navigate } from "react-router-dom";

export const AdminCenter = () => {
  const { auth } = useAuth();
  if (!auth?.user?.centeradmin) return <Navigate to="/" replace />;
  const { loading, getOneCenter, currentCenter, updateCenter } = useCenter();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const center = auth.user.centeradmin;

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);

  const addDoctors = (center) => {
    setTitleModal("Agregar medico");
    setContentModal(
      <AddDoctorToCenter
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        center={center}
      />
    );
    openCloseModal();
  };

  const removeDoctor = async (doctor) => {
    const doctors = currentCenter?.doctors?.map((doc) => doc._id);
    const newArrayDrs = doctors.filter((doc) => doc != doctor._id);
    await updateCenter(currentCenter?._id, { doctors: newArrayDrs });
    onRefetch();
  };

  const infodoctor = () => {
    setTitleModal("Informacion de medico");
    setContentModal();
    openCloseModal();
  };

  const updateCenterInfo = (data) => {
    setTitleModal("Actualizar centro");
    setContentModal(
      <AddEditCenterForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        center={data}
      />
    );
    openCloseModal();
  };

  useEffect(() => {
    getOneCenter(center?._id);
  }, [refetch]);
  return (
    <div>
      <Card fluid centered>
        {loading ? (
          <Loader active inline="centered">
            Cargando...
          </Loader>
        ) : (
          <>
            <HeaderPage
              titlePage={`Centro de salud ${currentCenter?.name}`}
              btnTitle="Editar informacion"
              btnClick={() => updateCenterInfo(currentCenter)}
            />{" "}
            <Label size="big">Nombre: {currentCenter?.name}</Label>
            <Label size="big">Direccion: {currentCenter?.address}</Label>
            <Label size="big">Telefono: {currentCenter?.phones}</Label>
            <Label size="big">
              Accesibilidad: {currentCenter?.is_public ? "Publica" : "Privada"}
            </Label>
            <Button
              onClick={() => addDoctors(currentCenter)}
              style={{ width: 300 }}
            >
              Agregar Medico
            </Button>
            {currentCenter?.doctors?.length > 0 ? (
              <Header as={"h3"}>Medicos registrados</Header>
            ) : (
              <Header as={"h3"}>Aun no existen medicos registrados</Header>
            )}
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>DNI</Table.HeaderCell>
                  <Table.HeaderCell>Edad</Table.HeaderCell>
                  <Table.HeaderCell>Medico verificado</Table.HeaderCell>
                  <Table.HeaderCell textAlign="right">
                    Informacion
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {map(currentCenter?.doctors, (doctor, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      {doctor?.first_name} {doctor?.last_name}
                    </Table.Cell>
                    <Table.Cell>{doctor?.dni || "Sin informacion"}</Table.Cell>
                    <Table.Cell>
                      {moment().diff(doctor?.birthdate, "years") || "(N/A)"}
                    </Table.Cell>
                    <Table.Cell>
                      {doctor?.is_verified ? (
                        <Icon name="check" />
                      ) : (
                        <Icon name="close" />
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Button icon negative onClick={() => infodoctor()}>
                        <Icon name="eye" /> Ver informacion detallada
                      </Button>
                      <Button
                        icon
                        negative
                        onClick={() => removeDoctor(doctor)}
                      >
                        <Icon name="trash" /> Remover
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        )}
      </Card>
      <ModalBasic
        show={showModal}
        title={titleModal}
        onClose={openCloseModal}
        content={contentModal}
      />
    </div>
  );
};
