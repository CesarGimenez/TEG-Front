import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Header,
  Label,
  Loader,
  Menu,
} from "semantic-ui-react";
import { usePharmacy } from "../../hooks/usePharmacy";
import { PharmaciesList } from "./PharmaciesList";
import "./Pharmacies.scss";
import { PharmaciesMap } from "./PharmaciesMap";

const options = [
  {
    key: "clonazepam",
    text: "clonazepam",
    value: "clonazepam",
  },
  { key: "Acetaminofen", text: "Acetaminofen", value: "Acetaminofen" },
  { key: "Ibuprofeno", text: "Ibuprofeno", value: "Ibuprofeno" },
  { key: "Azitromicina", text: "Azitromicina", value: "Azitromicina" },
];

export const Farmacies = () => {
  const { loading, pharmacies, getPharmacies } = usePharmacy();
  const [modeList, setModeList] = useState(true);

  useEffect(() => {
    getPharmacies();
  }, []);

  const handleChangeMode = () => {
    setModeList((prev) => !prev);
  };
  return (
    <Card fluid centered>
      <Header as="h1">Farmacias</Header>
      <div className="layout_menu_pharmacy">
        <Form>
          <Header as="h3">Consulte farmacias segun 1 o mas medicamentos</Header>
          <Dropdown
            placeholder="Skills"
            multiple
            selection
            search
            options={options}
          />
          <Button className="btn">Consultar</Button>
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
        <PharmaciesList pharmacies={pharmacies} />
      ) : (
        <PharmaciesMap pharmacies={pharmacies} />
      )}
    </Card>
  );
};
