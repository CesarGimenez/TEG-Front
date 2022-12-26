import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { Button, Icon, Loader, Pagination, Table } from "semantic-ui-react";
import { useDisease } from "../../../hooks/useDisease";
import { HeaderPage } from "../Header";
import { AddEditDiseaseForm } from "../../../components/forms/diseases/AddEditDiseaseForm";
import { ModalBasic } from "../../../components/modals/ModalBasic";
import { ConfirmBasic } from "../../../components/modals/ConfirmBasic";

export const DiseaseTable = () => {
  const { loading, diseases, getDiseases, countDiseases } = useDisease();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);

  const [activePage, setActivePage] = useState(1);
  const limit = 10;
  const pages = Math.ceil(countDiseases / limit);
  const skip = limit * activePage - limit;

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);

  const addDisease = () => {
    setTitleModal("Nueva enfermedad");
    setContentModal(
      <AddEditDiseaseForm closeModal={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateDisease = (data) => {
    setTitleModal("Actualizar enfermedad");
    setContentModal(
      <AddEditDiseaseForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        disease={data}
      />
    );
    openCloseModal();
  };

  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar la enfermedad '${data?.name}'?`);
    setConfirmState(true);
  };

  useEffect(() => {
    getDiseases(limit, skip);
  }, [activePage, refetch]);

  return (
    <div>
      <HeaderPage
        titlePage="Enfermedades"
        btnTitle="Nueva enfermedad"
        btnClick={addDisease}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Descripcion</Table.HeaderCell>
                <Table.HeaderCell>Activa</Table.HeaderCell>
                <Table.HeaderCell>Requiere diagnostico</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {map(diseases, (disease, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{disease?.name || "Sin informacion"}</Table.Cell>
                  <Table.Cell style={{ maxWidth: 300 }}>
                    {disease?.description || "Sin informacion"}
                  </Table.Cell>
                  <Table.Cell>
                    {disease?.active ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {disease?.require_diagnosys ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>

                  <Actions
                    disease={disease}
                    updateDisease={updateDisease}
                    showConfirm={showConfirm}
                  />
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Pagination
            boundaryRange={0}
            defaultActivePage={activePage}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true,
            }}
            firstItem={{
              content: <Icon name="angle double left" />,
              icon: true,
            }}
            lastItem={{
              content: <Icon name="angle double right" />,
              icon: true,
            }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            siblingRange={1}
            totalPages={pages}
            onPageChange={(e, data) => setActivePage(data.activePage)}
          />
        </>
      )}
      <ModalBasic
        show={showModal}
        title={titleModal}
        onClose={openCloseModal}
        content={contentModal}
      />
      <ConfirmBasic
        show={confirmState}
        onCancel={() => setConfirmState(false)}
        onConfirm={() => console.log("hola")}
        title={titleConfirm}
      />
    </div>
  );
};

const Actions = ({ disease, updateDisease, showConfirm }) => {
  return (
    <Table.Cell textAlign="center">
      <Button icon negative onClick={() => showConfirm(disease)}>
        <Icon name="pencil" /> Areas
      </Button>
      <Button icon onClick={() => updateDisease(disease)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(disease)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
