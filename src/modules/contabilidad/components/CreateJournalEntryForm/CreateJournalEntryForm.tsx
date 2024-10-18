"use client";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Typography } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputCalendar from "@/components/InputCalendar";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import PlusIcon from "@/assets/icons/PlusIcon";
import { getGlAccounts } from "@/services/Accounting.service";
import { toast } from "sonner";
import { Box } from "@mui/material";
import TrashIcon from "@/assets/icons/TrashIcon";
import { getOffices } from "@/services/Office.service";
import { createJournalEntry, getCurrencies, getPaymentTypes } from "@/services/Core.service";
import { useRouter } from "next/navigation";
import { dateFormat } from "@/constants/global";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
// Validation Schema
const schema = yup.object().shape({
  officeId: yup.mixed().required("La oficina es obligatoria"),
  currencyCode: yup.mixed().required("La moneda es obligatoria"),
  referenceNumber: yup.string(),
  transactionDate: yup.string().required("La fecha de transacción es obligatoria"),
  paymentTypeId: yup.mixed(),
  accountNumber: yup.string(),
  checkNumber: yup.string(),
  routingCode: yup.string(),
  receiptNumber: yup.string(),
  bankNumber: yup.string(),
  comments: yup.string(),
  debits: yup.array().of(
    yup.object().shape({
      glAccountId: yup.mixed().required("La entrada de libro mayor afectada (débito) es obligatoria"),
      amount: yup.string().required("El monto del débito es obligatorio"),
    })
  ),
  credits: yup.array().of(
    yup.object().shape({
      glAccountId: yup.mixed().required("La entrada de libro mayor afectada (crédito) es obligatoria"),
      amount: yup.string().required("El monto del crédito es obligatorio"),
    })
  ),
});

