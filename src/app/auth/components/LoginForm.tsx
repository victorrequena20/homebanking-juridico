"use client"

import styles from "../login/auth.module.css"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FINERACT_API_URL}/authentication`,
        {
          username,
          password,
        },
        {
          headers: {
            'Fineract-Platform-TenantId': 'default',
          },
        }
      );
      const token = response.data.base64EncodedAuthenticationKey;
      localStorage.setItem('fineractAuthToken', token);
      setError('');
      // Redirigir a la página principal o dashboard
    } catch (err) {
      setError('Clave o usuario invalido');
    }
  };

return (
    <div className={styles.authContainer}>
      <Card variant="outlined" className={styles.cardbody}>
        <div>
          <form onSubmit={handleLogin}>
            <div className={styles.forms}>
              <span>Nombre de usuario</span>
              <TextField
                className={styles.textfield}
                id="outlined-basic"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
              />
              <span>Contraseña</span>
              <TextField
                className={styles.textfield}
                id="outlined-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
            </div>
            <div className={styles.buttonlog}>
              <Button variant="contained" type="submit" className={styles.button}>
                Iniciar Sesión
              </Button>
              {error && <p>{error}</p>}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};


export default LoginForm;