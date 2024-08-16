"use client";
import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Checkbox, Grid, FormControlLabel, ListItemButton, Stack } from "@mui/material";
import Wrapper from "@/components/Wrapper";
import { getPermissions, updatePermissions } from "@/services/Core.service";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import EditIcon from "@/assets/icons/EditIcon";
import { toast } from "sonner";

interface DataItem {
  grouping: string;
  code: string;
  entityName: string;
  actionName: string;
  selected: boolean;
}

const initialData: DataItem[] = [
  {
    grouping: "accounting",
    code: "CREATE_ACCOUNTINGRULE",
    entityName: "ACCOUNTINGRULE",
    actionName: "CREATE",
    selected: true,
  },
  {
    grouping: "finance",
    code: "APPROVE_TRANSACTION",
    entityName: "TRANSACTION",
    actionName: "APPROVE",
    selected: false,
  },
  // más objetos aquí
];

const MyComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUpdating, setIsLoadingUpdating] = React.useState<boolean>(false);
  const [data, setData] = useState<DataItem[]>(initialData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [oldData, setOldData] = useState<DataItem[]>(initialData);
  //   @ts-ignore
  const [selectedGrouping, setSelectedGrouping] = useState<string>([...new Set(data.map(item => item.grouping))][0]);

  async function handleGetPermissions() {
    setIsLoading(true);
    const response = await getPermissions({ makerCheckerable: true });
    if (response?.status === 200) {
      setData(response?.data);
      setOldData(response?.data);
    }
    setIsLoading(false);
  }

  const handleCheckboxChange = (code: string) => {
    if (isEditing) {
      setData(prevData => prevData.map(item => (item.code === code ? { ...item, selected: !item.selected } : item)));
    }
  };

  const handleSave = async () => {
    const permissions = data.reduce((acc, item) => {
      acc[item.code] = item.selected;
      return acc;
    }, {} as Record<string, boolean>);

    setIsLoadingUpdating(true);
    const response = await updatePermissions({ permissions });
    if (response?.status === 200) {
      toast.success("Permisos actualizados con éxito.");
    }
    setIsLoadingUpdating(false);
    setOldData([...data]);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setData([...oldData]);
    setIsEditing(false);
  };

  //   @ts-ignore
  const groupings = [...new Set(data.map(item => item.grouping))];
  const filteredItems = data.filter(item => item.grouping === selectedGrouping);

  useEffect(() => {
    handleGetPermissions();
  }, []);

  return (
    <Wrapper isLoading={isLoading}>
      <Breadcrumbs
        title="Configurar tareas de realizador aprobador"
        items={[
          { title: "Inicio", href: "/auth/login" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
        ]}
      />
      <Stack sx={{ alignItems: "flex-end", mt: 2 }}>
        {isEditing ? (
          <Stack sx={{ gap: 3, flexDirection: "row" }}>
            <Button text="Cancelar" variant="navigation" onClick={handleCancel} />
            <Button text="Guardar cambios" variant="primary" onClick={handleSave} isLoading={isLoadingUpdating} />
          </Stack>
        ) : (
          <Button text="Editar" iconLeft icon={<EditIcon color="#fff" size={20} />} onClick={handleEdit} />
        )}
      </Stack>
      <Grid container spacing={2} sx={{ mt: 3, bgcolor: "#F2F4F7", borderRadius: "8px" }}>
        <Grid item xs={4}>
          <List>
            {groupings.map(grouping => (
              <ListItem disablePadding key={grouping}>
                <ListItemButton
                  onClick={() => setSelectedGrouping(grouping)}
                  sx={{
                    borderRadius: "8px",
                    marginBottom: "8px",
                    backgroundColor: selectedGrouping === grouping ? "rgba(0, 0, 0, 0.08)" : "inherit", // Color de fondo si está seleccionado
                  }}
                >
                  <ListItemText primary={grouping} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <List>
            {filteredItems.map(item => (
              <ListItem key={item.code}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.selected}
                      onChange={() => handleCheckboxChange(item.code)}
                      disabled={!isEditing}
                    />
                  }
                  label={item.code}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default MyComponent;
