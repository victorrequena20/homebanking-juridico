"use client";
import React from "react";
import { Box, Input, Stack, Typography } from "@mui/material";
import { getNotesById } from "@/services/AccountDetails.service";
import { formatDateEsddMMMMyyyy } from "@/utilities/common.utility";
import EditIcon from "@/assets/icons/EditIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import NoteIcon from "@/assets/icons/NoteIcon";
import { Controller, useForm } from "react-hook-form";

export default function Notes({ params }: { params: { accountId: string } }) {
  const [notes, setNotes] = React.useState<any>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  async function getNotes() {
    await getNotesById(params.accountId).then(response => {
      console.log("🚀 ~ getNotes", response.data);
      setNotes(response.data);
    });
  }

  React.useEffect(() => {
    getNotes();
  }, []);

  return (
    <Stack mt={4} mx={{ xs: 2, md: 6 }} mb={15}>
      <Stack sx={{ justifyContent: "center" }} mb={4}>
        <Typography variant="body1" color="var(--secondaryText)">
          Notas
        </Typography>
      </Stack>
      <Stack minWidth={300}>
        <Stack mb={4}>
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, value } }) => 
              <Input 
                type="text" 
                value={value} 
                onChange={onChange} 
                placeholder="Escribe una nota..." 
              />
            }
          />
        </Stack>
        {notes.map((note: any, index: number) => (
          <Box key={index} my={1} sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
              <NoteIcon color="#000000de" />
              <Typography variant="body2">{note?.note}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 10 }}>
              <Typography variant="body2">{note?.createdByUsername}</Typography>
              <Typography variant="body2">{formatDateEsddMMMMyyyy(note?.createdOn)}</Typography>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Stack>
                  <EditIcon color="#000" size={20} />
                </Stack>
                <Stack>
                  <TrashIcon color="#000" size={20} />
                </Stack>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
