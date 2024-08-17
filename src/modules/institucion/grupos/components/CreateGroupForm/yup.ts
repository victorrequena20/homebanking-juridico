import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  externalId: yup.string(),
  officeId: yup.mixed().required("Oficina es requerida"),
  staffId: yup.mixed().required("Asesor es requerido"),
  submittedOnDate: yup.string().required("Fecha de registro es requerida"),
  groupMembers: yup.mixed(),
});
