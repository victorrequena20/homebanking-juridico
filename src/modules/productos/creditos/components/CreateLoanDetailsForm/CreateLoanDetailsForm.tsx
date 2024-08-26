import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputCalendar from "@/components/InputCalendar";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { CreateLoanContext } from "../../context/CreateLoan.context";
import React, { useContext, useEffect } from "react";
import Toggle from "@/components/Toggle";

interface IForm {
  productName: string;
  key: string;
  fund?: any;
  startDate?: any;
  endDate?: any;
  description?: string;
}

const schema = yup.object().shape({
  productName: yup.string().required("El nombre del producto es obligatorio"),
  key: yup.string().required("La clave es obligatoria"),
  fund: yup.mixed(),
  startDate: yup.string(),
  endDate: yup.string(),
  description: yup.string(),
});

export default function CreateLoanDetailsForm() {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm } = useContext(CreateLoanContext);
  console.log("🚀 ~ CreateLoanDetailsForm ~ globalForm:", globalForm);
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const formValues = watch();

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  useEffect(() => {
    console.log("🚀 ~ React.useEffect ~ data:", formValues);
    handleChangeGlobalFormValues({ ...formValues });
  }, [JSON.stringify(formValues)]);

  return (
    <Grid
      container
      component="form"
      sx={{
        gap: 3,
        maxWidth: "1000px",
        backgroundColor: "#fff",
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item>
        <Controller
          control={control}
          name="productName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nombre del producto *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.productName?.message}
              isValidField={!errors.productName}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="key"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Clave *"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.key?.message}
              isValidField={!errors.key}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="fund"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Fondo"
              options={keyValueAdapter(loanProductsTemplate?.fundOptions, "name", "id")}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.fund?.message}
              isValidField={!errors.fund}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Fecha de inicio"
              value={value}
              onChange={onChange}
              hint={errors.startDate?.message}
              isValidField={!errors.startDate}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="endDate"
          render={({ field: { onChange, value } }) => (
            <InputCalendar
              label="Fecha de cierre"
              value={value}
              onChange={onChange}
              hint={errors.endDate?.message}
              isValidField={!errors.endDate}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Descripcion"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.description?.message}
              isValidField={!errors.description}
            />
          )}
        />
      </Grid>

      <Grid item xs={11}>
        <Stack sx={{ maxWidth: "392px", pl: 4 }}>
          <Toggle
            toggleLeft
            label="Incluir en el contador de créditos al cliente"
            isChecked={isActive}
            setIsChecked={setIsActive}
            size="small"
            secondaryEffect={() => {
              handleChangeGlobalFormValues({ includeInBorrowerCycle: !isActive });
            }}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ gap: 3, mt: 3 }}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Siguiente" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
