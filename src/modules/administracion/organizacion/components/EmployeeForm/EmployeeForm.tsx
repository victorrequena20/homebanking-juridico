import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IForm } from "./types";
import { validationSchema } from "./yup";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { createStaff, updateStaff } from "@/services/Core.service";
import { getOffices } from "@/services/Office.service";
import InputCalendar from "@/components/InputCalendar";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toggle from "@/components/Toggle";
import { formatDateEsddMMMMyyyy } from "@/utilities/common.utility";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function EmployeeForm({ employeeData }: { employeeData?: any }) {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any[]>([]);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      officeId: employeeData?.officeId || "",
      firstname: employeeData?.firstname || "",
      lastname: employeeData?.lastname || "",
      mobileNo: employeeData?.mobileNo || "",
      joiningDate: formatDateEsddMMMMyyyy(employeeData?.joiningDate) || "",
    },
  });

  const onSubmit = async (data: any) => {
    const dataToSend = {
      ...data,
      officeId: data.officeId?.value,
      locale: "es",
      dateFormat: "dd MMMM yyyy",
      isLoanOfficer: isActive,
    };
    setIsLoading(true);
    if (employeeData) {
      const response = await updateStaff(employeeData.id, dataToSend);
      if (response?.status === 200) {
        toast.success("Empleado actualizado correctamente");
        router.push("/administracion/organizacion/administrar-empleados");
      } else {
        toast.error("Error al actualizar empleado");
      }
    } else {
      const response = await createStaff(dataToSend);
      if (response?.status === 200) {
        toast.success("Empleado creado correctamente");
        router.push("/administracion/organizacion/administrar-empleados");
      } else {
        toast.error("Error al crear empleado");
      }
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (employeeData) {
      setIsActive(employeeData.isLoanOfficer);
    }
    (async () => {
      setIsLoading(true);
      const response = await getOffices();
      if (response?.status === 200) {
        setOffices(response?.data);
      }
      setIsLoading(false);
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
        mx: "auto",
      }}
      container
      mt={3}
    >
      {/* Oficina */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="officeId"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Oficina*"
              options={keyValueAdapter(offices, "name", "id")}
              setItem={item => onChange(item)}
              hint={errors.officeId?.message}
              isValidField={!errors.officeId}
              defaultValue={employeeData?.officeId}
            />
          )}
        />
      </InputResponsiveContainer>
      {/* Nombre */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="firstname"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nombre*"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.firstname?.message}
              isValidField={!errors.firstname}
              defaultValue={employeeData?.firstname}
            />
          )}
        />
      </InputResponsiveContainer>
      {/* Apellido */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="lastname"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Apellido*"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.lastname?.message}
              isValidField={!errors.lastname}
              defaultValue={employeeData?.lastname}
            />
          )}
        />
      </InputResponsiveContainer>
      {/* Numero de telefono para SMS */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="mobileNo"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Número de teléfono para SMS"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.mobileNo?.message}
              isValidField={!errors.mobileNo}
              defaultValue={employeeData?.mobileNo}
            />
          )}
        />
      </InputResponsiveContainer>
      {/* Dia de ingreso */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="joiningDate"
          render={({ field: { onChange } }) => (
            <InputCalendar
              label="Día de ingreso*"
              onChange={date => onChange(date)}
              hint={errors.joiningDate?.message}
              isValidField={!errors.joiningDate}
              defaultValue={formatDateEsddMMMMyyyy(employeeData?.joiningDate)}
            />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Stack
          sx={{
            flexDirection: "row",
            width: { xs: "100%", lg: "392px" },
            maxWidth: "392px",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "1px solid #cccccc80",
            pb: 2,
          }}
        >
          <Typography variant="body2" fontWeight="400" color="#12141a">
            Es oficial de créditos
          </Typography>
          <Box>
            <Toggle isChecked={isActive} size="small" setIsChecked={setIsActive} />
          </Box>
        </Stack>
      </InputResponsiveContainer>

      <Grid xs={12} sx={{ mt: 4 }}>
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            columnGap: 3,
            px: 1,
          }}
        >
          <Button
            type="button"
            size="small"
            text="Cancelar"
            variant="navigation"
            onClick={() => {
              router.push("/administracion/organizacion/administrar-empleados");
            }}
          />
          <Button type="submit" size="small" text="Aceptar" isLoading={isLoading} variant="primary" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
