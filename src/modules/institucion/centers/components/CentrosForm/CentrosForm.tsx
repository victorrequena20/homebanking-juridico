"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputCalendar from "@/components/InputCalendar";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { getOffices } from "@/services/Office.service";
import { createCenter, getCentersTemplate } from "@/services/Core.service";
import { createCenterFormAdapter } from "@/adapters/institution/CreateCenterForm.adapter";
import { toast } from "sonner";
import Toggle from "@/components/Toggle";
import { useRouter } from "next/navigation";

interface IForm {
  name: string;
  officeId: any;
  staffId?: any;
  externalId?: string;
  submittedOnDate: string;
  activationOnDate?: string;
}

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  officeId: yup.mixed().required("La oficina es obligatoria"),
  staffId: yup.mixed(),
  externalId: yup.string(),
  submittedOnDate: yup.string().required("La fecha de registro es obligatoria"),
  activationOnDate: yup.string(),
});

export default function CreateCenterForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = React.useState<any>({});
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await createCenter(createCenterFormAdapter({ ...data, active: isActive }));
    console.log("🚀 ~ onSubmit ~ response:", response);
    if (response?.status === 200) {
      toast.success("Centro creado correctamente");
      router.push("/institucion/centros");
    } else {
      toast.error("Error al crear el centro");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      setValue("staffId", "");
      const response = await getCentersTemplate({
        officeId: watch("officeId")?.value,
        staffInSelectedOfficeOnly: true,
      });
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setTemplateData(response?.data);
      }
    })();
  }, [watch("officeId")]);

  return (
    <Grid container rowSpacing={3} maxWidth={"860px"} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nombre *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.name?.message}
              isValidField={!errors.name}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name="officeId"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Oficina *"
              options={keyValueAdapter(templateData?.officeOptions, "name", "id")}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.officeId?.message}
              isValidField={!errors.officeId}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name="staffId"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Asesor"
              options={keyValueAdapter(templateData?.staffOptions, "displayName", "id")}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.staffId?.message}
              isValidField={!errors.staffId}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name="externalId"
          render={({ field: { onChange, value } }) => (
            <Input
              label="ID externo"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.externalId?.message}
              isValidField={!errors.externalId}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name="submittedOnDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Registrado el día *"
              onChange={date => onChange(date)}
              value={value}
              hint={errors.submittedOnDate?.message}
              isValidField={!errors.submittedOnDate}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Stack sx={{ alignItems: "flex-start" }}>
          <Toggle label="Activo" isChecked={isActive} setIsChecked={setIsActive} size="small" />
        </Stack>
      </Grid>

      {isActive && (
        <Grid item xs={12}>
          <Controller
            control={control}
            name="activationOnDate"
            render={({ field: { onChange, value } }) => (
              <InputCalendar
                label="Fecha de activación *"
                onChange={date => onChange(date)}
                value={value}
                hint={errors.activationOnDate?.message}
                isValidField={!errors.activationOnDate}
              />
            )}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-start" spacing={2}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button
            text="Aceptar"
            variant="primary"
            type="submit"
            // @ts-ignore
            disabled={isActive ? !(isValid && Boolean(watch("activationOnDate")?.length > 0)) : !isValid}
            isLoading={isLoading}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
