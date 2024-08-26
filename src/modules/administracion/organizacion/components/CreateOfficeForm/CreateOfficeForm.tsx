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
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { createOffice, getOffices } from "@/services/Office.service";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputCalendar from "@/components/InputCalendar";
import { schema } from "./yup";
import { IKeyValue } from "@/types/common";

export default function CreateOfficeForm() {
  const [offices, setOffices] = React.useState<any[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ICreateOfficeForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: ICreateOfficeForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    setIsLoading(true);
    const response = await createOffice({
      ...data,
      locale: "es",
      dateFormat: "dd MMMM yyyy",
    });
    if (response?.status) {
      toast.success("Ofiina creada con exito!", {
        cancel: true,
      });
      router.push("/administracion/organizacion/administrar-oficinas");
      reset();
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      const response = await getOffices();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setOffices(response?.data);
      }
    })();
  }, []);

  return (
    <Stack
      component="form"
      sx={{
        maxWidth: "1000px",
        backgroundColor: "#fff",
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        mt: 3,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ gap: 3 }}>
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
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
                />
              )}
            />
          </Stack>
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
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack sx={{ flexDirection: "row", gap: 3 }}>
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
                />
              )}
            />
          </Stack>
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
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "center", columnGap: 2 }}>
          <Button
            type="button"
            size="small"
            text="cancelar"
            variant="navigation"
            onClick={() => router.push("/administracion/organizacion/administrar-oficinas")}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid || Object.keys(dirtyFields).length < 2}
            size="small"
            text="Aceptar"
            variant="primary"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
