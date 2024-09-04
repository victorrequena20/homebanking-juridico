import Input from "@/components/Input";
import { Grid, Stack } from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { IAddFamilyMembersFormProps, IForm } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./yup";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import InputCalendar from "@/components/InputCalendar";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { CreateClientContext } from "../../context/CreateClient/CreateClient.context";
import { addFamilyMember, getTemplate } from "@/services/Clients.service";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { dateFormat } from "@/constants/global";

export default function AddFamilyMembersForm({ onClose, mode, createdSecondaryAction }: IAddFamilyMembersFormProps) {
  const { templateData, clientFamilyMembers, setClientFamilyMembers } = useContext(CreateClientContext);
  const [templateCurrentData, setTemplateCurrentData] = React.useState<any>(templateData);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const params = useParams();

  async function getClientTemplate() {
    if (mode === "step") return;
    const response = await getTemplate();
    if (response?.status === 200) {
      setTemplateCurrentData(response.data);
    } else {
      toast.error("Error al obtener recursos para la agregación de miembros de la familia");
    }
  }

  async function onSubmit(data: any) {
    setIsLoading(true);
    if (mode === "step") {
      setClientFamilyMembers([...clientFamilyMembers, data]);
    }
    if (mode === "create") {
      const response = await addFamilyMember(
        {
          ...dateFormat,
          genderId: watch("genderId")?.value,
          maritalStatusId: watch("maritalStatusId")?.value,
          professionId: watch("professionId")?.value,
          relationshipId: watch("relationshipId")?.value,
          qualification: watch("qualificationId"),
          dateOfBirth: watch("dateOfBirth"),
          age: watch("age"),
          firstName: watch("firstName"),
          middleName: watch("middleName"),
          lastName: watch("lastName"),
        },
        params?.clientId?.toString()
      );
      if (response?.status === 200) {
        toast.success("Miembro de la familia agregado correctamente");
        createdSecondaryAction?.();
      } else {
        toast.error("Error al agregar miembro de la familia");
      }
    }
    onClose?.();
    setIsLoading(false);
  }

  React.useEffect(() => {
    getClientTemplate();
  }, []);

  return (
    <Grid container columnSpacing={1} rowSpacing={3} maxWidth={"860px"} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={6}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <Input label="Nombre*" type="text" value={value} onChange={onChange} hint={errors.firstName?.message} isValidField={!errors.firstName} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="middleName"
          render={({ field: { onChange, value } }) => (
            <Input label="Segundo nombre" type="text" value={value} onChange={onChange} hint={errors.middleName?.message} isValidField={!errors.middleName} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <Input label="Apellido*" type="text" value={value} onChange={onChange} hint={errors.lastName?.message} isValidField={!errors.lastName} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="qualificationId"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Calificación"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.qualificationId?.message}
              isValidField={!errors.qualificationId}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, value } }) => (
            <Input label="Edad*" type="number" value={value} onChange={onChange} hint={errors.age?.message} isValidField={!errors.age} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="relationshipId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Relación*"
              options={keyValueAdapter(templateCurrentData?.familyMemberOptions?.relationshipIdOptions, "name", "id")}
              setItem={value => onChange(value)}
              hint={errors.relationshipId?.message}
              isValidField={!errors.relationshipId}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="genderId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Género*"
              options={keyValueAdapter(templateCurrentData?.familyMemberOptions?.genderIdOptions, "name", "id")}
              setItem={value => onChange(value)}
              hint={errors.genderId?.message}
              isValidField={!errors.genderId}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="professionId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Profesión"
              options={keyValueAdapter(templateCurrentData?.familyMemberOptions?.professionIdOptions, "name", "id")}
              setItem={value => onChange(value)}
              hint={errors.professionId?.message}
              isValidField={!errors.professionId}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="maritalStatusId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Estado civil"
              options={keyValueAdapter(templateCurrentData?.familyMemberOptions?.maritalStatusIdOptions, "name", "id")}
              setItem={value => onChange(value)}
              hint={errors.maritalStatusId?.message}
              isValidField={!errors.maritalStatusId}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { onChange } }) => (
            <InputCalendar
              label="Fecha de nacimiento*"
              onChange={date => onChange(date)}
              hint={errors.dateOfBirth?.message}
              isValidField={!errors.dateOfBirth}
            />
          )}
        />
      </Grid>

      <Grid md={6} sx={{ mt: 4 }}>
        <Stack
          sx={{
            width: "100%",
            maxWidth: "394px",
            flexDirection: "row",
            justifyContent: "flex-end",
            columnGap: 3,
            px: 1,
          }}
        >
          <Button
            type="button"
            size="small"
            text="cancelar"
            variant="navigation"
            onClick={() => {
              onClose?.();
            }}
          />
        </Stack>
      </Grid>
      <Grid md={6} sx={{ mt: 4 }}>
        <Stack
          sx={{
            width: "100%",
            maxWidth: "394px",
            flexDirection: "row",
            justifyContent: "flex-start",
            columnGap: 3,
            px: 1,
          }}
        >
          <Button type="submit" size="small" text="Aceptar" variant="primary" disabled={!isValid} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
