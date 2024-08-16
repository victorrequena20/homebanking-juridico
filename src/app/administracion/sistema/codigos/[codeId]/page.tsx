"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import Button from "@/components/Button";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";
import ChangeUserPasswordForm from "@/modules/administracion/usuarios/components/ChangeUserPasswordForm";
import { getUserById } from "@/services/Users.service";
import { User } from "@/types/User.types";
import CreateEditUserForm from "@/modules/administracion/usuarios/components/CreateEditUserForm";

import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal/ConfirmDeleteModal";
import { deleteUser } from "@/services/Users.service";
import Link from "next/link";
import { toast } from "sonner";
import { deleteCode, deleteValueCode, getCodeById, getCodeValuesById, updateCode } from "@/services/Core.service";
import Breadcrumbs from "@/components/Breadcrumbs";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@/assets/icons/Checkicon";
import PlusIcon from "@/assets/icons/PlusIcon";
import EditCodeValueModal from "@/modules/administracion/sistema/components/EditCodeValueModal/EditCodeValueModal";
import TrashIcon from "@/assets/icons/TrashIcon";
import EditIcon from "@/assets/icons/EditIcon";

export const schema = yup.object().shape({
  keyName: yup.string().required("El nombre clave es requerido"),
});

export default function CodeDetails({ params }: { params: { codeId: string } }) {
  const [codeData, setCodeData] = React.useState<any | null>(null);
  const [codeValues, setCodeValues] = React.useState<any | null>([]);
  const [showEditCodeValueModal, setShowEditCodeValueModal] = React.useState<boolean>(false);
  const [showAddCodeValueModal, setShowAddCodeValueModal] = React.useState<boolean>(false);
  const [editCodeValueSelected, setEditCodeValueSelected] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingUpdating, setIsLoadingUpdating] = React.useState<boolean>(false);
  const [isActiveUser, setIsActiveUser] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<{ keyName: string }>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function handleGetCodeValues() {
    const responseCodeValues = await getCodeValuesById(params.codeId);
    if (responseCodeValues?.status === 200) {
      setCodeValues(responseCodeValues?.data);
    }
  }

  const handleDeleteValueCode = async (valueCodeId: string) => {
    try {
      const response = await deleteValueCode(params?.codeId, valueCodeId);
      if (response.status === 200) {
        toast.success("Valor de código eliminado correctamente.");
        handleGetCodeValues();
      } else {
        console.error("Error al eliminar el valor de código:", response);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  const columns: GridColDef<(typeof codeValues)[number]>[] = [
    {
      field: "name",
      headerName: "Nombre clave",
      flex: 1,
      valueGetter: (_, row) => `${row.name || ""}`,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      valueGetter: (_, row) => `${row.description || ""}`,
    },
    {
      field: "position",
      headerName: "Posición",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
      renderCell: params => (
        <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
          <Box
            sx={{
              bgcolor: params?.row?.active ? "#0B845C" : "#EA3647",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            {params?.row?.active ? <CheckIcon size={13} /> : null}
          </Box>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: params => (
        <Stack sx={{ alignItems: "center", gap: 2, flexDirection: "row", height: "100%" }}>
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
                setShowEditCodeValueModal(true);
                setEditCodeValueSelected(params?.row);
              }}
            >
              <EditIcon color="#fff" size={20} />
            </Box>
          </Tooltip>
          <ConfirmDeleteModal
            buttonType="action"
            title="¿Estás seguro de que deseas eliminar este valor de código?"
            actionCallback={() => handleDeleteValueCode(params?.row?.id)}
          />
        </Stack>
      ),
    },
  ];

  const handleDeleteCode = async () => {
    try {
      const response = await deleteCode(params?.codeId);
      if (response.status === 200) {
        router.push("/administracion/sistema/codigos");
        toast.success("Código eliminado correctamente.");
      } else {
        console.error("Error al eliminar el código:", response);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoadingUpdating(true);
    const response = await updateCode({ name: data?.keyName }, params?.codeId);
    if (response?.status === 200) {
      reset({ keyName: "" });
      setValue("keyName", "");
      toast.success("Código actualizado con exito.");
    }
    console.log("🚀 ~ onSubmit ~ response:", response);
    setIsLoadingUpdating(false);
  };

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getCodeById(params.codeId);
      if (response?.status === 200) {
        setCodeData(response?.data);
        setIsActiveUser(response?.data?.isSelfServiceUser);
      }
      setIsLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    handleGetCodeValues();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        items={[
          { title: "Inicio", href: "/auth/login" },
          { title: "Administración" },
          { title: "Códigos", href: "/administracion/sistema/codigos" },
          { title: codeData?.name },
        ]}
      />

      <Stack>
        <Stack sx={{ mt: 5 }}>
          <Typography variant="h4" color="#12141a">
            {codeData?.name}
          </Typography>
        </Stack>

        <Stack sx={{ mt: 5, minWidth: "800px", maxWidth: "800px" }}>
          {/* Valores de código */}
          <Stack
            sx={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #cccccc80",
              pb: 1,
              mt: 3,
            }}
          >
            <Typography variant="body2" fontWeight="400" color="#12141a">
              Valores de código
            </Typography>
            <Button
              variant="primary"
              text="Agregar valor de código"
              size="small"
              icon={<PlusIcon color="#fff" size={20} />}
              iconLeft
              onClick={() => setShowAddCodeValueModal(true)}
            />
          </Stack>
          <Stack sx={{ mt: 5 }}>
            <DataGrid
              sx={{ borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}
              rows={codeValues}
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
          </Stack>
          <Stack>
            {/* Editar codigo */}
            <Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #cccccc80",
                  pb: 1,
                  mt: 3,
                }}
              >
                <Typography variant="body2" fontWeight="400" color="#12141a">
                  Editar código
                </Typography>
              </Stack>

              {/* Form */}
              <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Stack>
                  <Controller
                    control={control}
                    name="keyName"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label="Nombre clave*"
                        type="text"
                        onChange={onChange}
                        value={value}
                        defaultValue={codeData?.name}
                        isValidField={!errors.keyName}
                        hint={errors.keyName?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ flexDirection: "row", gap: 3, mt: 3 }}>
                  <Button
                    size="small"
                    text="Guardar cambios"
                    variant="primary"
                    type="submit"
                    disabled={!isValid}
                    isLoading={isLoadingUpdating}
                  />
                </Stack>
              </Stack>
            </Stack>

            {/* Activación / desactivación */}
            <Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #cccccc80",
                  pb: 2,
                  mt: 10,
                }}
              >
                <Typography variant="body2" fontWeight="400" color="#12141a">
                  Eliminar código
                </Typography>
                <ConfirmDeleteModal
                  title="¿Estás seguro de que deseas eliminar este código?"
                  actionCallback={handleDeleteCode}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <EditCodeValueModal
        callback={handleGetCodeValues}
        codeValue={editCodeValueSelected}
        isOpen={showEditCodeValueModal}
        codeId={params?.codeId}
        setIsOpen={setShowEditCodeValueModal}
      />
      <EditCodeValueModal
        callback={handleGetCodeValues}
        isOpen={showAddCodeValueModal}
        codeId={params?.codeId}
        setIsOpen={setShowAddCodeValueModal}
      />
    </Wrapper>
  );
}
