"use client";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ICreateOfficeForm } from "./types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { createOffice, getOffices, updateOffice } from "@/services/Office.service";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputCalendar from "@/components/InputCalendar";
import { schema } from "./yup";
import { IKeyValue } from "@/types/common";
import { formatDateEsddMMMMyyyy } from "@/utilities/common.utility";
import { dateFormat } from "@/constants/global";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

export default function CreateOfficeForm({ officeData }: { officeData?: any }) {
  const [offices, setOffices] = React.useState<any[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ICreateOfficeForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: officeData?.name,
      parentId: officeData?.parentId,
      openingDate: officeData ? formatDateEsddMMMMyyyy(officeData?.openingDate) : "",
      externalId: officeData?.externalId,
    },
  });
  const router = useRouter();

  const onSubmit = async (data: ICreateOfficeForm) => {
    setIsLoading(true);
    if (officeData) {
      const response = await updateOffice({ ...data, ...dateFormat }, officeData?.id);
      if (response?.status === 200) {
        toast.success("Oficina actualizada con exito!", {
          cancel: true,
        });
        router.push("/administracion/organizacion/administrar-oficinas");
        reset();
      } else {
        toast.error("Error al actualizar la oficina.");
      }
    } else {
      const response = await createOffice({ ...data, ...dateFormat });
      if (response?.status === 200) {
        toast.success("Ofiina creada con exito!", {
          cancel: true,
        });
        router.push("/administracion/organizacion/administrar-oficinas");
        reset();
      } else {
        toast.error("Error al crear la oficina.");
      }
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      const response = await getOffices();
      if (response?.status === 200) {
        setOffices(response?.data);
      }
    })();
  }, []);

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      md={12}
      sx={{
        gap: 3,
        maxWidth: "1000px",
        backgroundColor: "#fff",
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
      container
      mt={3}
    >
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Oficina*"
                type="text"
                isValidField={!errors.name}
                hint={errors.name?.message}
                value={value}
                onChange={onChange}
                defaultValue={officeData?.name}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="parentId"
            render={({ field: { name, onChange } }) => (
              <InputSelect
                label="Oficina matriz*"
                options={keyValueAdapter(offices, "name", "id")}
                setItem={(item: IKeyValue) => onChange(item?.value.toString())}
                hint={errors.parentId?.message}
                isValidField={!errors.parentId}
                defaultValue={officeData?.parentId}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="openingDate"
            render={({ field: { value, name, onChange } }) => (
              <InputCalendar
                label="Fecha de apertura*"
                maxToday
                value={value}
                onChange={date => onChange(date)}
                isValidField={!errors.openingDate}
                hint={errors.openingDate?.message}
                defaultValue={officeData ? formatDateEsddMMMMyyyy(officeData?.openingDate) : ""}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="externalId"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Id externo*"
                type="text"
                isValidField={!errors.externalId}
                hint={errors.externalId?.message}
                value={value}
                onChange={onChange}
                defaultValue={officeData?.externalId}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>
      <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "center", columnGap: 2 }}>
        <Button
          type="button"
          size="small"
          text="cancelar"
          variant="navigation"
          onClick={() => router.push("/administracion/organizacion/administrar-oficinas")}
        />
        <Button type="submit" isLoading={isLoading} disabled={!isValid} size="small" text="Aceptar" variant="primary" />
      </Stack>
    </Grid>
  );
}
