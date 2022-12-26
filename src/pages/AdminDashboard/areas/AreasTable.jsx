import React, { useEffect, useState } from "react";
import { Button, Icon, Loader, Pagination, Table } from "semantic-ui-react";
import { map } from "lodash";
import { AddEditAreaForm } from "../../../components/forms/areas/AddEditAreaForm";
import { useArea } from "../../../hooks/useArea";
import { HeaderPage } from "../Header";
import { ModalBasic } from "../../../components/modals/ModalBasic";
import { ConfirmBasic } from "../../../components/modals/ConfirmBasic";

export const AreasTable = () => {
  const { loading, areas, getAreas, countAreas } = useArea();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);

  const [activePage, setActivePage] = useState(1);
  const limit = 10;
  const pages = Math.ceil(countAreas / limit);
  const skip = limit * activePage - limit;

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);

  const addArea = () => {
    setTitleModal("Nueva area de especialidad");
    setContentModal(
      <AddEditAreaForm closeModal={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateArea = (data) => {
    setTitleModal("Actualizar area de especialidad");
    setContentModal(
      <AddEditAreaForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        area={data}
      />
    );
    openCloseModal();
  };

  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar el area '${data?.name}'?`);
    setConfirmState(true);
  };

  useEffect(() => {
    getAreas(limit, skip);
  }, [activePage, refetch]);

  return (
    <div>
      <HeaderPage
        titlePage="Areas de especialidad"
        btnTitle="Nueva area"
        btnClick={addArea}
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
                <Table.HeaderCell>Activo</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {map(areas, (area, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{area?.name || "Sin informacion"}</Table.Cell>
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

const Actions = ({ area, updateArea, showConfirm }) => {
  return (
    <Table.Cell textAlign="center">
      <Button icon onClick={() => updateArea(area)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(area)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
