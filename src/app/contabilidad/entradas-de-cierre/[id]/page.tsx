"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography } from "@mui/material";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal/ConfirmDeleteModal";
import { deleteGlClosure, getGlClosureById, updateGlClosure } from "@/services/Accounting.service";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatDateEsddMMMMyyyy } from "@/utilities/common.utility";
import Input from "@/components/Input";
import { toast } from "sonner";

export default function CloseEntrieDetails({ params }: { params: { id: string } }) {
  const [comments, setComments] = React.useState<string>("");
  const [closureData, setClosureData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingUpdating, setIsLoadingUpdating] = React.useState<boolean>(false);
  const router = useRouter();

  async function getClosureInfo() {
    const response = await getGlClosureById(params.id);
    if (response?.status) {
      setClosureData(response?.data);
    }
  }

  async function handleUpdateEntrie() {
    setIsLoadingUpdating(true);
    const response = await updateGlClosure({ comments }, params?.id);
    if (response?.status === 200) {
      getClosureInfo();
      toast.success("Entrada actualizada con exito");
    }
    setIsLoadingUpdating(false);
  }

  const handleDeleteEntrie = async () => {
    try {
      const response = await deleteGlClosure(params?.id);
      if (response.status === 200) {
        router.push("/contabilidad/entradas-de-cierre");
        toast.success("Entrada eliminada correctamente.");
      } else {
        console.error("Error al eliminar la entrada:", response);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getClosureInfo();
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        items={[
          { title: "Inicio", href: "/auth/login" },
          { title: "Contabiliad", href: "/contabilidad" },
          { title: "Entradas de cierre", href: "/contabilidad/entradas-de-cierre" },
          { title: closureData?.id },
        ]}
      />
      <Stack>
        <Stack sx={{ mt: 5 }}>
          <Typography variant="h4" color="#12141a">
            {closureData?.officeName}
          </Typography>
          <Typography variant="body1" fontWeight="300" color="#606778">
            Los detalles de esta entrada de cierre se encuentran debajo.
          </Typography>
        </Stack>

        <Stack sx={{ mt: 5, minWidth: "600px", maxWidth: "600px" }}>
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #cccccc80",
                pb: 2,
              }}
            >
              <Typography variant="body2" fontWeight="400" color="#12141a">
                Detalles de la entrada de cierre
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Typography variant="body2" fontWeight="300" color="#606778">
                Fecha de cierre
              </Typography>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {formatDateEsddMMMMyyyy(closureData?.closingDate)}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2" fontWeight="300" color="#606778">
                Cerrado por
              </Typography>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {closureData?.createdByUsername}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2" fontWeight="300" color="#606778">
                Actualizado por
              </Typography>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {closureData?.lastUpdatedByUsername}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2" fontWeight="300" color="#606778">
                Fecha de actualización
              </Typography>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {formatDateEsddMMMMyyyy(closureData?.lastUpdatedDate)}
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                maxWidth: "100%",
              }}
            >
              <Typography variant="body2" fontWeight="300" color="#606778">
                Comentarios
              </Typography>
              <Typography variant="body2" fontWeight="400" color="#12141a" maxWidth="30ch" textAlign="start">
                {closureData?.comments}
              </Typography>
            </Stack>

            {/* Editar entrada */}
            <Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #cccccc80",
                  pb: 2,
                  mt: 5,
                }}
              >
                <Typography variant="body2" fontWeight="400" color="#12141a">
                  Editar comentario
                </Typography>
              </Stack>

              {/* Form */}
              <Stack sx={{ mt: 3 }}>
                <Input
                  label="Comentarios"
                  type="text"
                  value={comments}
                  onChange={e => {
                    setComments(e.target.value);
                  }}
                  defaultValue={closureData?.comments}
                />
                <Stack sx={{ mt: 3, display: "block" }}>
                  <Button
                    onClick={() => handleUpdateEntrie()}
                    variant="primary"
                    text="Guardar cambios"
                    size="small"
                    type="button"
                    isLoading={isLoadingUpdating}
                    disabled={!comments}
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
                  mt: 5,
                }}
              >
                <Typography variant="body2" fontWeight="400" color="#12141a">
                  Eliminar entrada
                </Typography>
                <ConfirmDeleteModal
                  title="¿Estás seguro de que deseas eliminar esta entrada?"
                  actionCallback={handleDeleteEntrie}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}
