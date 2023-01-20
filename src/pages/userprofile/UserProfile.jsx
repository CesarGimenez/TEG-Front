import React, { useState } from "react";
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  Label,
  Message,
  Table,
} from "semantic-ui-react";
import moment from "moment";
import { map } from "lodash";
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
  const { loading, userDetail, family, getUser, getUserFamily } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getUser(user?._id);
    getUserFamily(user?._id);
  }, [refetch]);

  const onRefetch = () => setRefetch((prev) => !prev);

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

  const openFamiliariesModal = (user) => {
    setTitleModal(user ? "Editar familiar" : "Agregar familiar");
    setContentModal(
      <AddEditFamily
        user={user}
        onRefetch={onRefetch}
        openCloseModal={openCloseModal}
      />
    );

    openCloseModal();
  };

  return (
    <div>
      <Card fluid centered>
        {userDetail &&
          (!userDetail?.secret_word || userDetail?.secret_word == "") && (
            <Message warning>
              <Message.Header>
                Aún tienes que completar tu perfil!{" "}
              </Message.Header>
              <p>
                Te invitamos a que completes los datos de tu perfil, para que tu
                historia médica sea accesible a especialistas: actualiza tu PIN
                de historia (Editar perfil).
              </p>
            </Message>
          )}
        {userDetail && (!userDetail?.image || userDetail?.image == "") && (
          <Message warning>
            <Message.Header>Coloca una foto de perfil! </Message.Header>
            <p>
              Puedes subir una foto para que seas reconocible ante otros
              usuarios (Editar perfil).
            </p>
          </Message>
        )}
        <div className="user_header">
          <Header as="h1" color="blue">
            Hola de nuevo,{" "}
            {userDetail?.is_doctor &&
              (userDetail.gender === "M" ? "Dr." : "Dra.")}{" "}
            {userDetail?.first_name} {userDetail?.last_name}
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
                Editar perfil Médico{" "}
              </Button>
            )}
          </div>
        </div>
        <div className="user_home">
          <Image
            src={
              userDetail?.image ||
              "https://res.cloudinary.com/dl57f2zr5/image/upload/v1674012358/LOGO_MEDICPASS-06_yhzacg.png"
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
              <Header as="h3">Número de teléfono:</Header>
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
              <Header as="h3">Dirección de residencia:</Header>
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
        <div className="parents_registered">
          {family?.length > 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Header as="h1" color="blue">
                    Familiares registrados
                  </Header>
                  <Label>
                    Acá se muestran los familiares los cuales no pueden manejar
                    el sistema: Menores de edad, Tercera Edad avanzada, persona
                    discapacitada
                  </Label>
                </div>
                <Button
                  className="btn__profile"
                  onClick={() => openFamiliariesModal()}
                >
                  {" "}
                  Agregar nuevos familiares
                </Button>
              </div>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>DNI</Table.HeaderCell>
                    <Table.HeaderCell>Edad</Table.HeaderCell>
                    <Table.HeaderCell>Género</Table.HeaderCell>
                    <Table.HeaderCell>Correo de ingreso</Table.HeaderCell>
                    <Table.HeaderCell>Información</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {map(family, (f, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        {f?.first_name} {f?.last_name}
                      </Table.Cell>
                      <Table.Cell>{f?.dni || "Sin Información"}</Table.Cell>
                      <Table.Cell>
                        {moment().diff(f?.birthdate, "years") || "(N/A)"}
                      </Table.Cell>
                      <Table.Cell>
                        {f?.gender === "M" ? "Masculino" : "Femenino"}
                      </Table.Cell>
                      <Table.Cell>{f?.email}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Button
                          icon
                          negative
                          onClick={() => openFamiliariesModal(f)}
                        >
                          <Icon name="pencil" /> Editar
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>
          ) : (
            <>
              <Button
                onClick={() => openFamiliariesModal()}
                className="btn__profile"
              >
                {" "}
                Agregar un familiar
              </Button>
              <Label>
                Acá se mostrarán los familiares los cuales no puedan manejar el
                sistema: Menores de edad, Tercera Edad avanzada, persona
                discapacitada.
              </Label>
            </>
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
