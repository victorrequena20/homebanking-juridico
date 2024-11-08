import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import React, { useContext, useEffect } from "react";
import { CreatePassiveContext } from "../../../creditos/context/CreateProductPassive.contex";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

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
  key: yup.string().required("La clave es obligatoria").max(4, "La clave no puede tener más de 4 caracteres"),
  fund: yup.mixed(),
  startDate: yup.string(),
  endDate: yup.string(),
  description: yup.string(),
});

export default function CreateProductPassiveDetailsForm() {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm, step } = useContext(CreatePassiveContext);
  console.log("🚀 ~ CreateLoanDetailsForm ~ globalForm:", globalForm);
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      productName: globalForm?.productName,
      key: globalForm?.key,
      fund: globalForm?.fund,
      startDate: globalForm?.startDate,
      endDate: globalForm?.endDate,
      description: globalForm?.description,
    },
  });
  // const formValues = watch();

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  useEffect(() => {
    // update form fields with setValue
    setValue("productName", globalForm?.productName);
    setValue("key", globalForm?.key);
    setValue("fund", globalForm?.value);
    setValue("startDate", globalForm?.startDate);
    setValue("endDate", globalForm?.endDate);
    setValue("description", globalForm?.description);
  }, [step]);

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
        mt: 2,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Nombre del producto */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="productName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nombre del producto *"
              type="text"
              value={value}
              onChange={e => {
                onChange(e);
                handleChangeGlobalFormValues({ ...globalForm, productName: e.target.value });
              }}
              hint={errors.productName?.message}
              isValidField={!errors.productName}
              defaultValue={globalForm?.productName}
            />
          )}
        />
      </InputResponsiveContainer>
      {/* Clave */}
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="key"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Clave *"
              type="text"
              maxLength={4}
              value={value}
              onChange={e => {
                onChange(e);
                handleChangeGlobalFormValues({ ...globalForm, key: e.target.value });
              }}
              hint={errors.key?.message}
              isValidField={!errors.key}
              defaultValue={globalForm?.key}
            />
          )}
        />
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Descripción"
              type="text"
              value={value}
              onChange={e => {
                onChange(e);
                handleChangeGlobalFormValues({ ...globalForm, description: e.target.value });
              }}
              hint={errors.description?.message}
              isValidField={!errors.description}
            />
          )}
        />
      </InputResponsiveContainer>
      <InputResponsiveContainer>
        <Stack sx={{ width: "392px", pl: 4 }} />
      </InputResponsiveContainer>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ gap: 3, mt: 3 }}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Siguiente" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
