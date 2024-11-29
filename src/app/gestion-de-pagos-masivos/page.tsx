"use client";
import React, { useRef } from "react";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box, Stack, Typography, Button as Button2 } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from "@/components/Button";
import { toast } from "sonner";
import InputSelect from "@/components/InputSelect";
import Input from "@/components/Input";
import InputResponsiveContainer from "@/components/InputResponsiveContainer/InputResponsiveContainer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { pagos_masivos, reports } from "@/constants/global";
import { formatAmountB } from "@/utilities/amount.utility";
import ReportIcon from "@/assets/icons/ReportIcon";

interface IStep {
  level: number;
  role: string;
}

interface IForm {
  name: string;
  type: string;
  category: string;
  steps: IStep[];
  status: string;
}

const schema = yup.object().shape({
  name: yup.string().required("El nombre del flujo es requerido"),
  type: yup.string().required("El tipo es requerido"),
  category: yup.string().required("La categoría es requerida"),
  steps: yup
    .array()
    .of(
      yup.object().shape({
        level: yup.number().required("El nivel es requerido").min(1, "El nivel debe ser mayor a 0"),
        role: yup.string().required("El rol es requerido"),
      })
    )
    .min(1, "Debe haber al menos un paso"),
  status: yup.string().required("El estado es requerido"),
});

export default function ApprovalFlowForm() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IForm>({
    defaultValues: {
      name: "",
      type: "",
      category: "",
      steps: [{ level: 1, role: "" }],
      status: "Activo",
    },
    mode: "onChange",
  });
  const [audits, setAudits] = React.useState<any[]>(pagos_masivos);
  const [totalRows, setTotalRows] = React.useState<number>(10);
  const [isLoading, setIsLoading] = React.useState(false);
  const columns: GridColDef<(typeof audits)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      valueGetter: (_, row) => `${row.id || ""}`,
    },
    {
      field: "quantiyTransfer",
      headerName: "Cantidad de Transacciones",
      flex: 1,
      valueGetter: (_, row) => `${row.quantiyTransfer || ""} `,
    },
    {
      field: "nomimaTotal",
      headerName: "Nómina tota",
      flex: 1,
      valueGetter: (_, row) => `${formatAmountB(row.nomimaTotal * 100) || ""} `,
    },
    {
      field: "totalPay",
      headerName: "Total de pagados",
      flex: 1,
      valueGetter: (_, row) => `${row?.totalPay} `,
    },

    {
      field: "fecha",
      headerName: "Fecha de pago",
      flex: 1,
      valueGetter: (_, row) => `${row?.fecha || ""} `,
    },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = async (data: IForm) => {
    console.log("Datos enviados:", data);
    // Aquí puedes llamar a tu API para enviar los datos
    reset();
  };

  const [fileName, setFileName] = React.useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      console.log("Archivo seleccionado:", file.name);

      // Configurar el timeout para la alerta
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success("¡Los pagos se realizaron con éxito!");
      }, 4000); // 4000ms = 4 segundos
    }
  };

  const handleButtonClick = () => {
    fileInputRef?.current?.click(); // Simula un clic en el input
  };

  return (
    <>
      <Wrapper isLoading={isLoading}>
        <Breadcrumbs
          title="Gestión de pagos masivos"
          items={[
            { title: "Inicio", href: "/auth/login" },
            { title: "Administración" },
            { title: "Flujos de Aprobación", href: "/administracion/flujos" },
            { title: "Crear Flujo" },
          ]}
        />
        <Stack sx={{ mt: 3 }}>
          <Grid
            container
            component="form"
            md={12}
            sx={{
              gap: 3,
              maxWidth: "1000px",
              backgroundColor: "#fff",
              px: 3,
              py: 6,
              borderRadius: "16px",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Nombre del flujo */}
            <InputResponsiveContainer>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Button
                  icon={<ReportIcon size={20} color="#fff" />}
                  size="small"
                  variant="primary"
                  text=" Subir archivo para realizar pagos masivos"
                  iconLeft
                  onClick={() => {
                    handleButtonClick();
                  }}
                />

                <input type="file" accept=".xls,.xlsx" ref={fileInputRef} hidden onChange={handleFileChange} />
              </Box>
            </InputResponsiveContainer>
          </Grid>
        </Stack>
        <Stack sx={{ mt: 3 }}>
          <DataGrid
            rows={audits}
            columns={columns}
            paginationMode="server"
            rowCount={totalRows}
            // paginationModel={{ page, pageSize }}
            // onPaginationModelChange={handlePaginationChange}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            rowSelection
          />
        </Stack>
      </Wrapper>
      Loader
    </>
  );
}
