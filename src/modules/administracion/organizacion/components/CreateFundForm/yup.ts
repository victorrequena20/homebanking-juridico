import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("La nueva contraseña es requerida."),
  externalId: yup.string().required("La confirmación de la contraseña es requerida."),
});
