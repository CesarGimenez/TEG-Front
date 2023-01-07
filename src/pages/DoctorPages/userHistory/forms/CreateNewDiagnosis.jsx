import React, { useEffect } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  TextArea,
} from "semantic-ui-react";
import { useAuth } from "../../../../hooks/useAuth";
import { useCenter } from "../../../../hooks/useCenter";

export const CreateNewDiagnosis = () => {
  const { loading, centers, getCentersByDoctor } = useCenter();
  const { auth } = useAuth();
  const { user } = auth;
  useEffect(() => {
    getCentersByDoctor(user._id);
  }, []);

  const formatCenters = (centers) => {
    return centers?.map((c) => {
      return {
        key: c._id,
        text: `${c.name} - ${c.address}`,
        value: c._id,
      };
    });
  };

  const DiagnosysType = [
    { key: "Clínico", text: "Clínico", value: "Clínico" },
    { key: "Certeza", text: "Certeza", value: "Certeza" },
    { key: "Diferencial", text: "Diferencial", value: "Diferencial" },
    { key: "Etiológico", text: "Etiológico", value: "Etiológico" },
    { key: "Genérico", text: "Genérico", value: "Genérico" },
    { key: "Anatómico", text: "Anatómico", value: "Anatómico" },
    { key: "Preliminar", text: "Preliminar", value: "Preliminar" },
    { key: "Sintomático", text: "Sintomático", value: "Sintomático" },
    { key: "Otro", text: "Otro", value: "Otro" },
  ];
  return (
    <div>
      <Form>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Descripcion general</Label>
              <TextArea
                placeholder="Descripcion general"
                style={{ minHeight: 100 }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Tipo de diagnostico</Label>
              <Dropdown
                Label="Tipo de diagnostico"
                selection
                search
                fluid
                options={DiagnosysType}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Lugar</Label>
              <Dropdown
                selection
                search
                fluid
                options={formatCenters(centers)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Sintomas</Label>
              <TextArea placeholder="Sintomas" style={{ minHeight: 100 }} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Recomendacion medica</Label>
              <TextArea
                placeholder="Recomendacion medica"
                style={{ minHeight: 100 }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Recomendacion farmaceutica</Label>
              <TextArea
                placeholder="Recomendacion farmaceutica"
                style={{ minHeight: 100 }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label size="large">Tratamiento a seguir</Label>
              <TextArea placeholder="Tratamiento" style={{ minHeight: 100 }} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column centered>
              <Button>Guardar</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
};
