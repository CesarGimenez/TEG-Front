import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  Header,
  Loader,
} from "semantic-ui-react";
import { useArea } from "../../hooks/useArea";
import { useUser } from "../../hooks/useUser";
import { DoctorsList } from "./DoctorsList";
import { ReactComponent as AttentionSVG } from "../../assets/doctor_attention.svg";

import "./Doctors.scss";
import { ModalBasic } from "../../components/modals/ModalBasic";
import { InfoContact } from "./InfoContact";

export const Doctors = () => {
  const { areas, getAreas } = useArea();
  const { users, loading, getUsersDoctors, getUsersByArea } = useUser();
  const [checkVerified, setCheckVerified] = useState();
  const [searchDoctors, setSearchDoctors] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(false);

  useEffect(() => {
    getAreas();
    getUsersDoctors();
  }, []);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showInfoContact = (doc) => {
    setTitleModal("Informacion de atencion medica");
    setContentModal(<InfoContact doc={doc} onClose={openCloseModal} />);

    openCloseModal();
  };

  const setAreasListOnChange = (e, { value }) => {
    setSearchDoctors({ value });
  };

  const handleSearchUsersByAreas = async () => {
    try {
      const { value } = searchDoctors;
      const data = { areas: value };
      await getUsersByArea(data);
    } catch (error) {
      throw error;
    }
  };

  const formatAreas = (areas) => {
    return areas?.map((item) => {
      return {
        key: item._id,
        text: item?.name,
        value: item?._id,
      };
    });
  };

  const filterVerifiedDoctors = (users) => {
    if (checkVerified) {
      return users?.filter((user) => user?.is_verified);
    }
    return users;
  };
  return (
    <div>
      <Card fluid centered>
        <Header as="h1">Atencion medica de especialistas</Header>
        <AttentionSVG className="svg_component animate__animated animate__fadeInRight" />
        <div className="layout_menu_pharmacy">
          <Form>
            <Header as="h3">Consulte los especialistas en su area</Header>
            <div className="form_filter">
              <Dropdown
                placeholder="Area de especialidad"
                multiple
                selection
                search
                options={formatAreas(areas)}
                onChange={setAreasListOnChange}
              />
              <Button
                className="btn__search__doctors"
                onClick={handleSearchUsersByAreas}
              >
                Consultar
              </Button>
              <div style={{ marginLeft: 10, color: "blue" }}>
                <Checkbox
                  label="Solo especialistas verificados"
                  onChange={(e, { checked }) => setCheckVerified(checked)}
                />
              </div>
            </div>
          </Form>
        </div>
        {loading ? (
          <Loader active inline="centered">
            Cargando..
          </Loader>
        ) : (
          <DoctorsList
            doctors={filterVerifiedDoctors(users)}
            showInfoContact={showInfoContact}
          />
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
