import RenderFormModal from "@/components/Modals/RenderFormModal";
import { Stack, Grid } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NotFoundData from "@/components/NotFoundData";
import { getIdentifierTemplate } from "@/services/Clients.service";
import { useParams } from "next/navigation";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";

interface IForm {
  documentTypeId: any;
  status: any;
  documentKey: string;
  description: string;
}

const schema = yup.object().shape({
  documentTypeId: yup.mixed().required("El tipo de documento es obligatorio"),
  status: yup.mixed().required("El estado es obligatorio"),
  documentKey: yup.string().required("La clave de documento es obligatoria"),
  description: yup.string().required("La descripción es obligatoria"),
});

export default function ClientIdentifications() {
  const [identifierTemplate, setIdentifierTemplate] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function handleGetIdentifierTemplate() {
    const response = await getIdentifierTemplate(params?.clientId);
    console.log("🚀 ~ handleGetIdentifierTemplate ~ response:", response);
    if (response?.status === 200) {
      setIdentifierTemplate(response.data);
    }
  }

  const onSubmit = (data: IForm) => {
    console.log("Formulario enviado:", data);
    setOpen(false);
  };

  React.useEffect(() => {
    handleGetIdentifierTemplate();
  }, []);

  return (
    <>
      <Stack>
        <NotFoundData
          title="No hay identificaciones registradas"
          withOutBack
          action={{
            title: "Agregar identificación",
            onClick: () => setOpen(true),
          }}
        />
      </Stack>

      <RenderFormModal title="Agregar identificación" isOpen={open} setIsOpen={setOpen} sx={{ maxWidth: "400px" }}>
        <Grid
          container
          sx={{
            gap: 3,
            maxWidth: "400px",
            backgroundColor: "#fff",
            px: 3,
            py: 1,
            borderRadius: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item>
            <Controller
              control={control}
              name="documentTypeId"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de documento *"
                  options={keyValueAdapter(identifierTemplate?.allowedDocumentTypes, "name", "id")} // Aquí deberías agregar las opciones disponibles
                  setItem={onChange}
                  value={value}
                  hint={errors.documentTypeId?.message}
                  isValidField={!errors.documentTypeId}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Estado *"
                  options={[
                    {
                      label: "Activo",
                      value: "Active",
                    },
                    {
                      label: "Inactivo",
                      value: "Inactive",
                    },
                  ]}
                  setItem={onChange}
                  value={value}
                  hint={errors.status?.message}
                  isValidField={!errors.status}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="documentKey"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Clave de documento *"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.documentKey?.message}
                  isValidField={!errors.documentKey}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Descripción *"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.description?.message}
                  isValidField={!errors.description}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="center" sx={{ gap: 3 }}>
              <Button text="Cancelar" variant="navigation" onClick={() => setOpen(false)} />
              <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} />
            </Stack>
          </Grid>
        </Grid>
      </RenderFormModal>
    </>
  );
}
