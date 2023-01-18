import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { useMedicine } from "../../../hooks/useMedicine";
import { usePharmacy } from "../../../hooks/usePharmacy";

export const AddMedicineToPharmacy = ({ onClose, onRefetch, pharma }) => {
  const { loading, getMedicines, medicines } = useMedicine();
  const { updatePharmacy } = usePharmacy();
  const [pharmaMedicines, setPharmaMedicines] = useState(
    pharma?.medicines?.map((m) => m._id)
  );
  // const filterMedicines = medicines?.filter(
  //   (med) => !pharmaMedicines?.includes(med._id)
  // );
  useEffect(() => {
    getMedicines();
  }, []);

  const formatMedicines = (medicines) => {
    return medicines?.map((med) => {
      return {
        key: med._id,
        text: `${med.name} - ${med.way}`,
        value: med._id,
      };
    });
  };

  const addMedicinesToPharmacy = async () => {
    await updatePharmacy(pharma._id, { medicines: pharmaMedicines });
    toast.success("Medicamento(s) agregado(s) con exito");
    onRefetch();
    onClose();
  };

  return (
    <div style={{ maxHeight: 800 }}>
      <Form>
        <Dropdown
          options={formatMedicines(medicines)}
          fluid
          selection
          search
          multiple
          value={pharmaMedicines}
          onChange={(e, { value }) => setPharmaMedicines(value)}
        />
        {pharmaMedicines && (
          <Button onClick={() => addMedicinesToPharmacy()}>
            Agregar medicamentos
          </Button>
        )}
      </Form>
    </div>
  );
};
