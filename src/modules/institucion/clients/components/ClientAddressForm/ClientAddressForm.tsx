import React, { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { addAddress, getClientAddressesTemplate } from "@/services/Clients.service";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface IForm {
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  countryId?: any;
  postalCode?: string;
  stateProvinceId?: any;
  addressType?: any;
}

export default function ClientAddressForm({ onClose }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [templateData, setTemplateData] = useState<any>([]);
  const { control, handleSubmit, watch } = useForm<IForm>({
    mode: "onChange",
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const formValues = watch();
  const params = useParams();

  async function handleGetTemplateData() {
    const response = await getClientAddressesTemplate();
    if (response?.status === 200) {
      setTemplateData(response.data);
    } else {
      console.error("Error al obtener la información de direcciones");
    }
  }

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await addAddress(
      {
        ...data,
        addressType: data?.addressType?.value,
        countryId: data?.countryId?.value,
        stateProvinceId: data?.stateProvinceId?.value,
      },
      params?.clientId,
      data?.addressType?.value
    );
    if (response?.status === 200) {
      toast.success("Dirección agregada correctamente");
    } else {
      toast.error("Error al agregar la dirección");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const isAnyFieldFilled = Object.values(formValues).some(value => value !== undefined && value !== "");
    setIsButtonEnabled(isAnyFieldFilled);
  }, [formValues]);

  useEffect(() => {
    handleGetTemplateData();
  }, []);

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        gap: 3,
        maxWidth: "1000px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item>
        <Controller
          control={control}
          name="addressType"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Tipo de dirección"
              options={keyValueAdapter(templateData?.addressTypeIdOptions, "name", "id")}
              setItem={onChange}
              value={value}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="addressLine1"
          render={({ field: { onChange, value } }) => (
            <Input label="Dirección #1" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="addressLine2"
          render={({ field: { onChange, value } }) => (
            <Input label="Dirección #2" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="addressLine3"
          render={({ field: { onChange, value } }) => (
            <Input label="Dirección #3" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <Input label="Ciudad" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="countryId"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="País"
              options={keyValueAdapter(templateData?.countryIdOptions, "name", "id")}
              setItem={onChange}
              value={value}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="postalCode"
          render={({ field: { onChange, value } }) => (
            <Input label="Código postal" type="text" value={value} onChange={onChange} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="stateProvinceId"
          render={({ field: { onChange, value } }) => (
            <InputSelect label="Estado" options={[]} setItem={onChange} value={value} />
          )}
        />
      </Grid>

      <Grid item xs={12} sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="center" gap={3}>
          <Button text="Cancelar" variant="secondary" type="button" onClick={() => onClose?.()} />
          <Button text="Agregar" variant="primary" type="submit" disabled={!isButtonEnabled} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
