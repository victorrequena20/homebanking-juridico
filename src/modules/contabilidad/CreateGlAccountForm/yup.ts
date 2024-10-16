import * as yup from "yup";

export const validationSchema = yup.object().shape({
  type: yup.mixed().required("Este campo es requerido"),
  name: yup.string().required("Este campo es requerido"),
  usage: yup.mixed().required("Este campo es requerido"),
  glCode: yup.string().required("Este campo es requerido"),
  parentId: yup.mixed().nullable(),
  tagId: yup.number(),
  description: yup.string(),
});
