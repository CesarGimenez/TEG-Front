import React, { useEffect, useState } from "react";
import { Icon, Loader, Table, Button, Pagination } from "semantic-ui-react";
import { map } from "lodash";
import { useCenter } from "../../../hooks/useCenter";
import { HeaderPage } from "../Header";
import { AddEditCenterForm } from "../../../components/forms/centers/AddEditCenterForm";
import { ModalBasic } from "../../../components/modals/ModalBasic";
import { ConfirmBasic } from "../../../components/modals/ConfirmBasic";

export const CentersTable = () => {
  const { loading, centers, getCenters, countCenters } = useCenter();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);

  const [activePage, setActivePage] = useState(1);
  const limit = 10;
  const pages = Math.ceil(countCenters / limit);
  const skip = limit * activePage - limit;

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);

  const addCenter = () => {
    setTitleModal("Nuevo centro de salud");
    setContentModal(
      <AddEditCenterForm closeModal={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateCenter = (data) => {
    setTitleModal("Actualizar centro de salud");
    setContentModal(
      <AddEditCenterForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        center={data}
      />
    );
    openCloseModal();
  };

  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar el centro '${data?.name}'?`);
    setConfirmState(true);
  };

  useEffect(() => {
    getCenters(limit, skip);
  }, [activePage, refetch]);

  return (
    <div>
      <HeaderPage
        titlePage="Centros de salud"
        btnTitle="Nuevo centro"
        btnClick={addCenter}
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
                <Table.HeaderCell>Telefono</Table.HeaderCell>
                <Table.HeaderCell>Activo</Table.HeaderCell>
                <Table.HeaderCell>Publico</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {map(centers, (center, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{center?.name || "Sin informacion"}</Table.Cell>
                  <Table.Cell style={{ maxWidth: 300 }}>
                    {center?.address || "Sin informacion"}
                  </Table.Cell>
                  <Table.Cell style={{ maxWidth: 300 }}>
                    {center?.phones || "Sin informacion"}
                  </Table.Cell>
                  <Table.Cell>
                    {center?.is_active ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {center?.is_public ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>

                  <Actions
                    center={center}
                    updateCenter={updateCenter}
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

const Actions = ({ center, updateCenter, showConfirm }) => {
  return (
    <Table.Cell textAlign="center">
      <Button icon negative onClick={() => showConfirm(center)}>
        <Icon name="pencil" /> Medicos
      </Button>
      <Button icon onClick={() => updateCenter(center)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(center)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
