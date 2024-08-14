import React, { useEffect, useRef } from "react";
import { Box, Stack, Typography, Checkbox } from "@mui/material";
import styles from "./InputSelectStyles.module.css";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import ArrowUpIcon from "@/assets/icons/ArrowUpIcon";
import { IKeyValue } from "@/types/common";

interface IInputSelectProps {
  label: string;
  placeholder?: string;
  isValidField?: boolean;
  hint?: string;
  onChange?: (value: string | number | (string | number)[]) => void;
  setItem: (value: IKeyValue) => void;
  options: IKeyValue[];
  withCheckbox?: boolean;
  defaultValue?: string | number | (string | number)[];
}

export default function InputSelect({
  label,
  placeholder,
  isValidField = true,
  hint,
  onChange,
  options,
  withCheckbox = false,
  defaultValue,
  setItem,
}: IInputSelectProps) {
  const [valueSelected, setValueSelected] = React.useState<IKeyValue | null>({ label: "", value: "" });
  const [selectedValues, setSelectedValues] = React.useState<(string | number | undefined)[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue && !withCheckbox) {
      const optionDefault = options.find(option => option.value === defaultValue);
      setValueSelected(optionDefault || { label: "", value: "" });
      return;
    }

    if (defaultValue && withCheckbox) {
      if (Array.isArray(defaultValue)) {
        const selectedOptions = options.map(option => {
          if (defaultValue.includes(option.value)) {
            return option?.value;
          }
        });
        setSelectedValues(selectedOptions);
      }
    }
  }, [defaultValue, options]);

  useEffect(() => {
    console.log("o");
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (item: IKeyValue) => {
    setSelectedValues(prevValues => {
      if (prevValues.includes(item.value)) {
        return prevValues.filter(value => value !== item.value);
      } else {
        return [...prevValues, item.value];
      }
    });
  };

  //   useEffect(() => {
  //     if (onChange) {
  //       onChange(withCheckbox ? selectedValues : valueSelected?.value);
  //     }
  //   }, [selectedValues, valueSelected, withCheckbox]);

  const getSelectedLabels = () => {
    return options
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label)
      .join(", ");
  };

  return (
    <Box sx={{ maxWidth: "392px", position: "relative" }} ref={selectRef}>
      <Typography variant="body2" color="#606778">
        {label}
      </Typography>
      <div
        className={`${styles.container} ${isOpen && styles.focusedInput} ${!isValidField && styles.inputError}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          placeholder={placeholder}
          className={styles.input}
          value={
            withCheckbox
              ? selectedValues.length > 0
                ? getSelectedLabels()
                : "Seleccione opciones"
              : valueSelected?.label || "Seleccione una opción"
          }
          readOnly
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {isOpen ? <ArrowUpIcon size={20} color="#484848" /> : <ArrowDownIcon size={20} color="#484848" />}
        </Box>
      </div>

      {hint && (
        <Typography variant="caption" color={isValidField ? "#606778" : "#ea3647"}>
          {hint}
        </Typography>
      )}

      {isOpen && (
        <Stack
          sx={{
            minWidth: "392px",
            maxWidth: "392px",
            backgroundColor: "#fff",
            maxHeight: "320px",
            borderRadius: "16px",
            position: "absolute",
            top: "76px",
            left: 0,
            right: 0,
            zIndex: 1,
            boxShadow: "0px 12px 16px -4px #10182814",
            border: "1px solid #E4E7EC",
            p: 1,
            px: 1,
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          <Stack sx={{ rowGap: 1 }}>
            {options.map(item => (
              <Box
                key={item.value}
                sx={{
                  padding: 1,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  "&:hover": {
                    filter: "brightness(0.95)",
                  },
                  display: "flex",
                  alignItems: "center",
                  columnGap: 1.5,
                }}
                onClick={() => {
                  if (!withCheckbox) {
                    setItem && setItem(item);
                    setValueSelected(item);
                    setIsOpen(false);
                  }
                }}
              >
                {withCheckbox && (
                  <Checkbox
                    checked={selectedValues.includes(item.value)}
                    onChange={() => handleCheckboxChange(item)}
                    onClick={e => e.stopPropagation()}
                    sx={{ width: "24px", height: "24px" }}
                  />
                )}
                <Typography variant="body2" fontWeight="300">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
