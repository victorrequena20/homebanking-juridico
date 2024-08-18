import * as yup from "yup";

export const validationSchema = yup.object().shape({
  officeId: yup.mixed().required("Oficina es requerida"),
  firstname: yup.string().required("Nombre es requerido"),
  lastname: yup.string().required("Apellido es requerido"),
  mobileNo: yup.string(),
  joiningDate: yup.string().required("Día de ingreso es requerido"),
});
