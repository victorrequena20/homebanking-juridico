"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./yup";
import InputSelect from "@/components/InputSelect";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import InputCalendar from "@/components/InputCalendar";
import Input from "@/components/Input";
import { IKeyValue } from "@/types/common";
import { getOffices } from "@/services/Office.service";
import { Stack } from "@mui/material";
import Button from "@/components/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { createGlClosure } from "@/services/Accounting.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IForm {
  officeId: IKeyValue | any;
  closingDate: string | any;
  comments?: string | any;
}

export const CloseEntrieForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any | null>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const handleGetOffices = async () => {
    const response = await getOffices({ orderBy: "id" });
    console.log("🚀 ~ response:", response);
    if (response?.status === 200) {
      setOffices(response?.data);
    }
  };

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    console.log(data);
    const response = await createGlClosure({
      ...data,
      officeId: data.officeId.value,
      locale: "es",
      dateFormat: "dd MMMM yyyy",
    });
    if (response?.status === 200) {
      toast.success("Cierre contable creado con exito");
      router.push("/contabilidad/entradas-de-cierre");
      reset();
    }
    setIsLoading(false);
    console.log("🚀 ~ onSubmit ~ response:", response);
  };

  React.useEffect(() => {
    handleGetOffices();
  }, []);

  return (
    <Grid container component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
      <Grid md={12}>
        <Controller
          name="officeId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Asesor"
              options={keyValueAdapter(offices, "name", "id")}
              setItem={(item: IKeyValue) => onChange(item)}
              hint={errors.officeId?.message}
              isValidField={!errors.officeId}
              value={value}
            />
          )}
        />
      </Grid>

      <Grid md={12}>
        <Controller
          name="closingDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Fecha de cierre"
              onChange={date => onChange(date)}
              // hint={errors.closingDate?.message || ''}
              isValidField={!errors.closingDate}
              maxToday
              value={value} // Pasa el valor actual
            />
          )}
        />
      </Grid>

      <Grid md={12}>
        <Controller
          name="comments"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Comentarios"
              type="text"
              isValidField={!errors.comments}
              // hint={errors.comments?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Grid>
      <Grid md={12}>
        <Stack sx={{ flexDirection: "row", justifyContent: "flex-start", gap: 3 }}>
          <Button
            size="small"
            text="Cancelar"
            variant="navigation"
            type="button"
            // onClick={() => router.push("/administracion/productos/comisiones")}
          />
          <Button
            size="small"
            text="Aceptar"
            variant="primary"
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
