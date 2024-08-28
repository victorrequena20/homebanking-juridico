"use client";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ICreateHolidayForm } from "./types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputSelect from "@/components/InputSelect";
import InputCalendar from "@/components/InputCalendar";
import { schema } from "./yup";
import { getOffices } from "@/services/Office.service";
import { createholiday, getPaymentType } from "@/services/Holidays.service";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { IKeyValue } from "@/types/common";
import { dateFormat } from "@/constants/global";

export default function CreateHolidayForm() {
  const [offices, setOffices] = React.useState<any[] | null>(null);
  const [paymentType, setpaymentType] = React.useState<any[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectecPaymentType, setselectecPaymentType] = React.useState<any>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ICreateHolidayForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: ICreateHolidayForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    setIsLoading(true);
    try {
        console.log("��� ~ onSubmit ~ data:", data.officeIds);
        
      const { officeIds, ...dataRequest } = data;
      const officesRequest = officeIds.map(officeId => ({ officeId }));
     
      console.log("��� ~ onSubmit ~ data:", officesRequest);
      const response = await createholiday({
        ...dataRequest,
        dateFormat: "dd MMMM yyyy",
        locale: "es",
        offices: officesRequest, 
      });
      if (response?.status === 200) {
        toast.success("Día festivo creado con éxito!");
        router.push("/administracion/organizacion/administrar-festivos");
        reset();
      } else {
        toast.error("Ocurrió un error al crear el día festivo");
      }
    } catch (error) {
      console.error("🚀 ~ onSubmit ~ error:", error);
      toast.error("Ocurrió un error al crear el día festivo");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    (async () => {
      const response = await getOffices();
      const responsePaymentType = await getPaymentType();
      console.log("🚀 ~ response:", response);
      console.log("🚀 ~ response:", responsePaymentType);
      if (response?.status === 200) {
        setOffices(response?.data);
      }
      if (responsePaymentType?.status === 200) {
        setpaymentType(responsePaymentType?.data);
      }
    })();
  }, []);

  React.useEffect(() => {
    console.log("��� ~ isValid:", selectecPaymentType);
  }, [selectecPaymentType]);

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        columnGap: 3,
        maxWidth: "1000px",
        backgroundColor: "#fff",
        rowGap: 3,
        px: 3,
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        mt: 3,
      }}
    >
      <Grid>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Nombre del festivo*"
              type="text"
              isValidField={!errors.name}
              hint={errors.name?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Grid>

      <Grid>
        <Controller
          control={control}
          name="fromDate"
          render={({ field: { value, onChange } }) => (
            <InputCalendar
              label="Desde la fecha*"
              maxToday={false}
              value={value}
              onChange={(date) => onChange(date)}
              isValidField={!errors.fromDate}
              hint={errors.fromDate?.message}
            />
          )}
        />
      </Grid>

      <Grid>
        <Controller
          control={control}
          name="toDate"
          render={({ field: { value, onChange } }) => (
            <InputCalendar
              label="Hasta la fecha*"
              maxToday={false}
              value={value}
              onChange={(date) => onChange(date)}
              isValidField={!errors.toDate}
              hint={errors.toDate?.message}
            />
          )}
        />
      </Grid>

      <Grid>
        <Controller
          control={control}
          name="reschedulingType"
          render={({ field: { onChange } }) => (
            <InputSelect
              label="Tipo de programación de pagos*"
              options={
                keyValueAdapter(paymentType, "value", "id")
            }
              setItem={(item: IKeyValue) =>{ onChange(item?.value), setselectecPaymentType(item.value)}}
              
              hint={errors.reschedulingType?.message}
              isValidField={!errors.reschedulingType}
            />
          )}
        />
      </Grid>
      {selectecPaymentType === 2 && (
            <Grid>
                <Controller
                control={control}
                name="repaymentsRescheduledTo"
                render={({ field: { value, onChange } }) => (
                    <InputCalendar
                    label="Reembolso programado para*"
                    maxToday={false}
                    value={value}
                    onChange={(date) => onChange(date)}
                    isValidField={!errors.repaymentsRescheduledTo}
                    hint={errors.repaymentsRescheduledTo?.message}
                    />
                )}
                />
            </Grid>
      )}


      <Grid>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Descripción"
              type="text"
              isValidField={!errors.description}
              hint={errors.description?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Grid>

      <Grid>
        <Controller
          control={control}
          name="officeIds"
          render={({ field: { onChange } }) => (
            <InputSelect
                label="Seleccionar oficinas que aplican*"
                withCheckbox
                options={keyValueAdapter(offices, "name", "id")}
                setItems={selectedValues => {
                    console.log("🚀 ~ WorkDaysPage ~ selectedValues:", offices);
                    setValue("officeIds", selectedValues);
                }}
                hint={errors.officeIds?.message}
                isValidField={!errors.officeIds}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          type="button"
          size="small"
          text="Cancelar"
          variant="navigation"
          onClick={() => router.push("/administracion/organizacion/administrar-festivos")}
        />
        <Button
            type="submit"
            isLoading={isLoading}
            //disabled={!isValid}
            size="small"
            text="Aceptar"
            variant="primary"
          />
      </Grid>
    </Grid>
  );
}
