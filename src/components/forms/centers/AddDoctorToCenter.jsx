import React, { useState } from "react";
import { Button, Form, Header, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { useUser } from "../../../hooks/useUser";
import { useCenter } from "../../../hooks/useCenter";

export const AddDoctorToCenter = ({ closeModal, onRefetch, center }) => {
  const { getUserByDNI, userByDni } = useUser();
  const { updateCenter } = useCenter();
  const [dni, setDni] = useState("");
  const doctors = center?.doctors?.map((doctor) => doctor._id);
  const addDoctor = async () => {
    doctors.push(userByDni._id);
    await updateCenter(center?._id, { doctors: doctors });
    onRefetch();
    closeModal();
  };
  return (
    <>
      <Form>
        <Header as="h5">Buscar por DNI: </Header>
        <Form.Input
          name="dni"
          placeholder="DNI del medico"
          autoComplete="off"
          style={{ marginBottom: 2 }}
          onChange={(e) => setDni(e.target.value)}
        />
        <Button onClick={() => getUserByDNI(dni)}>Buscar</Button>
      </Form>
      {userByDni && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Image
            src={
              userByDni?.image
                ? userByDni?.image
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            size="tiny"
            circular
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Label size="big">
              Nombre: {userByDni?.first_name} {userByDni?.last_name}
            </Label>
            <Label size="big">
              Edad: {moment().diff(userByDni?.birthdate, "years") || "(N/A)"}
            </Label>
            <Label size="big">
              Verificado como medico: {userByDni?.is_verified ? "Si" : "No"}
            </Label>
            <Label size="big">Especialidades:</Label>
            <div>
              {userByDni?.areas?.map((area) => {
                return (
                  <Label size="large" color="blue">
                    {area.name}
                  </Label>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        {!userByDni ? null : doctors.includes(userByDni?._id) ? (
          <Button disabled>Ya esta registrado en el centro</Button>
        ) : (
          <Button onClick={() => addDoctor()}>Agregar al centro</Button>
        )}
      </div>
    </>
  );
};
