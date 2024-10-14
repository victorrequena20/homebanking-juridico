import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido."),
  externalId: yup.string().required("El ID externo es requerido."),
});
