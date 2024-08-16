import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripción es requerida")
});
