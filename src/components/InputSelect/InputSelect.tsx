"use client";
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
  hint?: string | any;
  onChange?: (value: string | number | (string | number)[]) => void;
  setItem?: (value: IKeyValue) => void;
  setItems?: (value: any[]) => void;
  options: IKeyValue[];
  withCheckbox?: boolean;
  multiple?: boolean;
  defaultValue?: string | number | (string | number)[] | null;
  value?: any;
  width?: string;
  disabled?: boolean;
}

export default function InputSelect({
  label,
  placeholder,
  isValidField = true,
  hint,
  onChange,
  options,
  multiple = false,
  defaultValue,
  setItem,
  setItems,
  value,
  width,
  disabled = false,
}: IInputSelectProps) {
  const [valueSelected, setValueSelected] = React.useState<IKeyValue | null>({ label: "", value: "" });
  const [selectedValues, setSelectedValues] = React.useState<(string | number | undefined)[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue && !multiple) {
      const optionDefault = options.find(option => option.value === defaultValue);
      setValueSelected(optionDefault || { label: "", value: "" });
      return;
    }

    if (defaultValue && multiple) {
      if (Array.isArray(defaultValue)) {
        const selectedOptions = options.map(option => {
          if (defaultValue.includes(option.value)) {
            return option?.value;
          }
        });
        setSelectedValues(selectedOptions);
      }
    }
  }, [defaultValue, options, multiple]);

  useEffect(() => {
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

  useEffect(() => {
    if (value && value.value !== valueSelected?.value) {
      setValueSelected(value);
    }
  }, [value]);

  useEffect(() => {
    if (multiple) {
      setItems && setItems(selectedValues);
    }
  }, [selectedValues]);

  const handleCheckboxChange = (item: IKeyValue) => {
    setSelectedValues(prevValues => {
      if (prevValues.includes(item.value)) {
        return prevValues.filter(value => value !== item.value);
      } else {
        return [...prevValues, item.value];
      }
    });
  };

  const getSelectedLabels = () => {
    return options
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label)
      .join(", ");
  };

  return (
    <Box sx={{ maxWidth: width || "392px", position: "relative", cursor: "pointer" }} ref={selectRef}>
      <Typography variant="caption" color="#606778" fontWeight="300">
        {label}
      </Typography>
      <Box
        className={`${styles.container} ${isOpen && styles.focusedInput} ${!isValidField && styles.inputError}`}
        sx={{ maxWidth: width || "392px", width: { xs: "100%", sm: "100%" } }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <input
          placeholder={placeholder}
          className={styles.input}
          value={
            multiple
              ? selectedValues.length > 0
                ? getSelectedLabels()
                : "Seleccione opciones"
              : value?.label || valueSelected?.label || "Seleccione una opción"
          }
          style={{ color: disabled ? "#12141a77" : value?.label || valueSelected?.label ? "#12141a" : "#606778" }}
          readOnly
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            mr: 2,
          }}
        >
          {isOpen ? <ArrowUpIcon size={20} color="#484848" /> : <ArrowDownIcon size={20} color="#484848" />}
        </Box>
      </Box>

      {hint && (
        <Typography variant="caption" color={isValidField ? "#606778" : "#ea3647"}>
          {hint}
        </Typography>
      )}

      {isOpen && (
        <Stack
          sx={{
            minWidth: width || "392px",
            maxWidth: width || "392px",
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
            {options?.map(item => (
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
                  if (!multiple) {
                    setItem && setItem(item);
                    setValueSelected(item);
                    setIsOpen(false);
                  }
                }}
              >
                {multiple && (
                  <Checkbox
                    checked={selectedValues.includes(item.value)}
                    onChange={() => handleCheckboxChange(item)}
                    onClick={e => {
                      e.stopPropagation();
                    }}
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
