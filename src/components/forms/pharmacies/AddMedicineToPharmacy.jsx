import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { useMedicine } from "../../../hooks/useMedicine";
import { usePharmacy } from "../../../hooks/usePharmacy";

export const AddMedicineToPharmacy = ({ onClose, onRefetch, pharma }) => {
  const { loading, getMedicines, medicines } = useMedicine();
  const { updatePharmacy } = usePharmacy();
  const [newMedicines, setNewMedicines] = useState(null);
  const pharmaMedicines = pharma?.medicines?.map((med) => med?._id);
  const filterMedicines = medicines?.filter(
    (med) => !pharmaMedicines?.includes(med._id)
  );
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
    pharmaMedicines.push(...newMedicines);
    await updatePharmacy(pharma._id, { medicines: pharmaMedicines });
    toast.success("Medicamento(s) agregado(s) con exito");
    onRefetch();
    onClose();
  };

  return (
    <div>
      <Form>
        <Dropdown
          options={formatMedicines(filterMedicines)}
          fluid
          selection
          search
          multiple
          onChange={(e, { value }) => setNewMedicines(value)}
        />
        {newMedicines && (
          <Button onClick={() => addMedicinesToPharmacy()}>
            Agregar medicamentos
          </Button>
        )}
      </Form>
    </div>
  );
};
