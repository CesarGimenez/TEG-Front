import React, { useEffect, useState } from "react";
import { usePharmacy } from "../../../hooks/usePharmacy";
import { map } from "lodash";
import { Button, Icon, Loader, Pagination, Table } from "semantic-ui-react";
import { AddEditPharmacyForm } from "../../../components/forms/pharmacies/AddEditPharmacyForm";
import { ModalBasic } from "../../../components/modals/ModalBasic";
import { ConfirmBasic } from "../../../components/modals/ConfirmBasic";
import { HeaderPage } from "../Header";

export const PharmaciesTable = () => {
  const { loading, pharmacies, getPharmacies, countPharmacies } = usePharmacy();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);

  const [activePage, setActivePage] = useState(1);
  const limit = 10;
  const pages = Math.ceil(countPharmacies / limit);
  const skip = limit * activePage - limit;

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);

  const addPharmacy = () => {
    setTitleModal("Nueva farmacia");
    setContentModal(
      <AddEditPharmacyForm closeModal={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updatePharmacy = (data) => {
    setTitleModal("Actualizar farmacia");
    setContentModal(
      <AddEditPharmacyForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        pharma={data}
      />
    );
    openCloseModal();
  };

  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar la farmacia ${data?.name}?`);
    setConfirmState(true);
  };

  useEffect(() => {
    getPharmacies(limit, skip);
  }, [refetch, activePage]);

  return (
    <div>
      <HeaderPage
        titlePage="Farmacias"
        btnTitle="Nueva farmacia"
        btnClick={addPharmacy}
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
                <Table.HeaderCell>Direccion</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Telefono</Table.HeaderCell>
                <Table.HeaderCell>Activa</Table.HeaderCell>
                <Table.HeaderCell>Posee almacen</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {map(pharmacies, (pharma, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{pharma?.name || "Sin informacion"}</Table.Cell>
                  <Table.Cell>
                    {pharma?.address || "Sin informacion"}
                  </Table.Cell>
                  <Table.Cell>{pharma?.state || "Sin informacion"}</Table.Cell>
                  <Table.Cell>{pharma?.phones || "Sin informacion"}</Table.Cell>
                  <Table.Cell>
                    {pharma.is_active ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {pharma?.medicines?.length > 0 ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>

                  <Actions
                    pharma={pharma}
                    updatePharmacy={updatePharmacy}
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

const Actions = ({ pharma, updatePharmacy, showConfirm }) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon negative onClick={() => showConfirm(pharma)}>
        <Icon name="pencil" /> Medicamentos
      </Button>
      <Button icon onClick={() => updatePharmacy(pharma)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(pharma)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
