import * as yup from "yup";

export const keyValueSchema = yup
  .object({
    label: yup.string().required("La etiqueta es obligatoria"),
    value: yup.mixed().required("El valor es obligatorio"),
  })
  .required();

export const schema = yup.object().shape({
  officeId: keyValueSchema,
  legalFormId: keyValueSchema,
  savingsProductId: yup.object({
    label: yup.string(),
    value: yup.mixed(),
  }),
  staffId: yup.object({
    label: yup.string().required("La etiqueta es obligatoria"),
    value: yup.mixed().required("El valor es obligatorio"),
  }),
  externalId: yup.string().required("El ID externo es obligatorio"),
  mobileNo: yup
    .string()
    .required("El número de teléfono móvil es obligatorio")
    .length(11, "El número de teléfono móvil debe tener 11 caracteres"),
  emailAddress: yup
    .string()
    .email("El formato del correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  dateOfBirth: yup.string().required("La fecha de nacimiento es obligatoria"),
  firstname: yup.string().required("El nombre es obligatorio"),
  middlename: yup.string(),
  lastname: yup.string().required("El apellido es obligatorio"),
});

export default schema;
