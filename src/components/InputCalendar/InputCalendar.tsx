import React, { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import styles from "./InputCalendarStyeles.module.css";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import Calendar from "react-calendar";
import { formatDateEsddMMMMyyyy } from "@/utilities/common.utility";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface InputCalendarProps {
  label: string;
  placeholder?: string;
  isValidField?: boolean;
  hint?: string;
  onChange?: (date: string) => void;
  value?: string;
  defaultValue?: string;
  maxToday?: boolean; // Nueva propiedad
}

export default function InputCalendar({
  label,
  placeholder,
  isValidField = true,
  hint,
  onChange,
  value,
  defaultValue,
  maxToday = false, // Valor predeterminado
}: InputCalendarProps) {
  const [date, setDate] = React.useState<Value>(new Date());
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  // Ref para el componente
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierra el calendario cuando se hace clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  // Obtener la fecha de hoy
  const today = new Date();

  return (
    <Box sx={{ maxWidth: "392px" }} ref={containerRef}>
      <Typography variant="body2" color="#606778">
        {label}
      </Typography>

      <div className={`${styles.container} ${isOpen && styles.focusedInput} ${!isValidField && styles.inputError}`}>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled
          value={inputValue || value || ""}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setIsOpen(true)}
        >
          <CalendarIcon size={24} color="#484848" />
        </Box>
      </div>

      {hint && (
        <Typography variant="caption" color={isValidField ? "#606778" : "#ea3647"}>
          {hint}
        </Typography>
      )}

      {isOpen && (
        <Box sx={{ mt: 2 }}>
          <Calendar
            value={date}
            onChange={calendarProps => {
              const formattedDate = formatDateEsddMMMMyyyy(calendarProps);
              setDate(calendarProps);
              setInputValue(formattedDate);
              onChange && onChange(formattedDate);
              setIsOpen(false);
            }}
            maxDate={maxToday ? today : undefined} // Deshabilitar fechas futuras si maxToday es true
          />
        </Box>
      )}
    </Box>
  );
}
