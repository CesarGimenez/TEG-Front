import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Header,
  Icon,
  Label,
  Loader,
  Menu,
  Message,
} from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { usePharmacy } from "../../hooks/usePharmacy";
import { PharmaciesList } from "./PharmaciesList";
import "./Pharmacies.scss";
import { PharmaciesMap } from "./PharmaciesMap";
import { useMedicine } from "../../hooks/useMedicine";
import { ModalBasic } from "../../components/modals/ModalBasic";
import { ReactComponent as MedicineSVG } from "../../assets/medicine_medical.svg";

export const Farmacies = () => {
  const { loading, pharmacies, getPharmacies, getPharmaciesByMedicines } =
    usePharmacy();
  const { medicines, getMedicines } = useMedicine();
  const [modeList, setModeList] = useState(true);
  const [searchMedicines, setSearchMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    getPharmacies();
    getMedicines();
  }, []);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const handleChangeMode = () => {
    setModeList((prev) => !prev);
  };

  const setMedicinesListOnChange = (e, { value }) => {
    setSearchMedicines({ value });
  };

  const handleSearchPharmaciesByMedicines = async () => {
    try {
      const { value } = searchMedicines;
      const data = { medicines: value };
      const filterPharmacies = await getPharmaciesByMedicines(data);
    } catch (error) {
      throw error;
    }
  };

  const formatMedicines = (medicines) => {
    return medicines?.map((item) => {
      return {
        key: item._id,
        text: item?.name,
        value: item?._id,
      };
    });
  };

  const showLocationPharmacy = (data) => {
    const { location } = data;
    setTitleModal(`Ubicacion de '${data?.name}'`);
    setContentModal(
      <div className="map_container_modal">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAfwClphOoi7iVTBDmOmIqW47k3HfJ8AgU" }}
          defaultCenter={location}
          center={location}
          defaultZoom={15}
          margin={[50, 50, 50, 50]}
        >
          <div
            lat={location?.lat}
            lng={location?.lng}
            className="marker_container"
          >
            {/* <Label className="marker_label" color="blue">
              {data?.name}
            </Label> */}
            <Icon className="marker_icon" name="map marker alternate" />
          </div>
        </GoogleMapReact>
      </div>
    );

    openCloseModal();
  };
  return (
    <div>
      <Card fluid centered>
        <Header as="h1">Farmacias</Header>
        <MedicineSVG className="svg_component animate__animated animate__fadeInRight" />
        <div className="layout_menu_pharmacy">
          <Menu tabular className="menu_display_pharmacy">
            <Menu.Item
              name="Listado"
              active={modeList}
              onClick={handleChangeMode}
            />
            <Menu.Item
              name="Mapa"
              active={!modeList}
              onClick={handleChangeMode}
            />
          </Menu>
          <Form className="form_consultation">
            <div className="form_filter">
              <Dropdown
                placeholder="Medicamentos"
                multiple
                selection
                search
                options={formatMedicines(medicines)}
                onChange={setMedicinesListOnChange}
              />
              <Button
                onClick={handleSearchPharmaciesByMedicines}
                className="btn__search__pharmacy"
              >
                Consultar
              </Button>
            </div>
            <div style={{ maxWidth: 800 }}>
              <Message>
                <p>
                  Puedes realizar la consulta de uno o más medicamentos en las
                  distintas farmacias donde se encuentre disponible, puedes
                  seleccionar ver en lista o en un mapa.
                </p>
              </Message>
            </div>
          </Form>
        </div>
        {loading ? (
          <Loader active inline="centered">
            Cargando..
          </Loader>
        ) : modeList ? (
          <>
            <PharmaciesList
              pharmacies={pharmacies}
              showLocationPharmacy={showLocationPharmacy}
            />
          </>
        ) : (
          <PharmaciesMap pharmacies={pharmacies} />
        )}
      </Card>
      <ModalBasic
        show={showModal}
        title={titleModal}
        content={contentModal}
        onClose={openCloseModal}
      />
    </div>
  );
};
