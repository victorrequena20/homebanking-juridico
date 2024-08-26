import React from "react";
import { Box, Stack } from "@mui/material";
import CardInfoItem from "./CardInfoItem";
import PeopleIcon from "@/assets/icons/PeopleIcon";
import PersonHexagonalIcon from "@/assets/icons/PersonHexagonalIcon";
import WalletAddIcon from "@/assets/icons/WalletAddIcon";
import { getClients } from "@/services/Clients.service";
import { getUsers } from "@/services/Users.service";
import { getLoans } from "@/services/Loans.service";

export default function CardInfoList({ clients }: { clients?: any[] }) {
  const [clientsQuantity, setClientsQuantity] = React.useState(0);
  const [usersQuantity, setUsersQuantity] = React.useState(0);
  const [loansQuantity, setLoansQuantity] = React.useState(0);

  async function handleGetUsers() {
    const response = await getUsers();
    if (response?.status === 200) {
      setUsersQuantity(response?.data?.length);
    }
  }

  async function handleGetLoans() {
    const response = await getLoans();
    if (response?.status === 200) {
      setLoansQuantity(response?.data?.pageItems?.length);
    }
  }

  React.useEffect(() => {
    handleGetUsers();
    handleGetLoans();
  }, []);

  React.useEffect(() => {
    setClientsQuantity(clients?.length || 0);
  }, [clients]);

  return (
    <Box sx={{ mt: 4, width: "auto", display: "flex", maxWidth: "1050px" }}>
      <Stack sx={{ width: "100%", flexDirection: "column", columnGap: 3 }}>
        <Stack sx={{ width: "100%", flexDirection: "row", gap: 3 }}>
          <CardInfoItem
            title="Total de clientes"
            value={clientsQuantity?.toString()}
            icon={<PeopleIcon size={26} color="#12141a" />}
          />

          <CardInfoItem
            title="Total de usuarios"
            value={usersQuantity?.toString()}
            icon={<PersonHexagonalIcon strokeWidth="1.5" size={28} color="#12141a" />}
          />

          <CardInfoItem
            title="Créditos otorgados"
            value={loansQuantity.toString()}
            icon={<WalletAddIcon size={28} color="#12141a" />}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
