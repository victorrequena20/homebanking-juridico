"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Stack } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCode } from "@/services/Core.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const schema = yup.object().shape({
  keyName: yup.string().required("El nombre clave es requerido"),
});

export default function CreateCodePage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [keyName, setKeyName] = React.useState<string>("");
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<{ keyName: string }>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setKeyName(e.target.value);
  };
  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    const response = await createCode({ name: data?.keyName });
    if (response?.status === 200) {
      reset({ keyName: "" });
      setValue("keyName", "");
      toast.success("Código generado con exito.");
      router.push("/administracion/sistema/codigos");
    }
    console.log("🚀 ~ onSubmit ~ response:", response);
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear código"
        items={[
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Códigos", href: "/administracion/sistema/codigos" },
          { title: "Crear código" },
        ]}
      />

      <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 5 }}>
        <Stack>
          <Controller
            control={control}
            name="keyName"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Nombre clave*"
                type="text"
                onChange={onChange}
                value={value}
                isValidField={!errors.keyName}
                hint={errors.keyName?.message}
              />
            )}
          />
        </Stack>
        <Stack sx={{ flexDirection: "row", gap: 3, mt: 3 }}>
          <Button size="small" text="Cancelar" variant="navigation" />
          <Button
            size="small"
            text="Aceptar"
            variant="primary"
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
