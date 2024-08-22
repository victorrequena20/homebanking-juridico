"use client";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputCalendar from "@/components/InputCalendar";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import React from "react";
import { createCashier } from "@/services/Core.service";
import { toast } from "sonner";
import { dateFormat } from "@/constants/global";
import { getOffices } from "@/services/Office.service";
import { useRouter } from "next/navigation";

interface IForm {
  name: string;
  officeId: any;
  description?: string;
  startDate: string;
  endDate?: string;
  status: any;
}

const schema = yup.object().shape({
  name: yup.string().required("El nombre del cajero es obligatorio"),
  officeId: yup.mixed().required("La oficina es obligatoria"),
  description: yup.string(),
  startDate: yup.string().required("La fecha de inicio es obligatoria"),
  endDate: yup.string(),
  status: yup.mixed().required("El estado es obligatorio"),
});

export default function CashierForm() {
  const [offices, setOffices] = React.useState<any | null>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const handleGetOffices = async () => {
    const response = await getOffices();
    console.log("🚀 ~ response:", response);
    if (response?.status === 200) {
      setOffices(response?.data);
    }
  };

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await createCashier({
      ...data,
      ...dateFormat,
      officeId: data.officeId.value,
      status: data.status.value,
    });
    if (response?.status === 200) {
      toast.success("Cajero creado correctamente");
      router.push("/administracion/organizacion/gestion-ventanillas-cajeros");
    } else {
      toast.error("Ocurrió un error al crear el cajero");
    }
    setIsLoading(false);
    console.log(data);
  };

  React.useEffect(() => {
    handleGetOffices();
  }, []);

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        columnGap: 3,
        maxWidth: "1000px",
        backgroundColor: "#fff",
        rowGap: 3,
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      <Grid item>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nombre del cajero *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.name?.message}
              isValidField={!errors.name}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="officeId"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Oficina *"
              options={keyValueAdapter(offices, "name", "id")}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.officeId?.message}
              isValidField={!errors.officeId}
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
              label="Descripción"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.description?.message}
              isValidField={!errors.description}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Fecha de inicio *"
              value={value}
              onChange={onChange}
              hint={errors.startDate?.message}
              isValidField={!errors.startDate}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="endDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Fecha final"
              value={value}
              onChange={onChange}
              hint={errors.endDate?.message}
              isValidField={!errors.endDate}
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
              options={keyValueAdapter(
                [
                  { label: "Activo", value: 300 },
                  { label: "Inactivo", value: 200 },
                ],
                "label",
                "value"
              )}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.status?.message}
              isValidField={!errors.status}
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
  );
}
