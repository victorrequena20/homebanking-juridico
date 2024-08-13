import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es requerido"),
  email: yup.string().email("El correo electrónico no es válido").required("El correo electrónico es requerido"),
  firstname: yup.string().required("El nombre es requerido"),
  lastname: yup.string().required("El apellido es requerido"),
  officeId: yup.number().required("La oficina es requerida"),
  roles: yup
    .array()
    .of(yup.number().required())
    .min(1, "Al menos un rol es requerido")
    .required("Los roles son requeridos"),
  staffId: yup.number().nullable(), // Puede ser null, pero no undefined
});
