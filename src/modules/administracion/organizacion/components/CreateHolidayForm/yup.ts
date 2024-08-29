import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("El nombre del festivo es obligatorio"),
  fromDate: yup.string().required("La fecha de inicio es obligatoria"),
  toDate: yup.string().required("La fecha final es obligatoria"),
  reschedulingType: yup.string().required("El tipo de programación de pagos es obligatorio"),
  repaymentsRescheduledTo: yup.string(),
  description: yup.string().optional(),
  officeIds: yup.array().required("Debe seleccionar al menos una oficina"), 
});
