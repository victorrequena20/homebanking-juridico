import * as yup from "yup";

export const schema = yup.object().shape({
  officeId: yup.mixed().required("El ID de la oficina es obligatorio"),
  closingDate: yup.mixed().required("La fecha de cierre es obligatoria"),
  comments: yup.string().notRequired(),
});
