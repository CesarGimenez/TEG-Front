import React, { useState } from "react";
import { Button, Card, Header, Image } from "semantic-ui-react";
import moment from "moment";
import { ModalBasic } from "../../components/modals/ModalBasic";
import { useAuth } from "../../hooks/useAuth";
import { AddEditFamily } from "./AddEditFamily";
import { EditUserProfile } from "./EditUserProfile";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";

import "./UserProfile.scss";
import { EditMedicProfileUser } from "./EditMedicProfileUser";
import { EditUserPassword } from "./EditUserPassword";

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

  const openUserMedicModal = (user) => {
    setTitleModal(`Tu perfil Medico`);
    setContentModal(
      <EditMedicProfileUser
        user={user}
        onRefetch={onRefetch}
        openCloseModal={openCloseModal}
      />
    );

    openCloseModal();
  };

  const openChangePassword = (user) => {
    setTitleModal(`Cambio de contrase;a`);
    setContentModal(
      <EditUserPassword
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => openUserModal(userDetail)}
              className="btn__profile"
            >
              {" "}
              Editar perfil{" "}
            </Button>
            <Button
              className="btn__profile"
              onClick={() => openChangePassword(userDetail)}
            >
              {" "}
              Cambiar contraseña
            </Button>
            {(auth?.user?.role_id?.name === "Medico" ||
              auth?.user?.is_doctor) && (
              <Button
                className="btn__profile"
                onClick={() => openUserMedicModal(userDetail)}
              >
                {" "}
                Editar perfil Medico
              </Button>
            )}
          </div>
        </div>
        <div className="user_home">
          <Image
            src={
              userDetail?.image ||
              "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            size="medium"
            circular
          />
          <div className="user_home__info">
            <div className="user_home__info__label">
              <Header as="h3">Nombre completo: </Header>
              <p>
                {userDetail?.first_name} {userDetail?.last_name}
              </p>
            </div>
            <div className="user_home__info__label">
              <Header as="h3">DNI:</Header>
              <p> {userDetail?.dni || "Sin informacion"}</p>
            </div>
            <div className="user_home__info__label">
              <Header as="h3">Correo:</Header>
              <p> {userDetail?.email}</p>
            </div>
            <div className="user_home__info__label">
              <Header as="h3">Numero de telefono:</Header>
              <p> {userDetail?.phone}</p>
            </div>
            <div className="user_home__info__label">
              <Header as="h3">Contacto de emergencia:</Header>
              <p> {userDetail?.parent_phone}</p>
            </div>
          </div>
          <div className="user_home__info">
            <div className="user_home__info__label">
              <Header as="h3">Tipo de sangre: </Header>
              <p>{userDetail?.blood_group || "Sin informacion"}</p>
            </div>
            <div className="user_home__info__label">
              <Header as="h3">Genero: </Header>
              <p>
                {userDetail?.gender == "M"
                  ? "Masculino"
                  : "Femenino" || "Sin informacion"}
              </p>
            </div>
            <div className="user_home__info__label">
              <Header as="h3">Direccion de residencia:</Header>
              <p> {userDetail?.address || "Sin informacion"}</p>
            </div>
            <div className="user_home__info__label">
              <Header as="h3">Fecha de nacimiento: </Header>
              <p>
                {moment(userDetail?.birthdate).format("DD/MM/yyyy") ||
                  "Sin informacion"}{" "}
                ({moment().diff(userDetail?.birthdate, "years") || "(N/A)"})
              </p>
            </div>
          </div>
        </div>
        {/* <div className="parents_registered">
          {userDetail?.family ? (
            <div>
              <Header as="h1" color="blue">
                Familiares registrados (ni;os y adultos mayores)
              </Header>
              <Button> Agregar nuevos familiares</Button>
            </div>
          ) : (
            <Button
              onClick={() => openFamiliariesModal()}
              className="btn__profile"
            >
              {" "}
              Agregar un familiar (Ni;o o adulto mayor)
            </Button>
          )}
        </div> */}
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
