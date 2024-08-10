"use client";

import styles from "../login/auth.module.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import axios from "axios";
import HttpClient from "@/utilities/HttpClient.utility";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Typography } from "@mui/material";
import Input from "@/components/Input";
import Image from "next/image";
import Button from "@/components/Button/Button";

const LoginForm = () => {
  // States
  const [username, setUsername] = useState("litecore");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  // Instances

  const handleLogin = async () => {
    try {
      const response = await HttpClient.post(`/authentication`, {
        username,
        password,
      });
      const token = response.data.base64EncodedAuthenticationKey;
      console.log("🚀 ~ handleLogin ~ token:", token);
      localStorage.setItem("fineractAuthToken", token);
      setError("");
    } catch (err) {
      setError("Clave o usuario invalido");
    }
  };

  React.useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className={styles.authContainer}>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "#FAFAFA",
          borderRadius: "32px",
          border: "8px solid hsl(0, 0%, 10%)",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "-10px",
          }}
        >
          <Image
            width={580}
            height={600}
            src="/assets/images/auth-login-img.png"
            alt="Image"
          />
        </Box>
        <Grid md={11} sx={{ px: 3, mx: "auto" }}>
          <Typography
            variant="h4"
            fontWeight="500"
            textAlign="start"
            color="#12141a"
          >
            Banco Digital de Caracas
          </Typography>
          <Typography
            variant="body2"
            fontWeight="300"
            color="#606778"
            maxWidth="40ch"
          >
            Más que un banco, somos tu aliado digital en cada paso de tu vida.
          </Typography>
          <Typography sx={{ mt: 1.5, cursor: "pointer" }} variant="body2">
            ¿Olvidaste tu contraseña?
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              rowGap: 3,
              maxWidth: "392px",
            }}
          >
            <Input label="Usuario" type="text" />
            <Input label="Contraseña" type="password" />
            <Button variant="primary" size="small" text="Entrar" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginForm;
