"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import CreateRoleForm from "@/modules/administracion/sistema/components/CreateRolForm/CreateRoleForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Grid, Stack } from "@mui/material";
import { toast } from "sonner";
import { getRoleById } from "@/services/Roles.service";
import { useParams } from "next/navigation";

export default function CreateFund() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [roleData, setRoleData] = React.useState<any>(null);
  const params = useParams();

  async function handleGetRoleById() {
    setIsLoading(true);
    const roleId = Number(params?.roleId);
    const response = await getRoleById(roleId.toString());
    if (response?.status === 200) {
      setRoleData({ ...response.data, id: roleId });
    } else {
      toast.error("Error al obtener datos del rol");
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetRoleById();
  }, []);

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear rol"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar roles y permisos", href: "/administracion/sistema/roles-permisos" },
          { title: "Crear rol" },
        ]}
      />
      <Stack sx={{ mt: 3 }}>
        <ButtonBack />
      </Stack>
      <Grid sx={{ alignItems: "center" }}>
        <CreateRoleForm roleData={roleData} />
      </Grid>
    </Wrapper>
  );
}
