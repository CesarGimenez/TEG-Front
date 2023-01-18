import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { useCenter } from "../../../hooks/useCenter";
import { useUser } from "../../../hooks/useUser";

export const AddDoctorToCenterAdmin = ({ onClose, onRefetch, center }) => {
  const { getUsersDoctors, users } = useUser();
  const { updateCenter } = useCenter();
  const [centerDoctors, setCenterDoctors] = useState(
    center?.doctors?.map((d) => d?._id)
  );

  const formatDoctoes = (doctors) => {
    return doctors?.map((dr) => {
      return {
        key: dr._id,
        text: `${dr?.first_name} ${dr?.last_name}`,
        value: dr._id,
      };
    });
  };

  const addDoctorsToCenter = async () => {
    await updateCenter(center?._id, { doctors: centerDoctors });
    toast.success("Doctor(es) editado(s) con exito");
    onRefetch();
    onClose();
  };

  useEffect(() => {
    getUsersDoctors();
  }, []);

  return (
    <div style={{ maxHeight: 800 }}>
      <Form>
        <Dropdown
          options={formatDoctoes(users)}
          fluid
          selection
          search
          multiple
          value={centerDoctors}
          onChange={(e, { value }) => setCenterDoctors(value)}
        />
        {centerDoctors && (
          <Button onClick={() => addDoctorsToCenter()}>
            Agregar especialistas
          </Button>
        )}
      </Form>
    </div>
  );
};
