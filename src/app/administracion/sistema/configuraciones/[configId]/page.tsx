"use client";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputCalendar from "@/components/InputCalendar";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonBack from "@/components/ButtonBack";
import React from "react";
import { getConfigurationByid, updateConfigurations } from "@/services/Core.service";
import { toast } from "sonner";

interface IForm {
  value?: string;
  stringValue?: string;
  dateValue?: string;
}

const schema = yup.object().shape({
  value: yup.string(),
  stringValue: yup.string(),
  dateValue: yup.string(),
});

export default function EditConfiguration({ params }: { params: { configId: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [configData, setConfigData] = React.useState<any | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function handleGetConfigById() {
    const response = await getConfigurationByid({}, params?.configId);
    if (response?.status === 200) {
      setConfigData(response?.data);
    }
  }

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await updateConfigurations(data, params?.configId);
    if (response?.status === 200) {
      toast.success("Configuración actualizada correctamente");
    } else {
      toast.error("Error al actualizar la configuración");
    }
    setIsLoading(false);
    console.log(data);
  };

  React.useEffect(() => {
    handleGetConfigById();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Configuraciones"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Configuraciones", href: "/administracion/sistema/configuraciones" },
          { title: "Editar configuración" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Grid
        container
        rowSpacing={3}
        maxWidth={"860px"}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          gap: 3,
          maxWidth: "1000px",
          backgroundColor: "#fff",
          px: 3,
          py: 6,
          borderRadius: "16px",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          mx: "auto",
        }}
      >
        <Grid item>
          <Input
            label="Nombre de la configuración"
            type="text"
            onChange={() => {}}
            value={configData?.name}
            defaultValue={configData?.name}
          />
        </Grid>
        <Grid item>
          <Input label="Descripción" type="text" onChange={() => {}} />
        </Grid>

        <Grid item>
          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Valor numérico"
                type="number"
                value={value}
                onChange={onChange}
                hint={errors.value?.message}
                isValidField={!errors.value}
                defaultValue={configData?.value}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            control={control}
            name="stringValue"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Valor de cadena"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.stringValue?.message}
                isValidField={!errors.stringValue}
                defaultValue={configData?.stringValue}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            control={control}
            name="dateValue"
            render={({ field: { onChange, value } }) => (
              <InputCalendar
                label="Valor de fecha"
                value={value}
                onChange={onChange}
                hint={errors.dateValue?.message}
                isValidField={!errors.dateValue}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button text="Cancelar" variant="navigation" type="button" />
            <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
