import React, { useContext } from "react";
import { ClientFamilyMembersProps } from "./ClientFamilyMembersProps";
import { Stack, Typography } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import RenderFormModal from "@/components/Modals/RenderFormModal";
import AddFamilyMembersForm from "../AddFamilyMembersForm";
import { CreateClientContext } from "../../context/CreateClient/CreateClient.context";
import FamilyMemberDetails from "../FamilyMemberDetails";
import { getFamilyMembers } from "@/services/Clients.service";
import { useParams } from "next/navigation";
import NotFoundData from "@/components/NotFoundData";

export default function ClientFamilyMembers({ formAction, mode = "create" }: ClientFamilyMembersProps) {
  const [currentFamilyMembers, setCurrentFamilyMembers] = React.useState<any>([]);
  const { clientFamilyMembers } = useContext(CreateClientContext);
  const [open, setOpen] = React.useState<boolean>(false);
  const params = useParams();
  console.log("🚀 ~ ClientFamilyMembers ~ params:", params);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getCurrentFamilyMembers() {
    if (!params.clientId) return;
    const response = await getFamilyMembers(params.clientId.toString());
    if (response?.status === 200) {
      setCurrentFamilyMembers(response.data);
    }
    console.log("🚀 ~ getCurrentFamilyMembers ~ response:", response);
  }

  React.useEffect(() => {
    if (mode === "show") {
      getCurrentFamilyMembers();
    }
  }, []);

  return (
    <>
      {currentFamilyMembers.length < 1 && clientFamilyMembers?.length < 1 ? (
        <NotFoundData
          title="No hay miembros de la familia"
          withOutBack
          mt={mode === "create" ? 12 : 32}
          action={{
            title: "Agregar miembro familiar",
            onClick: handleClickOpen,
          }}
        />
      ) : (
        <Stack
          sx={{
            bgcolor: "var(--secondaryBg)",
            px: 2,
            py: 4,
            borderRadius: "8px",
            boxShadow: "0px 12px 16px -4px #10182814",
          }}
        >
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2">Miembros de la familia</Typography>
            <Button text="Agregar" iconLeft icon={<PlusIcon size={20} color="#fff" />} onClick={handleClickOpen} />
          </Stack>

          {mode === "show" ? (
            <>
              {currentFamilyMembers?.map((el: any) => (
                <FamilyMemberDetails key={el?.id} data={el} />
              ))}
            </>
          ) : (
            <>
              {clientFamilyMembers?.map((el: any, index: any) => (
                <FamilyMemberDetails key={index} data={el} />
              ))}
            </>
          )}
        </Stack>
      )}
      <RenderFormModal title="Agregar miembro de familia" isOpen={open} setIsOpen={setOpen}>
        <AddFamilyMembersForm onClose={handleClose} mode="create" />
      </RenderFormModal>
    </>
  );
}
