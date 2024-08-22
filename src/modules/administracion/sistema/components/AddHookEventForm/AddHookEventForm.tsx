import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";

interface IForm {
  selectGrouping: any;
  entityName: any;
  actionName: any;
}

const schema = yup.object().shape({
  selectGrouping: yup.mixed().required("Seleccionar grupo es obligatorio"),
  entityName: yup.mixed().required("Seleccionar entidad es obligatorio"),
  actionName: yup.mixed().required("Nombre de la acción es obligatorio"),
});

export default function AddHookEventForm({ onClose }: { onClose: () => void }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        gap: 3,
        maxWidth: "490px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      <Grid item>
        <Controller
          control={control}
          name="selectGrouping"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Seleccionar grupo*"
              options={[]} // Aquí debes agregar las opciones del select
              setItem={item => onChange(item)}
              value={value}
              hint={errors.selectGrouping?.message}
              isValidField={!errors.selectGrouping}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="entityName"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Seleccionar entidad*"
              options={[]} // Aquí debes agregar las opciones del select
              setItem={item => onChange(item)}
              value={value}
              hint={errors.entityName?.message}
              isValidField={!errors.entityName}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="actionName"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Nombre de la acción*"
              options={[]} // Aquí debes agregar las opciones del select
              setItem={item => onChange(item)}
              value={value}
              hint={errors.actionName?.message}
              isValidField={!errors.actionName}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            text="Cancelar"
            variant="navigation"
            type="button"
            onClick={() => {
              onClose?.();
            }}
          />
          <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} />
        </Stack>
      </Grid>
    </Grid>
  );
}
