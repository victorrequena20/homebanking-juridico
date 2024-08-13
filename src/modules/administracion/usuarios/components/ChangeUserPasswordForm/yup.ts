import * as yup from "yup";

export const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("La nueva contraseña es requerida.")
    .min(5, "La nueva contraseña debe tener al menos 5 caracteres."),
  confirmPassword: yup
    .string()
    .required("La confirmación de la contraseña es requerida.")
    .oneOf([yup.ref("newPassword")], "Las contraseñas deben coincidir.")
    .min(5, "La confirmación de la contraseña debe tener al menos 5 caracteres."),
});
