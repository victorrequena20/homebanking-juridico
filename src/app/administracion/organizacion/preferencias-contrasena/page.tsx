"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Toggle from "@/components/Toggle";
import { getPasswordPreferences, updatePasswordPreferences } from "@/services/Core.service";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PreferenciasContrasenaPage() {
  const [password1, setPassword1] = useState(false);
  const [password2, setPassword2] = useState(false);
  const [passwordPreferences, setPasswordPreferences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getPasswordPreferences();
      response?.data?.forEach((el: any) => {
        if (el?.active) {
          if (el?.id === 1) {
            setPassword1(true);
          }
          if (el?.id === 2) {
            setPassword2(true);
          }
        }
      });
      if (response?.status === 200) {
        setPasswordPreferences(response?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  const handlePassword1Toggle = () => {
    setPassword1(prev => !prev);
    setPassword2(false);
  };

  const handlePassword2Toggle = () => {
    setPassword2(prev => !prev);
    setPassword1(false);
  };

  const changePasswordPreferences = async () => {
    setIsLoadingForm(true);
    const response = await updatePasswordPreferences({
      validationPolicyId: password1 ? 1 : 2,
    });
    if (response?.status === 200) {
      toast.success("Operacion realizada con exito!");
      //   router.push("/administracion/organizacion");
    }
    setIsLoadingForm(false);
  };

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Preferencias de contraseña"
        items={[
          {
            title: "Inicio",
            href: "/dashboard",
          },
          { title: "Administración" },
          { title: "Organización", href: "/administracion/organizacion" },
          { title: "Preferencias de contraseña" },
        ]}
      />

      <Stack component="form" sx={{ mt: 5, gap: 3, maxWidth: "700px" }}>
        <Stack sx={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <Typography variant="body2" color="#484848">
            {passwordPreferences[0]?.description}
          </Typography>
          <Toggle isChecked={password1} size="small" setIsChecked={handlePassword1Toggle} />
        </Stack>
        <Stack sx={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <Typography variant="body2" color="#484848">
            {passwordPreferences[1]?.description}
          </Typography>
          <Toggle isChecked={password2} size="small" setIsChecked={handlePassword2Toggle} />
        </Stack>

        <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "flex-start" }}>
          <Button
            text="cancelar"
            variant="navigation"
            onClick={() => router.push("/administracion/organizacion")}
            size="small"
            type="button"
          />
          <Button
            text="Aceptar"
            variant="primary"
            size="small"
            isLoading={isLoadingForm}
            type="button"
            onClick={() => changePasswordPreferences()}
          />
        </Stack>
      </Stack>
    </Wrapper>
  );
}
