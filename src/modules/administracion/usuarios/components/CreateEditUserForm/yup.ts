import * as yup from "yup";

export const keyValueSchema = yup.object({
  label: yup.string().required("La etiqueta es obligatoria"),
  value: yup.mixed().required("El valor es obligatorio"),
});

export const schema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es requerido"),
  email: yup.string().email("El correo electrónico no es válido").required("El correo electrónico es requerido"),
  firstname: yup.string().required("El nombre es requerido"),
  lastname: yup.string().required("El apellido es requerido"),
  officeId: yup.mixed().required("La oficina es requerida"),
  roles: yup
    .array()
    .of(yup.number().required())
    .min(1, "Al menos un rol es requerido")
    .required("Los roles son requeridos"),
  staffId: yup.mixed().required("El asesor es requerido"),
});

export const createSchema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es requerido"),
  email: yup.string().email("El correo electrónico no es válido").required("El correo electrónico es requerido"),
  firstname: yup.string().required("El nombre es requerido"),
  lastname: yup.string().required("El apellido es requerido"),
  officeId: yup.mixed().required("La oficina es requerida"),
  roles: yup
    .array()
    .of(yup.number().required())
    .min(1, "Al menos un rol es requerido")
    .required("Los roles son requeridos"),
  staffId: yup.mixed().required("El asesor es requerido"),
  password: yup
    .string()
    .required("La nueva contraseña es requerida.")
    .min(5, "La nueva contraseña debe tener al menos 5 caracteres."),
  repeatPassword: yup
    .string()
    .required("La confirmación de la contraseña es requerida.")
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir.")
    .min(5, "La confirmación de la contraseña debe tener al menos 5 caracteres."),
});
