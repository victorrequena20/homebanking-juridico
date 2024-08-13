import React from "react";
import { InputProps } from "./InputProps";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./InputStyles.module.css";
import EyeIcon from "@/assets/icons/EyeIcon";
import EyeCloseIcon from "@/assets/icons/EyeCloseIcon";

export default function Input({
  label,
  type,
  placeholder,
  isValidField = true,
  hint,
  onChange,
  value,
  defaultValue,
}: InputProps) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(!(type === "password"));

  React.useEffect(() => {
    console.log("Hola");
    if (defaultValue) setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <Box sx={{ maxWidth: "392px" }}>
      <Typography variant="body2" color="#606778">
        {label}
      </Typography>
      <div className={`${styles.container} ${isFocused && styles.focusedInput} ${!isValidField && styles.inputError}`}>
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => {
            if (onChange) onChange(e);
            setInputValue(e?.target?.value || "");
          }}
          value={inputValue || value || ""}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeIcon size={24} />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeCloseIcon size={24} />
              </Box>
            )}
          </>
        )}
      </div>
      {hint && (
        <Typography variant="caption" color={isValidField ? "#606778" : "#ea3647"}>
          {hint}
        </Typography>
      )}
    </Box>
  );
}
