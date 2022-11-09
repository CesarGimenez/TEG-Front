import React, { useState } from "react";
import { Button, Card, Header, Image } from "semantic-ui-react";
import moment from "moment";
import { ModalBasic } from "../../components/modals/ModalBasic";
import { useAuth } from "../../hooks/useAuth";
import { AddEditFamily } from "./AddEditFamily";
import { EditUserProfile } from "./EditUserProfile";
import { useEffect } from "react";
import { getToken } from "../../api/token";
import { getMeApi } from "../../api/auth";
import { useUser } from "../../hooks/useUser";

export const UserProfile = () => {
  const { auth } = useAuth();
  const { user } = auth;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const onRefetch = () => setRefetch((prev) => !prev);

  const { loading, userDetail, getUser } = useUser();

  const openCloseModal = () => setShowModal((prev) => !prev);

  const openUserModal = (user) => {
    setTitleModal(`Tu perfil`);
    setContentModal(
      <EditUserProfile
        user={user}
        onRefetch={onRefetch}
        openCloseModal={openCloseModal}
      />
    );

    openCloseModal();
  };

  const openFamiliariesModal = (data) => {
    setTitleModal(`Agregar familiar`);
    setContentModal(<AddEditFamily />);

    openCloseModal();
  };

  useEffect(() => {
    getUser(user?._id);
  }, [refetch]);

  return (
    <div>
      <Card fluid centered>
        <div className="user_header">
          <Header as="h1" color="blue">
            Hola de nuevo, {userDetail?.first_name} {userDetail?.last_name}
          </Header>
          <Button onClick={() => openUserModal(userDetail)}>
            {" "}
            Editar perfil{" "}
          </Button>
        </div>
        <div className="user_home">
          <Image
            src={
              user?.image
                ? userDetail?.image
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            size="medium"
            circular
          />
          <div className="user_home__info">
            <Header as="h3">
              Fecha de nacimiento:{" "}
              {moment(userDetail?.birthdate).format("DD/MM/yyyy")}
            </Header>
            <Header as="h3">Correo: {userDetail?.email}</Header>
            <Header as="h3">Numero de telefono: {userDetail?.phone}</Header>
            <Header as="h3">
              Contacto de emergencia: {userDetail?.parent_phone}
            </Header>
          </div>
        </div>
        <div className="parents_registered">
          {userDetail?.family ? (
            <div>
              <Header as="h1" color="blue">
                Familiares registrados (ni;os y adultos mayores)
              </Header>
              <Button> Agregar nuevos familiares</Button>
            </div>
          ) : (
            <Button onClick={() => openFamiliariesModal()}>
              {" "}
              Agregar un familiar (Ni;o o adulto mayor)
            </Button>
          )}
        </div>
      </Card>
      <ModalBasic
        show={showModal}
        title={titleModal}
        content={contentModal}
        onClose={openCloseModal}
        size={"medium"}
      />
    </div>
  );
};
