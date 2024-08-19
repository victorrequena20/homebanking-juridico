"use client";
import React from "react";
import { useForm, Controller, set } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Stack, Typography } from "@mui/material";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import Input from "@/components/Input";
import RenderFormModal from "@/components/Modals/RenderFormModal";
import PlusIcon from "@/assets/icons/PlusIcon";
import AddDataTableColumnForm from "../AddDataTableColumnForm";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import EditIcon from "@/assets/icons/EditIcon";
import NotFoundData from "@/components/NotFoundData";
import { createDataTable } from "@/services/DataTables.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IForm {
  dataTableName: any;
  entityType: any;
  entitySubType?: any;
}

const schema = yup.object().shape({
  dataTableName: yup.string().required("El nombre de la tabla de datos es obligatorio"),
  entityType: yup.mixed().required("El tipo de entidad es obligatorio"),
  entitySubType: yup.mixed(),
});

export default function CreateDataTableForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [columnToEdit, setColumnToEdit] = React.useState<any>(null);
  const [columns, setColumns] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const columnsRows: GridColDef<(typeof columns)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.columnName || ""}`,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      valueGetter: (value, row) => `${row.columnType?.label || ""} `,
    },
    {
      field: "lenght",
      headerName: "Longitud",
      flex: 1,
      valueGetter: (value, row) => `${row.externalId || ""} `,
    },
    {
      field: "code",
      headerName: "Código",
      flex: 1,
      valueGetter: (value, row) => `${row.externalId || ""} `,
    },
    {
      field: "Mandatory",
      headerName: "Obligatorio",
      flex: 1,
      valueGetter: (value, row) => `${row?.mandatory ? "Si" : "No" || ""} `,
      align: "center",
    },
    {
      field: "unique",
      headerName: "Es unico",
      flex: 1,
      valueGetter: (value, row) => `${row?.unique ? "Si" : "No" || ""} `,
      align: "center",
    },
    {
      field: "indexed",
      headerName: "Indexado",
      flex: 1,
      valueGetter: (value, row) => `${row?.indexed ? "Si" : "No" || ""} `,
      align: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: params => (
        <Stack sx={{ flexDirection: "row", alignItems: "center", height: "100%", gap: 2 }}>
          <Tooltip title="Editar" placement="top">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#153075",
                maxWidth: "36px",
                width: "36px",
                borderRadius: "9px",
                height: "36px",
                cursor: "pointer",
              }}
              onClick={() => {
                setColumnToEdit(params.row?.id);
                setOpen(true);
                setIsEditing(true);
              }}
            >
              <EditIcon color="#fff" size={20} />
            </Box>
          </Tooltip>
          <ConfirmDeleteModal
            buttonType="action"
            title="¿Estás seguro de que deseas eliminar esta columna?"
            actionCallback={() => {
              setColumns(prevColumns => prevColumns.filter(column => column.id !== params?.row?.id));
              console.log(params.row);
            }}
          />
        </Stack>
      ),
    },
  ];

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    console.log({ ...data, columns });
    const columnsData = columns.map(column => {
      return {
        name: column.columnName,
        type: column.columnType?.value,
        length: column.lenght,
        code: column.code,
        mandatory: column.mandatory,
        unique: column.unique,
        indexed: column.indexed,
      };
    });

    const response = await createDataTable({
      columns: columnsData,
      apptableName: data?.entityType?.value,
      datatableName: data?.dataTableName,
      entitySubType: data?.entitySubType?.value,
      multiRow: false,
    });
    if (response?.status === 200) {
      toast.success("Tabla de datos creada correctamente");
      router.push("/administracion/sistema/administrar-tablas-de-datos");
    } else {
      toast.error("Error al crear la tabla de datos");
    }
    setIsLoading(false);
  };

  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        gap: 3,
        backgroundColor: "#fff",
        px: 4,
        maxWidth: "100%",
        py: 6,
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
      }}
    >
      <Grid item>
        <Controller
          control={control}
          name="dataTableName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nombre de la tabla de datos *"
              value={value}
              onChange={onChange}
              hint={errors.dataTableName?.message}
              isValidField={!errors.dataTableName}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name="entityType"
          render={({ field: { onChange, value } }) => (
            <InputSelect
              label="Tipo de entidad *"
              options={keyValueAdapter(
                [
                  {
                    label: "Cliente",
                    value: "m_client",
                  },
                ],
                "label",
                "value"
              )}
              setItem={item => onChange(item)}
              value={value}
              hint={errors.entityType?.message}
              isValidField={!errors.entityType}
            />
          )}
        />
      </Grid>

      {watch("entityType")?.value === "m_client" && (
        <Grid item>
          <Controller
            control={control}
            name="entitySubType"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Subtipo de la entidad"
                options={keyValueAdapter(
                  [
                    {
                      label: "Persona",
                      value: "Person",
                    },
                    {
                      label: "Entidad",
                      value: "Entity",
                    },
                  ],
                  "label",
                  "value"
                )}
                setItem={item => onChange(item)}
                value={value}
                hint={errors.entitySubType?.message}
                isValidField={!errors.entitySubType}
              />
            )}
          />
        </Grid>
      )}

      <Grid item sx={{ width: "100%", maxWidth: { md: "700px", lg: "1000px", xl: "1270px" } }} mx="auto">
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            iconLeft
            icon={<PlusIcon size={20} color="#fff" />}
            size="small"
            type="button"
            variant="primary"
            text="Agregar columna"
            onClick={() => setOpen(true)}
          />
        </Stack>
      </Grid>

      {columns.length > 0 ? (
        <Grid item sx={{ width: "100%", maxWidth: { md: "700px", lg: "1000px", xl: "1270px" } }} mx="auto">
          <Stack sx={{ mt: 3 }}>
            <DataGrid
              rows={columns}
              columns={columnsRows}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                    page: 0,
                  },
                },
              }}
              disableRowSelectionOnClick
              rowSelection
              pageSizeOptions={[10, 25, 50]}
            />
          </Stack>
        </Grid>
      ) : (
        <NotFoundData title="Agrega algunas columnas ;)" mt={2} withOutBack />
      )}

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button text="Cancelar" variant="navigation" type="button" />
          <Button
            text="Aceptar"
            variant="primary"
            type="submit"
            disabled={!(isValid && columns?.length > 0)}
            isLoading={isLoading}
          />
        </Stack>
      </Grid>

      <RenderFormModal
        sx={{ maxWidth: "400px" }}
        title={isEditing ? "Editar columna" : "Agregar columna"}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <AddDataTableColumnForm
          actionCallback={columnData => {
            setColumns([...columns, columnData]);
            setOpen(false);
            setIsEditing(false);
          }}
          onClose={() => {
            setOpen(false);
            setIsEditing(false);
          }}
          data={isEditing ? columns.find(column => column.id === columnToEdit) : null}
        />
      </RenderFormModal>
    </Grid>
  );
}
