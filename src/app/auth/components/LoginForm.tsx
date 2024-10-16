"use client";
import React from "react";
import styles from "../login/auth.module.css";
import HttpClient from "@/utilities/HttpClient.utility";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack, Typography } from "@mui/material";
import Input from "@/components/Input";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import TextSlider from "./TextSlider";

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
      if (!token) {
        toast.error("Usuario o contraseña incorrectos");
      }
      localStorage.setItem("litecoreAuthToken", token);
      localStorage.setItem("litecoreXCredentials", JSON.stringify(response.data));
      router.push("/dashboard");
    } catch (err) {
      toast.error("Ocurrio un error al iniciar sesión");
      console.error("🚀 ~ handleLogin ~ err:", err);
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
          pl: 10,
          justifyContent: "center",
        }}
      >
        <Grid
          md={6}
          sx={{
            mx: "auto",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Stack sx={{ alignItems: "center", mt: -8 }}>
            <Box>
              <Typography variant="h4" fontWeight="500" textAlign="start" color="#12141a">
                Banco Digital de Caracas
              </Typography>
              <Typography variant="body2" fontWeight="300" color="#606778" maxWidth="50ch" sx={{ mt: 2 }}>
                Accede a créditos con solo un click, más que un banco, somos tu aliado digital en cada paso de tu vida.
              </Typography>
              <Typography sx={{ mt: 2, cursor: "pointer" }} variant="body2">
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
                  render={({ field: { onChange, value } }) => <Input label="Usuario" type="text" value={value} onChange={onChange} />}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => <Input label="Contraseña" type="password" value={value} onChange={onChange} />}
                />
                <Button
                  variant="primary"
                  size="small"
                  text="Iniciar sesión"
                  type="submit"
                  isLoading={isLoading}
                  disabled={!isValid || Object.keys(dirtyFields).length < 2}
                />
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid md={6} sx={{ borderLeft: "1px solid #ccc", mt: -2 }}>
          <TextSlider />
        </Grid>
        <Box
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "-10px",
          }}
        >
          <Image width={530} height={570} src="/assets/images/auth-login-img.png" alt="Image" />
        </Box>
      </Grid>
    </div>
  );
};

export default LoginForm;
