import RenderFormModal from "@/components/Modals/RenderFormModal";
import { Stack, Grid, Typography } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NotFoundData from "@/components/NotFoundData";
import { addIdentifier, getIdentifierTemplate, getIdentifiers } from "@/services/Clients.service";
import { useParams } from "next/navigation";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { toast } from "sonner";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface IForm {
  documentTypeId: any;
  status: any;
  documentKey: string;
  description: string;
}

const schema = yup.object().shape({
  documentTypeId: yup.mixed().required("El tipo de documento es obligatorio"),
  status: yup.mixed().required("El estado es obligatorio"),
  documentKey: yup.string().required("La clave de documento es obligatoria"),
  description: yup.string().required("La descripción es obligatoria"),
});

export default function ClientIdentifications() {
  const [identifiers, setIdentifiers] = React.useState<any>([]);
  const [isLoadingIdentifiers, setIsLoadingIdentifiers] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [identifierTemplate, setIdentifierTemplate] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const columns: GridColDef<(typeof identifiers)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      valueGetter: (value, row) => `${row.id || ""}`,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      valueGetter: (value, row) => `${row.description || ""} `,
    },
    {
      field: "documentKey",
      headerName: "Clave de documento",
      flex: 1,
      valueGetter: (value, row) => `${row.documentKey || ""} `,
    },
    {
      field: "documents",
      headerName: "Documentos de identificación",
      flex: 1,
      valueGetter: (value, row) => `${""} `,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      valueGetter: (value, row) => `${row?.documentType?.active ? "Activo" : "Inactivo"} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.status ? "#E6F0E2" : "#FF8080",
              width: "120px",
              py: 0.5,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: "16px",
            }}
          ></Box>
        </Box>
      ),
      align: "center",
    },
  ];

  async function handleGetIdentifierTemplate() {
    const response = await getIdentifierTemplate(params?.clientId);
    console.log("🚀 ~ handleGetIdentifierTemplate ~ response:", response);
    if (response?.status === 200) {
      setIdentifierTemplate(response.data);
    }
  }

  async function handleGetIdentifiers() {
    setIsLoadingIdentifiers(true);
    const response = await getIdentifiers(params?.clientId);
    console.log("🚀 ~ handleGetIdentifiers ~ response:", response);
    if (response?.status === 200) {
      setIdentifiers(response.data);
    } else {
      toast.error("Error al obtener las identificaciones");
    }
    setIsLoadingIdentifiers(false);
  }

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await addIdentifier(
      {
        ...data,
        documentTypeId: data.documentTypeId?.value,
        status: data.status?.value,
      },
      params?.clientId?.toString()
    );
    if (response?.status === 200) {
      toast.success("Identificación agregada correctamente");
      setOpen(false);
    } else {
      toast.error("Error al agregar la identificación");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    handleGetIdentifierTemplate();
    handleGetIdentifiers();
  }, []);

  return (
    <>
      <Stack>
        {identifiers?.length > 0 ? (
          <Stack>
            <Typography variant="h6">Identificaciones</Typography>
            <DataGrid
              rows={identifiers}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                    page: 0,
                  },
                },
              }}
              sx={{ mt: 3 }}
              disableRowSelectionOnClick
              rowSelection
              pageSizeOptions={[10, 25, 50]}
            />
          </Stack>
        ) : (
          <NotFoundData
            title="No hay identificaciones registradas"
            withOutBack
            action={{
              title: "Agregar identificación",
              onClick: () => setOpen(true),
            }}
          />
        )}
      </Stack>

      <RenderFormModal title="Agregar identificación" isOpen={open} setIsOpen={setOpen} sx={{ maxWidth: "400px" }}>
        <Grid
          container
          sx={{
            gap: 3,
            maxWidth: "400px",
            backgroundColor: "#fff",
            px: 3,
            py: 1,
            borderRadius: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item>
            <Controller
              control={control}
              name="documentTypeId"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Tipo de documento *"
                  options={keyValueAdapter(identifierTemplate?.allowedDocumentTypes, "name", "id")} // Aquí deberías agregar las opciones disponibles
                  setItem={onChange}
                  value={value}
                  hint={errors.documentTypeId?.message}
                  isValidField={!errors.documentTypeId}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Estado *"
                  options={[
                    {
                      label: "Activo",
                      value: "Active",
                    },
                    {
                      label: "Inactivo",
                      value: "Inactive",
                    },
                  ]}
                  setItem={onChange}
                  value={value}
                  hint={errors.status?.message}
                  isValidField={!errors.status}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="documentKey"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Clave de documento *"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.documentKey?.message}
                  isValidField={!errors.documentKey}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Descripción *"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.description?.message}
                  isValidField={!errors.description}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="center" sx={{ gap: 3 }}>
              <Button text="Cancelar" variant="navigation" onClick={() => setOpen(false)} />
              <Button text="Aceptar" variant="primary" type="submit" disabled={!isValid} isLoading={isLoading} />
            </Stack>
          </Grid>
        </Grid>
      </RenderFormModal>
    </>
  );
}
