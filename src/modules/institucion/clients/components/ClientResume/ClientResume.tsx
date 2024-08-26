"use client";
import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { detailRowStyles, detailRowWithAction, flexRowCenter } from "@/styles/GlobalsMUI";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { useCreateClientContext } from "../../context/CreateClient/CreateClient.provider";
import { useRouter } from "next/navigation";
import { createClient } from "@/services/Clients.service";
import { toast } from "sonner";
import Button from "@/components/Button";
import { createClientFormAdapter } from "@/adapters/clients/createClientForm.adapter";

export default function ClientResume() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { formMethods, setStep, clientFamilyMembers } = useCreateClientContext();
  const clientGeneralData = formMethods.watch();
  const router = useRouter();

  async function onSubmit() {
    setIsLoading(true);
    const response = await createClient(
      createClientFormAdapter({
        ...formMethods.watch(),
        familyMembers: clientFamilyMembers.map((member: any) => {
          return {
            ...member,
            relationshipId: member.relationshipId?.value,
            genderId: member.genderId?.value,
            professionId: member.professionId?.value,
            maritalStatusId: member.maritalStatusId?.value,
          };
        }),
      })
    );
    console.log("🚀 ~ onSubmit ~ response:", response);
    if (response?.status === 200) {
      toast.success("Cliente creado correctamente.");
      router.push("/institucion/clientes");
      setIsLoading(false);
    } else {
      toast.error("Ocurrió un error al crear el cliente.");
      setIsLoading(false);
    }
  }

  // const router = useRouter();
  return (
    <Stack sx={{ width: "100%", maxWidth: "800px", mx: "auto", pb: 10 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" fontWeight="600">
        Resumen
      </Typography>
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          General
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(1)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Nombre
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.firstname || ""} ${clientGeneralData?.middlename || ""} ${
            clientGeneralData?.lastname || ""
          }`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Oficina
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.officeId?.label || ""}`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Forma juridica
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.legalFormId?.label || ""}`}
        </Typography>
      </Stack>
      {/* Asesor */}
      {clientGeneralData?.staffId && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Asesor
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.staffId?.label || ""}`}
          </Typography>
        </Stack>
      )}
      {/* Fecha de nacimiento */}
      {clientGeneralData?.staffId && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Fecha de nacimiento
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.dateOfBirth || ""}`}
          </Typography>
        </Stack>
      )}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          ID externo
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.externalId || ""}`}
        </Typography>
      </Stack>
      {/* Numero de telefono movil */}
      {clientGeneralData?.mobileNo && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Número de teléfono móvil
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.mobileNo || ""}`}
          </Typography>
        </Stack>
      )}
      {/* email */}
      {clientGeneralData?.emailAddress && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Correo electrónico
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.emailAddress || ""}`}
          </Typography>
        </Stack>
      )}
      {/* Producto de ahorro */}
      {clientGeneralData?.savingsProductId && (
        <Stack sx={detailRowStyles}>
          <Typography variant="body2" fontWeight="300" color="#606778">
            Producto de ahorro
          </Typography>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${clientGeneralData?.savingsProductId?.label || ""}`}
          </Typography>
        </Stack>
      )}
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Registrado el día
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${"Hoy" || ""}`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Activo?
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.active ? "Si" : "No" || ""}`}
        </Typography>
      </Stack>
      <Stack sx={detailRowStyles}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Es Staff?
        </Typography>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          {`${clientGeneralData?.isStaff ? "Si" : "No" || ""}`}
        </Typography>
      </Stack>

      {/* Miembros de la familia */}
      <Stack sx={detailRowWithAction}>
        <Typography variant="body2" fontWeight="400" color="#12141a">
          Miembros de la familia
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }} onClick={() => setStep?.(2)}>
          <Typography sx={{ cursor: "pointer" }} variant="body2" fontWeight="300" color="#606778">
            Ver y editar
          </Typography>
          <ArrowRightIcon size={16} color="var(--secondaryText)" />
        </Box>
      </Stack>

      <Stack sx={{ flexDirection: "row", justifyContent: "center", gap: 3, mt: 3 }}>
        <Button
          size="small"
          text="Cancelar"
          variant="navigation"
          type="button"
          onClick={() => router.push("/administracion/productos/comisiones")}
        />
        <Button
          size="small"
          text="Aceptar"
          variant="primary"
          type="submit"
          onClick={onSubmit}
          disabled={!formMethods?.formState?.isValid}
          isLoading={isLoading}
        />
      </Stack>
    </Stack>
  );
}
