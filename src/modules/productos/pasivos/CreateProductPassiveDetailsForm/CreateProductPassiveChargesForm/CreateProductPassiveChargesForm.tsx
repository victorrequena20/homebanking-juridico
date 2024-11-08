import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import React, { useContext, useEffect } from "react";
import { CreatePassiveContext } from "@/modules/productos/creditos/context/CreateProductPassive.contex";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
interface IForm {
  commission: any;
}

const schema = yup.object().shape({
  commission: yup.mixed().required("La moneda es obligatoria"),
});

export default function CreateProductPassiveChargesForm() {
  const { handleChangeGlobalFormValues, loanProductsTemplate, globalForm, step } = useContext(CreatePassiveContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      commission: globalForm?.currencyCode,
    },
  });
  const formValues = watch();

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  useEffect(() => {
    console.log("🚀 ~ React.useEffect ~ data:", formValues);
    setValue("commission", globalForm?.commission);
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
      <Stack direction="row" justifyContent="center" alignItems={"center"} sx={{ gap: 3, mt: 3, width: "100%" }}>
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="commission"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Comisión *"
                options={[]}
                setItem={item => {
                  onChange(item);
                  handleChangeGlobalFormValues({ ...globalForm, commission: item });
                }}
                value={value}
                hint={errors.commission?.message}
                isValidField={!errors.commission}
                defaultValue={globalForm?.commission?.value}
              />
            )}
          />
        </InputResponsiveContainer>
        <Box sx={{ mt: 3 }}>
          <Button text="Agregar" variant="primary" type="button" disabled={!watch("commission")} />
        </Box>
      </Stack>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ gap: 3, mt: 3 }}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Siguiente" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
