import React from "react";
import { detailRowStyles, flexRowCenter } from "@/styles/GlobalsMUI";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import ArrowUpIcon from "@/assets/icons/ArrowUpIcon";

export default function FamilyMemberDetails({ data }: { data: any }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <Stack sx={{ mt: 4, borderBottom: "1px solid #ccc", pb: 3 }} onClick={() => setIsOpen(!isOpen)}>
      <Stack sx={{ ...detailRowStyles, cursor: "pointer" }}>
        <Typography variant="body2" fontWeight="300" color="#606778">
          Miembro familiar
        </Typography>
        <Box sx={{ ...flexRowCenter, gap: 1 }}>
          <Typography variant="body2" fontWeight="400" color="#12141a">
            {`${data?.firstName || ""} ${data?.middleName || ""} ${data?.lastName || ""}`}
          </Typography>
          {isOpen ? <ArrowDownIcon color="var(--text)" size={16} /> : <ArrowUpIcon color="var(--text)" size={16} />}
        </Box>
      </Stack>
      {isOpen && (
        <Stack>
          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Nombre
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.firstName}
              </Typography>
            </Box>
          </Stack>
          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Segundo nombre
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.middleName}
              </Typography>
            </Box>
          </Stack>

          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Apellido
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.lastName}
              </Typography>
            </Box>
          </Stack>
          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Calificación
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.qualificationId}
              </Typography>
            </Box>
          </Stack>
          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Relación
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.relationshipId?.label}
              </Typography>
            </Box>
          </Stack>

          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Edad
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.age}
              </Typography>
            </Box>
          </Stack>

          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Es dependiente
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                No
              </Typography>
            </Box>
          </Stack>

          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Estado civil
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.maritalStatusId?.label}
              </Typography>
            </Box>
          </Stack>

          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Género
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.genderId?.label}
              </Typography>
            </Box>
          </Stack>

          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Profesión
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.professionId?.label}
              </Typography>
            </Box>
          </Stack>

          <Stack sx={detailRowStyles}>
            <Typography variant="body2" fontWeight="300" color="#606778">
              Fecha de nacimiento
            </Typography>
            <Box sx={{ ...flexRowCenter, gap: 1 }}>
              <Typography variant="body2" fontWeight="400" color="#12141a">
                {data?.dateOfBirth}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
