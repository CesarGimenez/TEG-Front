import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Header,
  Loader,
  Message,
  Table,
} from "semantic-ui-react";
import { map } from "lodash";
import moment from "moment";
import { useAuth } from "../../../hooks/useAuth";
import { useDiagnosis } from "../../../hooks/useDiagnosys";
import { ModalBasic } from "../../../components/modals/ModalBasic";
import { DetailDiagnosys } from "../userHistory/DetailDiagnosys";

export const MyAttentions = () => {
  const { diagnosis, getDiagnosisByDoctor, loading } = useDiagnosis();
  const { auth } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(false);

  useEffect(() => {
    getDiagnosisByDoctor(auth?.user?._id);
  }, []);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showDetailDiagnosys = (diagnosys) => {
    setTitleModal("Detalle de diagnostico medico");
    setContentModal(<DetailDiagnosys diagnosys={diagnosys} />);
    openCloseModal();
  };

  return (
    <>
      <Card fluid centered>
        <Header as="h1">Historial de atenciones</Header>
        {loading ? (
          <Loader>Cargando</Loader>
        ) : (
          <Table>
            <Table.Header>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
              <Table.HeaderCell>Paciente</Table.HeaderCell>
              <Table.HeaderCell>Edad</Table.HeaderCell>
              <Table.HeaderCell>Sexo</Table.HeaderCell>
              <Table.HeaderCell>Lugar</Table.HeaderCell>
              <Table.HeaderCell>Tipo</Table.HeaderCell>
              <Table.HeaderCell>Información detallada</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {map(diagnosis, (d, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {moment(d?.createdAt).format("DD/MM/yyyy hh:mm")}
                  </Table.Cell>
                  <Table.Cell style={{ maxWidth: 300 }}>
                    {d?.patient?.first_name} {d?.patient?.last_name}
                  </Table.Cell>
                  <Table.Cell style={{ maxWidth: 300 }}>
                    {moment().diff(d?.patient?.birthdate, "years")}
                  </Table.Cell>
                  <Table.Cell>
                    {d?.patient?.gender === "M" ? "Masculino" : "Femenino"}
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
          </Table>
        )}
        {(!diagnosis || diagnosis?.length < 1) && (
          <Message warning>
            <Message.Header>Sin atenciones cargadas </Message.Header>
            <p>No presentas atenciones generadas a ningun paciente todavia.</p>
          </Message>
        )}
      </Card>
      <ModalBasic
        show={showModal}
        size={"huge"}
        title={titleModal}
        onClose={openCloseModal}
        content={contentModal}
      />
    </>
  );
};
