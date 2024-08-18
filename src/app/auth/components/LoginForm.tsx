"use client";
import styles from "../login/auth.module.css";
import React, { useState } from "react";
import HttpClient from "@/utilities/HttpClient.utility";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Typography } from "@mui/material";
import Input from "@/components/Input";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface ILoginForm {
  username: string;
  password: string;
}

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ILoginForm>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // Hooks
  const router = useRouter();

  const handleLogin = async (data: any) => {
    const { username, password } = data;
    setIsLoading(true);
    try {
      const response = await HttpClient.post(`/authentication`, {
        username,
        password,
      });
      const token = response.data.base64EncodedAuthenticationKey;
      localStorage.setItem("litecoreAuthToken", token);
      router.push("/institucion/clientes");
    } catch (err) {
      console.log("🚀 ~ handleLogin ~ err:", err);
    }
    setIsLoading(false);
  };

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
          pl: "10%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "-10px",
          }}
        >
          <Image width={700} height={640} src="/assets/images/auth-login-img.png" alt="Image" />
        </Box>
        <Grid md={11} sx={{ px: 3, mx: "auto" }}>
          <Typography variant="h4" fontWeight="500" textAlign="start" color="#12141a">
            Banco Digital de Caracas
          </Typography>
          <Typography variant="body2" fontWeight="300" color="#606778" maxWidth="40ch">
            Más que un banco, somos tu aliado digital en cada paso de tu vida.
          </Typography>
          <Typography sx={{ mt: 1.5, cursor: "pointer" }} variant="body2">
            ¿Olvidaste tu contraseña?
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              rowGap: 3,
              maxWidth: "392px",
            }}
          >
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <Input label="Usuario" type="text" value={value} onChange={onChange} />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input label="Contraseña" type="password" value={value} onChange={onChange} />
              )}
            />
            <Button
              variant="primary"
              size="small"
              text="Entrar"
              type="submit"
              isLoading={isLoading}
              disabled={!isValid || Object.keys(dirtyFields).length < 2}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginForm;
