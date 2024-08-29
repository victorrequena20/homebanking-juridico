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
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAccountingRules } from "@/services/Accounting.service";
import { getOffices } from "@/services/Office.service";
import { createJournalEntry, getCurrencies, getPaymentTypes } from "@/services/Core.service";
import { toast } from "sonner";
import { createFrecuentPostingsAdapter } from "@/adapters/accounting/createFrecuentPostings.adapter";
import { useRouter } from "next/navigation";

interface IForm {
  accountNumber?: string;
  accountingRule: any;
  bankNumber?: string;
  checkNumber?: string;
  comments?: string;
  credits: any;
  currencyCode: any;
  debits: any;
  officeId: any;
  paymentTypeId?: any;
  receiptNumber?: string;
  referenceNumber?: string;
  routingCode?: string;
  transactionDate: string;
  debitAmount: string;
  creditAmount: string;
}

const schema = yup.object().shape({
  accountNumber: yup.string(),
  accountingRule: yup.object().required("La regla de contabilidad es obligatoria"),
  bankNumber: yup.string(),
  checkNumber: yup.string(),
  comments: yup.string(),
  credits: yup.mixed().required("La entrada del libro mayor (crédito) es obligatoria"),
  currencyCode: yup.mixed().required("La moneda es obligatoria"),
  debits: yup.mixed().required("La entrada del libro mayor (débito) es obligatoria"),
  officeId: yup.mixed().required("La oficina es obligatoria"),
  paymentTypeId: yup.mixed(),
  receiptNumber: yup.string(),
  referenceNumber: yup.string(),
  routingCode: yup.string(),
  transactionDate: yup.string().required("La fecha de transacción es obligatoria"),
  creditAmount: yup.string().required("El monto de crédito es obligatorio"),
  debitAmount: yup.string().required("El monto de débito es obligatorio"),
});

export default function TransactionForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [accountingRules, setAccountingRules] = React.useState<any>([]);
  const [officesOptions, setOfficesOptions] = React.useState<any>([]);
  const [currencyOptions, setCurrencyOptions] = React.useState<any>([]);
  const [paymentTypes, setPaymentTypes] = React.useState<any>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await createJournalEntry(createFrecuentPostingsAdapter(data));
    if (response?.status === 200) {
      router.push("/contabilidad/publicaciones-frecuentes");
      toast.success("Publicación frecuente creada con éxito");
    } else {
      toast.error("Error al crear la publicación frecuente");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      const resAccountingRules = await getAccountingRules({ associations: "all" });
      if (resAccountingRules?.status === 200) {
        setAccountingRules(resAccountingRules?.data);
      }

      const resOffices = await getOffices({ orderBy: "id" });
      if (resOffices?.status === 200) {
        setOfficesOptions(keyValueAdapter(resOffices?.data, "name", "id"));
      }

      const resCurrencies = await getCurrencies();
      if (resCurrencies?.status === 200) {
        setCurrencyOptions(keyValueAdapter(resCurrencies?.data?.selectedCurrencyOptions, "code", "code"));
      }

      const resPaymentTypes = await getPaymentTypes();
      if (resPaymentTypes?.status === 200) {
        setPaymentTypes(resPaymentTypes?.data);
      }
    })();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear publicacion frecuente"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Contabilidad", href: "/contabilidad" },
          { title: "Publicaciones frecuentes", href: "/contabilidad/publicaciones-frecuentes" },
          { title: "Crear publicación" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Stack sx={{ alignItems: "center" }}>
        <Grid
          container
          sx={{
            mt: 3,
            columnGap: 3,
            rowGap: 3,
            maxWidth: "1000px",
            backgroundColor: "#fff",
            px: 3,
            py: 6,
            borderRadius: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item>
            <Controller
              control={control}
              name="officeId"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Oficina *"
                  options={officesOptions}
                  setItem={item => onChange(item)}
                  value={value}
                  hint={errors.officeId?.message}
                  isValidField={!errors.officeId}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="accountingRule"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Regla de contabilidad"
                  options={keyValueAdapter(accountingRules, "name", "id")}
                  setItem={item => onChange(item)}
                  value={value}
                  hint={errors.accountingRule?.message}
                  isValidField={!errors.accountingRule}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="currencyCode"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Moneda *"
                  options={currencyOptions}
                  setItem={item => onChange(item)}
                  value={value}
                  hint={errors.currencyCode?.message}
                  isValidField={!errors.currencyCode}
                />
              )}
            />
          </Grid>

          {/* Padding */}
          <Grid item>
            <Stack sx={{ width: "392px" }} />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="debits"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Entrada del libro mayor afectada (débito) *"
                  options={keyValueAdapter(accountingRules[0]?.debitAccounts, "name", "id")}
                  setItem={item => onChange(item)}
                  value={value}
                  hint={errors.debits?.message}
                  isValidField={!errors.debits}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="debitAmount"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Monto de débito *"
                  type="number"
                  onChange={onChange}
                  value={value}
                  hint={errors.debitAmount?.message}
                  isValidField={!errors.debitAmount}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="credits"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Entrada del libro mayor afectada (crédito) *"
                  options={keyValueAdapter(accountingRules[0]?.creditAccounts, "name", "id")}
                  setItem={item => onChange(item)}
                  value={value}
                  hint={errors.credits?.message}
                  isValidField={!errors.credits}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="creditAmount"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Monto de crédito *"
                  type="number"
                  value={value}
                  onChange={onChange}
                  hint={errors.creditAmount?.message}
                  isValidField={!errors.creditAmount}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="referenceNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Número de referencia"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.referenceNumber?.message}
                  isValidField={!errors.referenceNumber}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="transactionDate"
              render={({ field: { onChange, value } }) => (
                <InputCalendar
                  label="Fecha de transacción*"
                  value={value}
                  onChange={onChange}
                  hint={errors.transactionDate?.message}
                  isValidField={!errors.transactionDate}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="paymentTypeId"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de pago"
                  options={keyValueAdapter(paymentTypes, "name", "id")}
                  setItem={item => onChange(item)}
                  value={value}
                  hint={errors.paymentTypeId?.message}
                  isValidField={!errors.paymentTypeId}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="accountNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Número de cuenta"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.accountNumber?.message}
                  isValidField={!errors.accountNumber}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="checkNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Número de cheque"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.checkNumber?.message}
                  isValidField={!errors.checkNumber}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="routingCode"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Código de enrutamiento"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.routingCode?.message}
                  isValidField={!errors.routingCode}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="receiptNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Número de recibo"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.receiptNumber?.message}
                  isValidField={!errors.receiptNumber}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="bankNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Número de banco"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.bankNumber?.message}
                  isValidField={!errors.bankNumber}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              control={control}
              name="comments"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Comentarios"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.comments?.message}
                  isValidField={!errors.comments}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" spacing={3}>
              <Button text="Cancelar" variant="navigation" type="button" />
              <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Wrapper>
  );
}
