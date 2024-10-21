import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import InputCalendar from "@/components/InputCalendar";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { createLoanReassignment, getLoanReassignmentTemaplate } from "@/services/Loans.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createLoanReassignmentFormAdapter } from "@/adapters/loans/CreateLoanReassignmentForm.adapter";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

interface IForm {
  officeId: any;
  assigmentDate: string;
  fromLoanOfficerId: any;
  toLoanOfficerId: any;
}

const schema = yup.object().shape({
  officeId: yup.object().required("La oficina es obligatoria"),
  assigmentDate: yup.string().required("La fecha de asignación es obligatoria"),
  fromLoanOfficerId: yup.object().required("El oficial de créditos actual es obligatorio"),
  toLoanOfficerId: yup.object().required("El nuevo oficial de créditos es obligatorio"),
});

export default function AssignmentForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any[]>([]);
  const [templateData, setTemplateData] = React.useState<any>({});
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await createLoanReassignment(createLoanReassignmentFormAdapter(data));
    console.log("🚀 ~ onSubmit ~ response:", response);
    if (response?.status === 200) {
      toast.success("Reasignación creada correctamente");
      router.push("/administracion/organizacion");
    } else {
      toast.error("Ocurrió un error al crear la reasignación");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      const response = await getLoanReassignmentTemaplate({ officeId: watch("officeId")?.value });
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setOffices(response?.data?.officeOptions);
        setTemplateData(response?.data);
      }
    })();
  }, [watch("officeId")]);

  return (
    <Grid
      container
      sx={{
        maxWidth: "1000px",
        backgroundColor: "#fff",
        px: 3,
        gap: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mt: 5,
        mx: "auto",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="officeId"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Oficina*"
              options={keyValueAdapter(offices, "name", "id")}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.officeId?.message}
              isValidField={!errors.officeId}
            />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="assigmentDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Fecha de asignación*"
              onChange={date => onChange(date)}
              value={value}
              hint={errors.assigmentDate?.message}
              isValidField={!errors.assigmentDate}
            />
          )}
        />
      </InputResponsiveContainer>

      {watch("officeId") && (
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="fromLoanOfficerId"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Del oficial de créditos*"
                options={keyValueAdapter(templateData?.loanOfficerOptions, "displayName", "id")}
                setItem={item => onChange(item)}
                value={value}
                hint={errors.fromLoanOfficerId?.message}
                isValidField={!errors.fromLoanOfficerId}
              />
            )}
          />
        </InputResponsiveContainer>
      )}

      {watch("officeId") && (
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="toLoanOfficerId"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Al oficial de créditos*"
                options={keyValueAdapter(templateData?.loanOfficerOptions, "displayName", "id")}
                setItem={item => onChange(item)}
                value={value}
                hint={errors.toLoanOfficerId?.message}
                isValidField={!errors.toLoanOfficerId}
              />
            )}
          />
        </InputResponsiveContainer>
      )}

      <Grid item xs={12}>
        <Stack sx={{ gap: 3, mt: 3, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
          <Button
            text="Cancelar"
            variant="navigation"
            type="button"
            onClick={() => {
              router.push("/administracion/organizacion");
            }}
          />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
