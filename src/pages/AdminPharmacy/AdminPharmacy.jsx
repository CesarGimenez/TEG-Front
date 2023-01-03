import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Header,
  Icon,
  Label,
  Loader,
  Table,
} from "semantic-ui-react";
import { map } from "lodash";
import { ModalBasic } from "../../components/modals/ModalBasic";
import { useAuth } from "../../hooks/useAuth";
import { usePharmacy } from "../../hooks/usePharmacy";
import { HeaderPage } from "../AdminDashboard/Header";
import { AddEditPharmacyForm } from "../../components/forms/pharmacies/AddEditPharmacyForm";
import { AddMedicineToPharmacy } from "../../components/forms/pharmacies/AddMedicineToPharmacy";
import { toast } from "react-toastify";

export const AdminPharmacy = () => {
  const { auth } = useAuth();
  const { loading, currentPharmacy, getOnePharmacy, updatePharmacy } =
    usePharmacy();
  const pharma = auth.user.pharmacyadmin;

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch(!refetch);
  const addMedicine = (pharma) => {
    setTitleModal("Agregar medicamento");
    setContentModal(
      <AddMedicineToPharmacy
        onClose={openCloseModal}
        onRefetch={onRefetch}
        pharma={currentPharmacy}
      />
    );
    openCloseModal();
  };

  const removeMedicine = async (medicine) => {
    const medicines = currentPharmacy?.medicines?.map((med) => med._id);
    const newArrayMedicines = medicines.filter((med) => med != medicine._id);
    await updatePharmacy(currentPharmacy?._id, {
      medicines: newArrayMedicines,
    });
    toast.success("Medicamento inhabilitado con exito");
    onRefetch();
  };

  const updatePharmaInfo = (data) => {
    setTitleModal("Actualizar Farmacia");
    setContentModal(
      <AddEditPharmacyForm
        closeModal={openCloseModal}
        onRefetch={onRefetch}
        pharma={data}
      />
    );
    openCloseModal();
  };

  useEffect(() => {
    getOnePharmacy(pharma?._id);
  }, [refetch]);

  return (
    <div>
      <Card fluid centered>
        {loading ? (
          <Loader active inline="centered">
            Cargando...
          </Loader>
        ) : (
          <>
            <HeaderPage
              titlePage={`Informacion de Farmacia: ${currentPharmacy?.name}`}
              btnTitle="Editar informacion"
              btnClick={() => updatePharmaInfo(currentPharmacy)}
            />{" "}
            <Label size="big">Nombre: {currentPharmacy?.name}</Label>
            <Label size="big">Direccion: {currentPharmacy?.address}</Label>
            <Label size="big">Telefono: {currentPharmacy?.phones}</Label>
            {/* <Label size="big">
          Accesibilidad: {currentCenter?.is_public ? "Publica" : "Privada"}
        </Label> */}
            <Button
              onClick={() => addMedicine(currentPharmacy)}
              style={{ width: 300 }}
            >
              Agregar Medicamento
            </Button>
            {currentPharmacy?.medicines?.length > 0 ? (
              <Header as={"h3"}>
                Medicamentos disponibles (Se recomienda mantener actualizado el
                listado)
              </Header>
            ) : (
              <Header as={"h3"}>Aun no existen medicamentos registrados</Header>
            )}
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Descripcion</Table.HeaderCell>
                  <Table.HeaderCell>Via</Table.HeaderCell>
                  <Table.HeaderCell>Alto costo</Table.HeaderCell>
                  <Table.HeaderCell>En activo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="right">
                    Acciones
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {map(currentPharmacy?.medicines, (med, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{med?.name}</Table.Cell>
                    <Table.Cell>{med?.description}</Table.Cell>
                    <Table.Cell>{med?.way}</Table.Cell>
                    <Table.Cell>
                      {med?.high_price ? (
                        <Icon name="check" />
                      ) : (
                        <Icon name="close" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {med?.active ? (
                        <Icon name="check" />
                      ) : (
                        <Icon name="close" />
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Button icon negative onClick={() => removeMedicine(med)}>
                        <Icon name="trash" /> Inhabilitar
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        )}
      </Card>
      <ModalBasic
        show={showModal}
        title={titleModal}
        onClose={openCloseModal}
        content={contentModal}
      />
    </div>
  );
};
