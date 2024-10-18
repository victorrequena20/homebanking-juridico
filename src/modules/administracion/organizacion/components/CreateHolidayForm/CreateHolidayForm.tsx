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
import { createholiday, editHoliday, getPaymentType } from "@/services/Holidays.service";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { IKeyValue } from "@/types/common";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";

export default function CreateHolidayForm({ holidayData, edit = false }: { holidayData?: any; edit?: boolean }) {
  const [offices, setOffices] = React.useState<any[] | null>(null);
  const [paymentType, setpaymentType] = React.useState<any[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectecPaymentType, setselectecPaymentType] = React.useState<any>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ICreateHolidayForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: holidayData?.name || null,
      description: holidayData?.description || null,
    },
  });
  const router = useRouter();
  const onSubmit = async (data: ICreateHolidayForm) => {
    setIsLoading(true);
    try {
      const { officeIds, ...dataRequest } = data;
      const officesRequest = officeIds.map(officeId => ({ officeId }));

      if (!edit) {
        const body = {
          ...dataRequest,
          dateFormat: "dd MMMM yyyy",
          locale: "es",
          offices: officesRequest,
        };
        const response = await createholiday(body);
        if (response?.status === 200) {
          toast.success("Día festivo creado con éxito!");
          router.push("/administracion/organizacion/administrar-festivos");
          reset();
        } else {
          toast.error("Ocurrió un error al crear el día festivo");
        }
        return;
      }
    } catch (error) {
      console.error("🚀 ~ onSubmit ~ error:", error);
      toast.error("Ocurrió un error al crear el día festivo");
    } finally {
      setIsLoading(false);
    }
  };

  const editHolidayFunction = async () => {
    try {
      const bodyEdit = {
        name: watch("name"),
        dateFormat: "dd MMMM yyyy",
        locale: "es",
        description: watch("description"),
      };
      const response = await editHoliday(bodyEdit, holidayData?.id);
      if (response?.status === 200) {
        toast.success("Día festivo editado con éxito!");
        router.push("/administracion/organizacion/administrar-festivos");
        reset();
      } else {
        toast.error("Ocurrió un error al editar el día festivo");
      }
      return;
    } catch (error) {}
  };

  React.useEffect(() => {
    (async () => {
      const response = await getOffices();
      const responsePaymentType = await getPaymentType();
      if (response?.status === 200) {
        setOffices(response?.data);
      }
      if (responsePaymentType?.status === 200) {
        setpaymentType(responsePaymentType?.data);
      }
    })();
  }, []);

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
      <InputResponsiveContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input label="Nombre del festivo*" type="text" isValidField={!errors.name} hint={errors.name?.message} value={value} onChange={onChange} />
          )}
        />
      </InputResponsiveContainer>
      {!edit && (
        <>
          <InputResponsiveContainer>
            <Controller
              control={control}
              name="fromDate"
              render={({ field: { value, onChange } }) => (
                <InputCalendar
                  label="Desde la fecha*"
                  maxToday={false}
                  value={value}
                  onChange={date => onChange(date)}
                  isValidField={!errors.fromDate}
                  hint={errors.fromDate?.message}
                />
              )}
            />
          </InputResponsiveContainer>

          <InputResponsiveContainer>
            <Controller
              control={control}
              name="toDate"
              render={({ field: { value, onChange } }) => (
                <InputCalendar
                  label="Hasta la fecha*"
                  maxToday={false}
                  value={value}
                  onChange={date => onChange(date)}
                  isValidField={!errors.toDate}
                  hint={errors.toDate?.message}
                />
              )}
            />
          </InputResponsiveContainer>

          <InputResponsiveContainer>
            <Controller
              control={control}
              name="reschedulingType"
              render={({ field: { onChange } }) => (
                <InputSelect
                  label="Tipo de programación de pagos*"
                  options={keyValueAdapter(paymentType, "value", "id")}
                  setItem={(item: IKeyValue) => {
                    onChange(item?.value), setselectecPaymentType(item.value);
                  }}
                  hint={errors.reschedulingType?.message}
                  isValidField={!errors.reschedulingType}
                />
              )}
            />
          </InputResponsiveContainer>
        </>
      )}
      {selectecPaymentType === 2 && (
        <InputResponsiveContainer>
          <Controller
            control={control}
            name="repaymentsRescheduledTo"
            render={({ field: { value, onChange } }) => (
              <InputCalendar
                label="Reembolso programado para*"
                maxToday={false}
                value={value}
                onChange={date => onChange(date)}
                isValidField={!errors.repaymentsRescheduledTo}
                hint={errors.repaymentsRescheduledTo?.message}
              />
            )}
          />
        </InputResponsiveContainer>
      )}

      <InputResponsiveContainer>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <Input label="Descripción" type="text" isValidField={!errors.description} hint={errors.description?.message} value={value} onChange={onChange} />
          )}
        />
      </InputResponsiveContainer>
      {!edit && (
        <InputResponsiveContainer>
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
        </InputResponsiveContainer>
      )}

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
          onClick={() => {
            if (edit) {
              editHolidayFunction();
            }
          }}
          size="small"
          text="Aceptar"
          variant="primary"
        />
      </Grid>
    </Grid>
  );
}
