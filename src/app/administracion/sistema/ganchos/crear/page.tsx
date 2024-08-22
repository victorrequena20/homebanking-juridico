"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonBack from "@/components/ButtonBack";
import { createHook, getHooksTemplate } from "@/services/Core.service";
import { toast } from "sonner";
import { keyValueAdapter } from "@/adapters/keyValue.adapter";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import NotFoundData from "@/components/NotFoundData";
import PlusIcon from "@/assets/icons/PlusIcon";
import RenderFormModal from "@/components/Modals/RenderFormModal";
import AddHookEventForm from "@/modules/administracion/sistema/components/AddHookEventForm/AddHookEventForm";

interface IForm {
  name: any;
  displayName: string;
  contentType: any;
  payloadUrl: string;
}

const schema = yup.object().shape({
  name: yup.mixed().required("La plantilla de gancho es obligatoria"),
  displayName: yup.string().required("El nombre para mostrar es obligatorio"),
  contentType: yup.mixed().required("El tipo de contenido es obligatorio"),
  payloadUrl: yup.string().url("La url no es valida").required("La URL de carga útil es obligatoria"),
});

export default function HookTemplateForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<any>([]);
  const [templateData, setTemplateData] = React.useState<any>([]);
  const [showAddEventModal, setShowAddEventModal] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const columns: GridColDef<(typeof events)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      valueGetter: (value, row) => `${row.name || ""}`,
    },
    {
      field: "accountNumber",
      headerName: "Número de cuenta",
      flex: 1,
      valueGetter: (value, row) => `${row.accountNumber || ""} `,
    },
    {
      field: "externalId",
      headerName: "Id externo",
      flex: 1,
      valueGetter: (value, row) => `${row.externalId || ""} `,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: params => (
        <Stack sx={{ flexDirection: "row", alignItems: "center", height: "100%", gap: 2 }}>
          <ConfirmDeleteModal
            buttonType="action"
            title="¿Estás seguro de que deseas eliminar este tipo de pago?"
            actionCallback={() => {}}
          />
        </Stack>
      ),
      align: "center",
    },
    {
      field: "office",
      headerName: "Oficina",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => `${row.office || ""} `,
    },
  ];

  const onSubmit = async (data: IForm) => {
    setIsLoading(true);
    const response = await createHook({
      displayName: data.displayName,
      name: data.name?.label,
      config: {
        "Content Type": data.contentType?.value,
        "Payload URL": data.payloadUrl,
      },
      isActive: "",
      events: [],
    });
    if (response?.status) {
      toast.success("Gancho creado con éxito!", {
        cancel: true,
      });
    } else {
      toast.error("Error al crear el gancho");
    }
    console.log("🚀 ~ onSubmit ~ response:", response);
    console.log(data);
    setIsLoading(false);
  };

  async function handleGetHookTemplate() {
    const response = await getHooksTemplate();
    if (response?.status === 200) {
      setTemplateData(response.data);
    } else {
      toast.error("Error al obtener las plantillas de gancho");
    }
  }

  React.useEffect(() => {
    setValue("name", {
      label: "Web",
      value: 1,
    });
    handleGetHookTemplate();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear gancho"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar gachos", href: "/administracion/sistema/ganchos" },
          { title: "Crear gancho" },
        ]}
      />

      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>

      <Grid
        container
        component="form"
        sx={{
          gap: 3,
          maxWidth: "1000px",
          backgroundColor: "#fff",
          px: 3,
          py: 6,
          borderRadius: "16px",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          mx: "auto",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Plantilla de gancho *"
                options={keyValueAdapter(templateData?.templates, "name", "id")}
                setItem={item => onChange(item)}
                value={value}
                hint={errors.name?.message}
                isValidField={!errors.name}
                defaultValue={1}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            control={control}
            name="displayName"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nombre para mostrar *"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.displayName?.message}
                isValidField={!errors.displayName}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            control={control}
            name="contentType"
            render={({ field: { onChange, value } }) => (
              <InputSelect
                label="Content Type *"
                options={keyValueAdapter(
                  [
                    {
                      label: "JSON",
                      value: "json",
                    },
                    {
                      label: "Form",
                      value: "form",
                    },
                  ],
                  "label",
                  "value"
                )}
                setItem={item => onChange(item)}
                value={value}
                hint={errors.contentType?.message}
                isValidField={!errors.contentType}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            control={control}
            name="payloadUrl"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Payload URL *"
                type="text"
                value={value}
                onChange={onChange}
                hint={errors.payloadUrl?.message}
                isValidField={!errors.payloadUrl}
              />
            )}
          />
        </Grid>

        <Grid item xs={10} mt={4}>
          <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
            <Stack sx={{ alignItems: "flex-end" }}>
              <Button
                iconLeft
                icon={<PlusIcon size={20} color="#fff" />}
                size="small"
                type="button"
                variant="primary"
                text="Agregar evento"
                onClick={() => setShowAddEventModal(true)}
              />
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} sx={{ mt: 3 }}>
          {events.length > 0 ? (
            <DataGrid
              rows={events}
              columns={columns}
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
          ) : (
            <NotFoundData title="Agrega algun evento :)" mt={2} withOutBack />
          )}
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button text="Cancelar" variant="navigation" type="button" />
            <Button text="Aceptar" variant="primary" type="submit" isLoading={isLoading} disabled={!isValid} />
          </Stack>
        </Grid>
      </Grid>

      <RenderFormModal
        title="Agregar evento"
        isOpen={showAddEventModal}
        sx={{ maxWidth: "400px", width: "400px" }}
        setIsOpen={setShowAddEventModal}
      >
        <AddHookEventForm onClose={() => setShowAddEventModal(!showAddEventModal)} />
      </RenderFormModal>
    </Wrapper>
  );
}
