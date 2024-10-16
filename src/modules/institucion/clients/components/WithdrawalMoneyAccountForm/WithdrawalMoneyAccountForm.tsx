import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputCalendar from "@/components/InputCalendar";
import InputSelect from "@/components/InputSelect";
import { getPaymentTypes } from "@/services/Core.service";
import { depositTransaction } from "@/services/SavingsAccounts.service";
import { formatDateEsddMMMMyyyy } from "@/utilities/common.utility";
import { Grid, Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { dateFormat } from "@/constants/global";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  transactionDate: yup.date().required("La fecha de transacción es obligatoria").max(new Date(), "La fecha no puede ser futura"),
  transactionAmount: yup.number().typeError("Debe ser un número válido").positive("El monto debe ser mayor a cero").required("El monto es obligatorio"),
  paymentTypeId: yup
    .object()
    .shape({
      value: yup.string().required("El tipo de pago es obligatorio"),
    })
    .required("El tipo de pago es obligatorio"),
  note: yup.string().optional(),
});

export default function WithdrawalMoneyAccountForm({ accountId }: { accountId: string }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [paymentTypes, setPaymentTypes] = React.useState<any>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<any>({
    resolver: yupResolver(validationSchema), // Resolver de Yup agregado aquí
    mode: "onChange",
  });
  const router = useRouter();
  const params = useParams();

  async function handleGetPaymentTypes() {
    const resPaymentTypes = await getPaymentTypes();
    if (resPaymentTypes?.status === 200) {
      setPaymentTypes(resPaymentTypes?.data);
    } else {
      toast.error("Error al obtener los tipos de pago.");
    }
  }

  async function onSubmit(data: any) {
    console.log("🚀 ~ onSubmit ~ data:", data);
    setIsLoading(true);
    const response = await depositTransaction(accountId, {
      ...data,
      ...dateFormat,
      paymentTypeId: data?.paymentTypeId?.value,
    });
    if (response?.status === 200) {
      toast.success("Depósito realizado con éxito");
      router.push(`/institucion/clientes/${params?.clientId}/general`);
      reset();
    } else {
      toast.error("Error al realizar el depósito");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetPaymentTypes();
  }, []);

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        gap: 3,
        maxWidth: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        px: 1,
        py: 2,
      }}
    >
      {/* Fecha de transacción */}
      <Grid item xs={12}>
        <Controller
          control={control}
          name="transactionDate"
          render={({ field: { onChange } }) => (
            <InputCalendar
              label="Fecha de transacción *"
              onChange={date => onChange(date)}
              hint={errors.transactionDate?.message}
              isValidField={!errors.transactionDate}
              maxToday
              width="100%"
            />
          )}
        />
      </Grid>
      {/* Monto */}
      <Grid item xs={12}>
        <Controller
          control={control}
          name="transactionAmount"
          render={({ field }) => (
            <Input label="Monto *" type="number" {...field} isValidField={!errors.transactionAmount} hint={errors.transactionAmount?.message} width="100%" />
          )}
        />
      </Grid>
      {/* Tipo de pago */}
      <Grid item xs={12}>
        <Stack>
          <Controller
            control={control}
            name="paymentTypeId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Tipo de pago *"
                options={keyValueAdapter(paymentTypes, "name", "id")}
                setItem={item => onChange(item)}
                value={value}
                isValidField={!errors.paymentTypeId}
                hint={errors.paymentTypeId?.message}
                width="100%"
              />
            )}
          />
        </Stack>
      </Grid>
      {/* Nota */}
      <Grid item xs={12}>
        <Stack sx={{ flex: 1 }}>
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, value } }) => <Input label="Notas" type="text" value={value} onChange={onChange} width="100%" />}
          />
        </Stack>
      </Grid>

      {/* Buttons */}
      <Grid>
        <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "center", columnGap: 3, mt: 3 }}>
          <Button type="button" size="small" text="cancelar" variant="navigation" onClick={() => {}} />
          <Button size="small" text="Confirmar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
