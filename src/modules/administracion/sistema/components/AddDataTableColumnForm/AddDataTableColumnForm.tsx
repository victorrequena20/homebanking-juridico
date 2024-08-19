import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import React from "react";
import Toggle from "@/components/Toggle";

interface IForm {
  columnName: string;
  columnType: any;
}

const schema = yup.object().shape({
  columnName: yup.string().required("El nombre de la columna es obligatorio"),
  columnType: yup.mixed().required("El tipo de columna es obligatorio"),
});

export default function AddDataTableColumnForm({
  actionCallback,
  onClose,
  data,
}: {
  actionCallback?: (columnData: any) => void;
  onClose?: () => void;
  data?: any;
}) {
  const [isRequired, setIsRequired] = React.useState<boolean>(false);
  const [isUnique, setIsUnique] = React.useState<boolean>(false);
  const [isIndexed, setIsIndexed] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: IForm) => {
    actionCallback?.({
      ...data,
      id: data?.columnName,
      indexed: isIndexed,
      unique: isUnique,
      mandatory: isRequired,
    });
    console.log(data);
  };

  React.useEffect(() => {
    if (data) {
      setValue("columnName", data.columnName);
      setValue("columnType", data?.columnType);
      setIsRequired(data.mandatory);
      setIsUnique(data.unique);
      setIsIndexed(data.indexed);
    }
  }, [data]);

  return (
    <Grid container rowSpacing={3} maxWidth={"860px"} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <Controller
          control={control}
          name="columnName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nombre de la columna"
              type="text"
              value={value}
              onChange={onChange}
              hint={errors.columnName?.message}
              isValidField={!errors.columnName}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          control={control}
          name="columnType"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Tipo de columna"
              options={keyValueAdapter(
                [
                  {
                    name: "Boolean",
                    value: "Boolean",
                  },
                ],
                "name",
                "value"
              )}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.columnType?.message}
              isValidField={!errors.columnType}
              defaultValue={data?.columnType?.value}
            />
          )}
        />
      </Grid>

      <Grid xs={12}>
        <Stack sx={{ alignItems: "flex-start", mt: 2, gap: 2 }}>
          <Toggle label="Obligatorio" isChecked={isRequired} setIsChecked={setIsRequired} size="small" toggleLeft />
          <Toggle label="Unico" isChecked={isUnique} setIsChecked={setIsUnique} size="small" toggleLeft />
          <Toggle label="Indexado" isChecked={isIndexed} setIsChecked={setIsIndexed} size="small" toggleLeft />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button text="Cancelar" variant="navigation" type="button" onClick={onClose} />
          <Button text="Aceptar" variant="primary" type="button" disabled={!isValid} onClick={handleSubmit(onSubmit)} />
        </Stack>
      </Grid>
    </Grid>
  );
}
