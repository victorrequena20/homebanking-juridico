import React from "react";
import { ClientFamilyMembersProps } from "./ClientFamilyMembersProps";
import { Stack, Typography } from "@mui/material";
import Button from "@/components/Button";
import PlusIcon from "@/assets/icons/PlusIcon";
import RenderFormModal from "@/components/Modals/RenderFormModal";
import AddFamilyMembersForm from "../AddFamilyMembersForm";
import { CreateClientContext } from "../../context/CreateClient/CreateClient.context";
import { detailRowStyles, flexRowCenter } from "@/styles/GlobalsMUI";
import { Box } from "@mui/material";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import FamilyMemberDetails from "../FamilyMemberDetails";

export default function ClientFamilyMembers({ formAction }: ClientFamilyMembersProps) {
  const { clientFamilyMembers } = React.useContext(CreateClientContext);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Stack sx={{ bgcolor: "var(--secondaryBg)", px: 2, py: 4, borderRadius: "8px" }}>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2">Miembros de la familia</Typography>
          <Button text="Agregar" iconLeft icon={<PlusIcon size={20} color="#fff" />} onClick={handleClickOpen} />
        </Stack>

        {clientFamilyMembers?.map((el: any) => (
          <FamilyMemberDetails data={el} />
        ))}
      </Stack>
      <RenderFormModal title="Agregar miembro de familia" isOpen={open} setIsOpen={setOpen}>
        <AddFamilyMembersForm onClose={handleClose} />
      </RenderFormModal>
    </>
  );
}
