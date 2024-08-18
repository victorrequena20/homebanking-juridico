import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup.string().required("Nombre es requerido"),
  middleName: yup.string(),
  lastName: yup.string().required("Apellido es requerido"),
  qualificationId: yup.string(),
  age: yup.string().required("Edad es requerida"),
  relationshipId: yup.mixed().required("Relación es requerida"),
  genderId: yup.mixed().required("Género es requerido"),
  professionId: yup.mixed(),
  maritalStatusId: yup.mixed(),
  dateOfBirth: yup.string().required("Fecha de nacimiento es requerida"),
});
