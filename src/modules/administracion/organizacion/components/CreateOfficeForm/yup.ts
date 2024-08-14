import * as yup from "yup";

export const schema = yup.object().shape({
  parentId: yup.string().required("La oficina matriz es requerida"),
  externalId: yup.string().required("El ID externo es requerido"),
  name: yup.string().required("El nombre es requerido"),
  openingDate: yup.string().required("La fecha de apertura es requerida"),
});
