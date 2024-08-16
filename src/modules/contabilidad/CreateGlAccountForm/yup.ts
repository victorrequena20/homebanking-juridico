import * as yup from "yup";

export const validationSchema = yup.object().shape({
  type: yup.mixed().required("Tipo de cuenta es requerido"),
  name: yup.string().required("Nombre de la cuenta es requerido"),
  usage: yup.mixed().required("Uso de la cuenta es requerido"),
  glCode: yup.string().required("Número de la cuenta es requerido"),
  parentId: yup.mixed(),
  tagId: yup.string(),
  description: yup.string(),
});
