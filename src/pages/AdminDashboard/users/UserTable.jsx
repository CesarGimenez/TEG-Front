import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Icon,
  Loader,
  Pagination,
  Table,
} from "semantic-ui-react";
import { map } from "lodash";
import { useUser } from "../../../hooks/useUser";
import { ModalBasic } from "../../../components/modals/ModalBasic";
import { ConfirmBasic } from "../../../components/modals/ConfirmBasic";
import { AddEditUserForm } from "../../../components/forms/users/AddEditUserForm";
import { HeaderPage } from "../Header";
import { EditMedicProfileUser } from "../../../components/forms/users/EditMedicProfileUser";
import { EditCenterUser } from "../../../components/forms/users/EditCenterUser";
import { EditPharmacyUser } from "../../../components/forms/users/EditPharmacyUser";
import { toast } from "react-toastify";

export const UserTable = () => {
  const { loading, users, getUsers, countUsers, deleteUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const [titleConfirm, setTitleConfirm] = useState(null);
  const [userIdDelete, setUserIdDelete] = useState(null);

  const [activePage, setActivePage] = useState(1);
  const limit = 10;
  const pages = Math.ceil(countUsers / limit);
  const skip = limit * activePage - limit;

  console.log(countUsers);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);

  useEffect(() => {
    getUsers(limit, skip);
  }, [refetch, activePage]);

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(
      <AddEditUserForm closeModal={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Actualizar usuario");
    setContentModal(
      <AddEditUserForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };

  const updateMedicProfile = (data) => {
    setTitleModal("Actualizar perfil medico");
    setContentModal(
      <EditMedicProfileUser
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };

  const updatePharmacyProfile = (data) => {
    setTitleModal("Asignar Farmacia");
    setContentModal(
      <EditPharmacyUser
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );

    openCloseModal();
  };

  const updateCenterProfile = (data) => {
    setTitleModal("Asignar centro de salud");
    setContentModal(
      <EditCenterUser
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );

    openCloseModal();
  };

  const showConfirm = (data) => {
    setTitleConfirm(`Esta seguro de eliminar al usuario ${data?.email}?`);
    setUserIdDelete(data?._id);
    setConfirmState(true);
  };

  const onDeleteUser = async () => {
    const deleted = await deleteUser(userIdDelete);
    if (deleted) {
      toast.info("Usuario eliminado");
      setConfirmState(false);
      onRefetch();
    }
  };

  return (
    <div>
      <HeaderPage
        titlePage="Usuarios"
        btnTitle="Nuevo usuario"
        btnClick={addUser}
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
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Apellido</Table.HeaderCell>
                <Table.HeaderCell>DNI</Table.HeaderCell>
                <Table.HeaderCell>Activo</Table.HeaderCell>
                <Table.HeaderCell>SuperAdmin</Table.HeaderCell>
                <Table.HeaderCell>Medico Verificado</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {map(users, (user, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.first_name}</Table.Cell>
                  <Table.Cell>{user.last_name}</Table.Cell>
                  <Table.Cell>{user?.dni || "Sin informacion"}</Table.Cell>
                  <Table.Cell>
                    {user.active ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {user.is_Admin ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {user?.is_verified ? (
                      <Icon name="check" />
                    ) : (
                      <Icon name="close" />
                    )}
                  </Table.Cell>

                  <Actions
                    user={user}
                    updateUser={updateUser}
                    showConfirm={showConfirm}
                    updateMedicProfile={updateMedicProfile}
                    updateCenterProfile={updateCenterProfile}
                    updatePharmacyProfile={updatePharmacyProfile}
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
        onConfirm={() => onDeleteUser()}
        title={titleConfirm}
      />
    </div>
  );
};

const Actions = ({
  user,
  updateUser,
  showConfirm,
  updateMedicProfile,
  updateCenterProfile,
  updatePharmacyProfile,
}) => {
  return (
    <Table.Cell textAlign="right">
      <Button icon negative onClick={() => updatePharmacyProfile(user)}>
        <Icon name="pencil" />{" "}
        {user?.pharmacyadmin ? "Cambiar farmacia" : "Vincular Farmacia"}
      </Button>
      <Button icon negative onClick={() => updateCenterProfile(user)}>
        <Icon name="pencil" />{" "}
        {user?.centeradmin ? "Cambiar centro" : "Vincular centro"}
      </Button>
      {user.role_id?.name === "Medico" && (
        <Button icon negative onClick={() => updateMedicProfile(user)}>
          <Icon name="pencil" /> Verificacion Medica
        </Button>
      )}

      <Button icon onClick={() => updateUser(user)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => showConfirm(user)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
