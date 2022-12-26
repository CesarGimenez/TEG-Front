import React, { useEffect, useState } from "react";
import { useMedicine } from "../../../hooks/useMedicine";
import { map } from "lodash";
import { Button, Icon, Loader, Pagination, Table } from "semantic-ui-react";
import { AddEditMedicineForm } from "../../../components/forms/medicines/AddEditMedicineForm";
import { HeaderPage } from "../Header";
import { ModalBasic } from "../../../components/modals/ModalBasic";
import { ConfirmBasic } from "../../../components/modals/ConfirmBasic";

export const MedicinesTable = () => {
  const { loading, medicines, getMedicines, countMedicines } = useMedicine();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);

  const [activePage, setActivePage] = useState(1);
  const limit = 10;

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);

  const addMedicine = () => {
    setTitleModal("Nuevo medicamento");
    setContentModal(
      <AddEditMedicineForm closeModal={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateMedicine = (data) => {
    setTitleModal("Actualizar medicamento");
    setContentModal(
      <AddEditMedicineForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        medicine={data}
      />
    );
    openCloseModal();
  };

  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar el medicamento '${data?.name}?'`);
    setConfirmState(true);
  };

  const pages = Math.ceil(countMedicines / limit);
  const skip = limit * activePage - limit;
  useEffect(() => {
    getMedicines(limit, skip);
  }, [refetch, activePage]);

  return (
    <div>
      <HeaderPage
        titlePage="Medicamentos"
        btnTitle="Nuevo medicamento"
        btnClick={addMedicine}
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
                <Table.HeaderCell>Via de administracion</Table.HeaderCell>
                <Table.HeaderCell>Alto costo</Table.HeaderCell>
                <Table.HeaderCell>Activa</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {map(medicines, (medicine, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{medicine?.name || "Sin informacion"}</Table.Cell>
                  <Table.Cell style={{ maxWidth: 200 }}>
                    {medicine?.description || "Sin informacion"}
                  </Table.Cell>
                  <Table.Cell>{medicine?.way || "Sin informacion"}</Table.Cell>
                  <Table.Cell>
                    {medicine?.high_price ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {medicine?.active ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>

                  <Actions
                    medicine={medicine}
                    updateMedicine={updateMedicine}
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

const Actions = ({ medicine, updateMedicine, showConfirm }) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateMedicine(medicine)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(medicine)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
