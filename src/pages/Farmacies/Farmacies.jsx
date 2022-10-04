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
} from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { usePharmacy } from "../../hooks/usePharmacy";
import { PharmaciesList } from "./PharmaciesList";
import "./Pharmacies.scss";
import { PharmaciesMap } from "./PharmaciesMap";
import { useMedicine } from "../../hooks/useMedicine";
import { ModalBasic } from "../../components/modals/ModalBasic";

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
        <div className="layout_menu_pharmacy">
          <Form>
            <Header as="h3">
              Consulte farmacias segun 1 o mas medicamentos
            </Header>
            <div className="form_filter">
              <Dropdown
                placeholder="Medicamentos"
                multiple
                selection
                search
                options={formatMedicines(medicines)}
                onChange={setMedicinesListOnChange}
              />
              <Button onClick={handleSearchPharmaciesByMedicines}>
                Consultar
              </Button>
            </div>
          </Form>
          <Menu tabular>
            <Menu.Item
              name="Lista"
              active={modeList}
              onClick={handleChangeMode}
            />
            <Menu.Item
              name="Mapa"
              active={!modeList}
              onClick={handleChangeMode}
            />
          </Menu>
        </div>
        {loading ? (
          <Loader active inline="centered">
            Cargando..
          </Loader>
        ) : modeList ? (
          <PharmaciesList
            pharmacies={pharmacies}
            showLocationPharmacy={showLocationPharmacy}
          />
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
