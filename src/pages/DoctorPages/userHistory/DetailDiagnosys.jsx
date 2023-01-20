import React from "react";
import { Header, Image, Label, Segment } from "semantic-ui-react";
import moment from "moment";

export const DetailDiagnosys = ({ diagnosys }) => {
  return (
    <div style={{ maxHeight: 800, overflowY: "auto" }}>
      <Segment>
        <Header as="h4">Paciente:</Header>
        <span>
          {diagnosys?.patient?.first_name} {diagnosys?.patient?.last_name} (
          {moment().diff(diagnosys?.patient?.birthdate, "years")}){" "}
          {diagnosys?.patient?.gender === "M" ? "Masculino" : "Femenino"}
        </span>
        <p>Documento: {diagnosys?.patient?.dni}</p>
      </Segment>
      <Segment>
        <Header as="h4">Fecha y hora de creación:</Header>
        <span>{moment(diagnosys?.createdAt).format("DD/MM/yyyy hh:mm")}</span>
      </Segment>
      <Segment>
        <Header as="h4">Motivo de consulta:</Header>
        <span>{diagnosys?.reason || "Sin detalles"}</span>
      </Segment>
      <Segment>
        <Header as="h4">Descripción general:</Header>
        <span>{diagnosys?.description}</span>
      </Segment>
      <Segment>
        <Header as="h4">Síntomas presentados:</Header>
        <span>{diagnosys?.symptoms}</span>
      </Segment>
      <Segment>
        <Header as="h4">Examen Fisico:</Header>
        <span>{diagnosys?.physical_exam || "Sin detalles"}</span>
      </Segment>
      <Segment>
        <Header as="h4">Recomendación Médica:</Header>
        <span>{diagnosys?.medic_recomendation}</span>
      </Segment>
      <Segment>
        <Header as="h4">Recomendación Farmacéutica:</Header>
        <span>{diagnosys?.pharmaceutic_recomendation}</span>
      </Segment>
      <Segment>
        <Header as="h4">Tratamiento recomendado:</Header>
        <span>{diagnosys?.treatment}</span>
      </Segment>
      <Segment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            src={diagnosys?.doctor?.doctor_signature || null}
            size="large"
          />
          ___________________________________________________
          <Header as="h4">Firma del especialista médico</Header>
          <Label>
            {diagnosys?.doctor?.gender === "M" ? "Dr. " : "Dra. "}
            {diagnosys?.doctor?.first_name} {diagnosys?.doctor?.last_name} C.I:{" "}
            {diagnosys?.doctor?.dni}
          </Label>
          <Label>M.P.P.S: {diagnosys?.doctor?.mpps_id || ""}</Label>
          <Label>
            Código de colegio de Médicos:{" "}
            {diagnosys?.doctor?.college_medic_id || ""}
          </Label>
          <Label>Teléfono: {diagnosys?.doctor?.phone}</Label>
          <Label>Correo: {diagnosys?.doctor?.email}</Label>
        </div>
      </Segment>
    </div>
  );
};
