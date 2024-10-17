"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputCalendar from "@/components/InputCalendar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import Toggle from "@/components/Toggle";
import { createProvisioningEntries } from "@/services/Accounting.service";

const schema = Yup.object().shape({
  date: Yup.string().required("La fecha es requerida"),
});

interface IForm {
  date: string;
}

export default function EntradasDeAprovisionamientoPage() {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const dataToSend = {
      ...data,
      locale: "es",
      dateFormat: "dd MMMM yyyy",
      createjournalentries: isActive,
    };
    setIsLoading(true);
    const response = await createProvisioningEntries(dataToSend);
    if (response?.status === 200) {
      toast.success("Entrada de aprovisionamiento creada correctamente.");
      router.push("/contabilidad");
    } else {
      toast.error("Ha ocurrido un error al crear la entrada de aprovisionamiento.");
    }
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Breadcrumbs
        title="Entradas de aprovisionamiento"
        items={[{ title: "Inicio", href: "/dashboard" }, { title: "Contabilidad", href: "/contabilidad" }, { title: "Entradas de aprovisionamiento" }]}
      />

      <Stack sx={{ alignItems: "center", justifyContent: "center", width: "100%", mt: 5 }}>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: "392px", width: { xs: "100%" } }}>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange } }) => (
              <InputCalendar label="Fecha*" onChange={date => onChange(date)} hint={errors.date?.message} isValidField={!errors.date} maxToday />
            )}
          />
          <Stack sx={{ flexDirection: "row", justifyContent: "flex-start", mt: 2 }}>
            <Toggle label="Crear entradas de diario" isChecked={isActive} setIsChecked={setIsActive} size="small" toggleLeft />
          </Stack>

          <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", mt: 3 }}>
            <Button text="cancelar" variant="navigation" onClick={() => router.push("/contabilidad")} size="small" type="button" />
            <Button
              text="Aceptar"
              variant="primary"
              size="small"
              isLoading={isLoading}
              type="submit"
              disabled={!isValid || Object.keys(dirtyFields).length < 1}
            />
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