export default function CreateJournalEntryForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [offices, setOffices] = React.useState<any | null>([]);
  const [currencies, setCurrencies] = React.useState<any>({});
  const [paymentTypes, setPaymentTypes] = React.useState<any>([]);
  const [glAccounts, setGlAccounts] = useState<any[]>([]);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      debits: [{ glAccountId: "", amount: "" }],
      credits: [{ glAccountId: "", amount: "" }],
    },
  });

  const {
    fields: debitFields,
    append: appendDebit,
    remove: removeDebit,
  } = useFieldArray({
    control,
    name: "debits",
  });

  const {
    fields: creditFields,
    append: appendCredit,
    remove: removeCredit,
  } = useFieldArray({
    control,
    name: "credits",
  });

  async function handleGetGlAccounts() {
    const response = await getGlAccounts({ usage: 1, manualEntriesAllowed: true, disabled: false });
    if (response?.status === 200) {
      setGlAccounts(response?.data);
    } else {
      toast.error("Error al obtener las cuentas del libro mayor.");
    }
  }
  async function handleGetOffices() {
    const response = await getOffices({ orderBy: "id" });
    if (response?.status === 200) {
      setOffices(response?.data);
    } else {
      toast.error("Error al obtener las oficinas.");
    }
  }
  const handleGetCurrencies = async () => {
    const response = await getCurrencies();
    if (response?.status === 200) {
      setCurrencies(response?.data);
    }
  };
  async function handleGetPaymentTypes() {
    const resPaymentTypes = await getPaymentTypes();
    if (resPaymentTypes?.status === 200) {
      setPaymentTypes(resPaymentTypes?.data);
    } else {
      toast.error("Error al obtener los tipos de pago.");
    }
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form Data:", data);
    const response = await createJournalEntry({
      ...dateFormat,
      ...data,
      officeId: data.officeId?.value,
      currencyCode: data.currencyCode?.value,
      paymentTypeId: data.paymentTypeId?.value,
    });
    if (response?.status === 200) {
      toast.success("Entrada de diario creada con éxito.");
      router.push("/contabilidad");
    } else {
      toast.error("Error al crear la entrada de diario.");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    handleGetGlAccounts();
    handleGetOffices();
    handleGetCurrencies();
    handleGetPaymentTypes();
  }, []);

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
    >
      {/* Office */}
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="officeId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Oficina *"
                options={keyValueAdapter(offices, "name", "id")}
                setItem={item => onChange(item)}
                value={value}
                isValidField={!errors.officeId}
                hint={errors.officeId?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      {/* Currency */}
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="currencyCode"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Moneda *"
                options={keyValueAdapter(currencies?.selectedCurrencyOptions, "displayLabel", "code")}
                setItem={item => onChange(item)}
                value={value}
                isValidField={!errors.currencyCode}
                hint={errors.currencyCode?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      {/* Additional Fields */}
      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="referenceNumber"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Número de referencia"
                type="text"
                value={value}
                onChange={onChange}
                isValidField={!errors.referenceNumber}
                hint={errors.referenceNumber?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="transactionDate"
            render={({ field: { value, onChange } }) => (
              <InputCalendar
                label="Fecha de transacción *"
                value={value}
                onChange={onChange}
                isValidField={!errors.transactionDate}
                hint={errors.transactionDate?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="paymentTypeId"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                label="Tipo de pago"
                options={keyValueAdapter(paymentTypes, "name", "id")}
                setItem={item => onChange(item)}
                value={value}
                isValidField={!errors.paymentTypeId}
                hint={errors.paymentTypeId?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="accountNumber"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Número de cuenta"
                type="text"
                value={value}
                onChange={onChange}
                isValidField={!errors.accountNumber}
                hint={errors.accountNumber?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="checkNumber"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Número de cheque"
                type="text"
                value={value}
                onChange={onChange}
                isValidField={!errors.checkNumber}
                hint={errors.checkNumber?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="routingCode"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Código de enrutamiento"
                type="text"
                value={value}
                onChange={onChange}
                isValidField={!errors.routingCode}
                hint={errors.routingCode?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="receiptNumber"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Número de recibo"
                type="text"
                value={value}
                onChange={onChange}
                isValidField={!errors.receiptNumber}
                hint={errors.receiptNumber?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="bankNumber"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Número de banco"
                type="text"
                value={value}
                onChange={onChange}
                isValidField={!errors.bankNumber}
                hint={errors.bankNumber?.message}
              />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      {/* Debits */}
      <Grid xs={12} item>
        <Stack sx={{ mx: "auto", gap: 3 }}>
          {debitFields.map((field, index) => (
            <Grid container xs={12} sx={{ gap: 3, mx: "auto", alignItems: "center", justifyContent: "center" }} key={field.id}>
              <InputResponsiveContainer>
                <Stack>
                  <Controller
                    control={control}
                    name={`debits.${index}.glAccountId`}
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        label="Entrada de libro mayor afectada (débito) *"
                        options={keyValueAdapter(glAccounts, "name", "id")}
                        setItem={item => onChange(item)}
                        value={value}
                        isValidField={!errors.debits?.[index]?.glAccountId}
                        hint={errors.debits?.[index]?.glAccountId?.message}
                      />
                    )}
                  />
                </Stack>
              </InputResponsiveContainer>
              <InputResponsiveContainer>
                <Stack sx={{ flexDirection: "row", alignItems: "flex-end", gap: 2 }}>
                  <Controller
                    control={control}
                    name={`debits.${index}.amount`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Monto del débito *"
                        value={value}
                        onChange={onChange}
                        isValidField={!errors.debits?.[index]?.amount}
                        hint={errors.debits?.[index]?.amount?.message}
                        width="320px"
                        type="number"
                      />
                    )}
                  />
                  <Box>
                    {index !== 0 ? (
                      <Button icon={<TrashIcon color="#fff" />} variant="warning-red" type="button" onClick={() => removeDebit(index)} />
                    ) : (
                      <Button type="button" onClick={() => appendDebit({ glAccountId: "", amount: "" })} icon={<PlusIcon />} />
                    )}
                  </Box>
                </Stack>
              </InputResponsiveContainer>
            </Grid>
          ))}
        </Stack>
      </Grid>

      {/* Credits */}
      <Grid xs={12} item>
        <Stack sx={{ mx: "auto", gap: 3 }}>
          {creditFields.map((field, index) => (
            <Grid container xs={12} sx={{ gap: 3, mx: "auto", alignItems: "center", justifyContent: "center" }} key={field.id}>
              <InputResponsiveContainer>
                <Controller
                  control={control}
                  name={`credits.${index}.glAccountId`}
                  render={({ field: { onChange, value } }) => (
                    <InputSelect
                      label="Entrada de libro mayor afectada (crédito) *"
                      options={keyValueAdapter(glAccounts, "name", "id")}
                      setItem={item => onChange(item?.value)}
                      value={value}
                      isValidField={!errors.credits?.[index]?.glAccountId}
                      hint={errors.credits?.[index]?.glAccountId?.message}
                    />
                  )}
                />
              </InputResponsiveContainer>
              <InputResponsiveContainer>
                <Stack sx={{ flexDirection: "row", alignItems: "flex-end", gap: 2 }}>
                  <Controller
                    control={control}
                    name={`credits.${index}.amount`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Monto del crédito *"
                        type="number"
                        value={value}
                        onChange={onChange}
                        isValidField={!errors.credits?.[index]?.amount}
                        hint={errors.credits?.[index]?.amount?.message}
                        width="320px"
                      />
                    )}
                  />
                  {index !== 0 ? (
                    <Button icon={<TrashIcon color="#fff" />} variant="warning-red" type="button" onClick={() => removeCredit(index)} />
                  ) : (
                    <Button type="button" onClick={() => appendCredit({ glAccountId: "", amount: "" })} icon={<PlusIcon />} />
                  )}
                </Stack>
              </InputResponsiveContainer>
            </Grid>
          ))}
        </Stack>
      </Grid>

      <InputResponsiveContainer>
        <Stack>
          <Controller
            control={control}
            name="comments"
            render={({ field: { value, onChange } }) => (
              <Input label="Comentarios" type="text" value={value} onChange={onChange} isValidField={!errors.comments} hint={errors.comments?.message} />
            )}
          />
        </Stack>
      </InputResponsiveContainer>

      {/* Padding */}
      <InputResponsiveContainer>
        <Stack sx={{ width: "392px" }}></Stack>
      </InputResponsiveContainer>

      <Grid item xs={12}>
        <Stack sx={{ gap: 3, mt: 3, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
        </Stack>
      </Grid>
    </Grid>
  );
}
