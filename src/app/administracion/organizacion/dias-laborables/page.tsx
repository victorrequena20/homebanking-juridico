"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputSelect from "@/components/InputSelect";
import { getWorkDays, updateWorkDays } from "@/services/Core.service";
import { parseByDayString } from "@/utilities/common.utility";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Toggle from "@/components/Toggle";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";

const schema = Yup.object().shape({
  recurrence: Yup.string().optional(),
  repaymentRescheduleType: Yup.mixed(),
});

interface IForm {
  recurrence?: string;
  repaymentRescheduleType?: any;
}

const workingDaysOptionsMock = [
  {
    label: "Lunes",
    value: "MO",
  },
  {
    label: "Martes",
    value: "TU",
  },
  {
    label: "Miércoles",
    value: "WE",
  },
  {
    label: "Jueves",
    value: "TH",
  },
  {
    label: "Viernes",
    value: "FR",
  },
  {
    label: "Sabado",
    value: "SA",
  },
  {
    label: "Domingo",
    value: "SU",
  },
];

export default function WorkDaysPage() {
  const [extenderPlazo, setExtenderPlazo] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingUpdating, setIsLoadingUpdating] = React.useState<boolean>(false);
  const [workingDaysData, setWorkingDaysData] = React.useState<any | null>({
    repaymentRescheduleType: 1,
  });
  const [workingDaysOptions, setWorkingDaysOptions] = React.useState<any | null>([]);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  function convertDaysArrayToString(daysArray: string[]): string {
    const filteredDays = daysArray.filter(day => day !== undefined && day !== null && day !== '');
    const byDayString = filteredDays.join(",");
    return `FREQ=WEEKLY;INTERVAL=1;BYDAY=${byDayString};`;
  }

  async function onSubmit(data: any) {
    setIsLoadingUpdating(true);
    const dataToSend = {
      ...data,
      locale: "es",
      extendTermForDailyRepayments: extenderPlazo,
    };
    const response = await updateWorkDays(dataToSend);
    if (response?.status === 200) {
      toast.success("Días laborables actualizados correctamente");
      router.push("/administracion/organizacion");
    } else {
      toast.error("Error al actualizar los días laborables");
    }
    setIsLoadingUpdating(false);
    console.log("Working days", workingDaysOptions);
    console.log("🚀 ~ onSubmit ~ data:", data);
    console.log("ExtenderPlazo", extenderPlazo);
  }

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getWorkDays();
      console.log("🚀 ~ response:", response);
      if (response?.status === 200) {
        setWorkingDaysData(response?.data);
        setValue("recurrence", response?.data?.recurrence);
        setValue("repaymentRescheduleType", response?.data?.repaymentRescheduleType?.id);
        setWorkingDaysOptions(parseByDayString(response?.data?.recurrence));
        setExtenderPlazo(response?.data?.extendTermForDailyRepayments);
      }
      setIsLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    setValue("repaymentRescheduleType", workingDaysData?.repaymentRescheduleType?.id);
  }, [workingDaysData]);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Días laborales"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Días laborales" },
        ]}
      />

      <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 5, gap: 3 }}>
        <InputSelect
          label="Días laborables"
          withCheckbox
          multiple
          options={workingDaysOptionsMock}
          setItems={selectedValues => {
            console.log("🚀 ~ WorkDaysPage ~ selectedValues:", selectedValues);
            setValue("recurrence", convertDaysArrayToString(selectedValues));
          }}
          defaultValue={workingDaysOptions?.map((item: any) => item.value)}
        />
        <Controller
          control={control}
          name="repaymentRescheduleType"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Pagos vencidos en días no laborables"
              options={keyValueAdapter(workingDaysData?.repaymentRescheduleOptions, "value", "id")}
              setItem={value => onChange(value?.value)}
              defaultValue={workingDaysData?.repaymentRescheduleType?.id}
            />
          )}
        />

        <Stack sx={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <Typography variant="body2" color="#484848">
            Ampliar el plazo de los Créditos siguiendo un calendario de pagos diario
          </Typography>
          <Toggle isChecked={extenderPlazo} size="small" setIsChecked={setExtenderPlazo} />
        </Stack>

        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "flex-start" }}>
          <Button
            text="cancelar"
            variant="navigation"
            onClick={() => router.push("/administracion/organizacion")}
            size="small"
            type="button"
          />
          <Button
            text="Aceptar"
            variant="primary"
            size="small"
            isLoading={isLoadingUpdating}
            type="submit"
            disabled={!isValid}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
