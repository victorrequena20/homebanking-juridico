"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { createPaymentType, updatePaymentType } from "@/services/Core.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Toggle from "@/components/Toggle";

interface IForm {
  name: string;
  description?: string;
  position: string;
}

const schema = yup.object().shape({
  name: yup.string().required("El tipo de pago es obligatorio"),
  description: yup.string(),
  position: yup.string().required("La posición es obligatoria"),
});

export default function CreatePaymentTypeForm({ paymentTypeData }: { paymentTypeData?: any }) {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: paymentTypeData?.name || "",
      description: paymentTypeData?.description || "",
      position: paymentTypeData?.position || "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    {
      if (paymentTypeData) {
        const response = await updatePaymentType(paymentTypeData?.id, { ...data, isCashPayment: isActive });
        if (response?.status === 200) {
          toast.success("Tipo de pago actualizado correctamente");
          router.push("/administracion/organizacion/tipo-de-pago");
        } else {
          toast.error("Error al actualizar el tipo de pago");
        }
      } else {
        const response = await createPaymentType({ ...data, isCashPayment: isActive });
        if (response?.status === 200) {
          toast.success("Tipo de pago creado correctamente");
          router.push("/administracion/organizacion/tipo-de-pago");
        } else {
          toast.error("Error al crear el tipo de pago");
        }
      }
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (paymentTypeData?.isCashPayment) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, []);

  return (
    <Grid
      container
      maxWidth={"860px"}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: "#fff",
        px: 3,
        py: 6,
        gap: 3,
        mt: 3,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item sx={{ alignItems: "center", justifyContent: "center" }}>
        <Stack>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Tipo de pago *"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.name?.message}
                isValidField={!errors.name}
                defaultValue={paymentTypeData?.name || ""}
              />
            )}
          />
        </Stack>
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
              defaultValue={paymentTypeData?.description || ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name="position"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Posición *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.position?.message}
              isValidField={!errors.position}
              defaultValue={paymentTypeData?.position || ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ alignItems: "flex-start" }}>
          <Toggle label="Es pago en efectivo?" isChecked={isActive} setIsChecked={setIsActive} size="small" />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" gap={3}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
