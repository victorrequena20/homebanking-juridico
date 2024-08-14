"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import InputCalendar from "@/components/InputCalendar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import PlayIcon from "@/assets/icons/PlayIcon";
import { runAccruals } from "@/services/Core.service";
import { toast } from "sonner";

const schema = Yup.object().shape({
  tillDate: Yup.string().required("La fecha es requerida"),
});

interface IForm {
  tillDate: string;
}

export default function DevengosPage() {
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
    setIsLoading(true);
    const response = await runAccruals({
      ...data,
      dateFormat: "dd MMMM yyyy",
      locale: "es",
    });
    if (response?.status === 200) {
      toast.success("Acumulaciones ejecutadas correctamente.");
      router.push("/contabilidad");
    }
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Stack>
          <Typography variant="h4">Devengos</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link color="inherit" href="/auth/login">
              <Typography variant="body2">BDC</Typography>
            </Link>
            <Link color="inherit" href="/contabilidad">
              <Typography variant="body2">Contabilidad</Typography>
            </Link>
            <Typography variant="body2">Devengos</Typography>
          </Breadcrumbs>
        </Stack>
      </Stack>

      <Stack sx={{ alignItems: "center", justifyContent: "center", width: "100%", mt: 5 }}>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="tillDate"
            render={({ field: { onChange } }) => (
              <InputCalendar
                label="Acumular hasta la fecha*"
                onChange={date => onChange(date)}
                hint={errors.tillDate?.message}
                isValidField={!errors.tillDate}
                maxToday
              />
            )}
          />

          <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center", mt: 3 }}>
            <Button
              text="cancelar"
              variant="navigation"
              onClick={() => router.push("/contabilidad")}
              size="small"
              type="button"
            />
            <Button
              text="Ejecutar acumulaciones periódicas"
              variant="primary"
              size="small"
              isLoading={isLoading}
              type="submit"
              iconLeft
              icon={<PlayIcon size={20} color="#fff" />}
              disabled={!isValid || Object.keys(dirtyFields).length < 1}
            />
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
