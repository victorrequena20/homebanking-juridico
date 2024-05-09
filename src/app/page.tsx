import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


export default function Home() {
  return (
    <main className={styles.main}>
      <Card variant="outlined">
        <p>hohohohohoh</p>

        <div className={styles.description}>
          <form action="">
            <h1 className={styles.card}>Login</h1>
            <div className={styles.center}>
              <input type="text" placeholder="Usuario" required />
            </div >

            <div className={styles.center}>
              <input type="password" placeholder="Contraseña" required />
            </div >
            <div className="remembet-forgot">
              <label><input type="checkbox" />Recordar mi Usuario en este equipo</label>
            </div>
            <div className={styles.center}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '12ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Usuario" variant="outlined" />
                <TextField id="outlined-basic" label="Contraseña" variant="outlined" />
              </Box>
            </div>

            <div className={styles.center}>
              <Button variant="outlined">LIMPIAR</Button>
              <Button variant="contained">INGRESAR</Button>
            </div>
            <div className={styles.center}>
              <a href="#">Olvidaste tu Contraseña</a>
            </div>
            <div className={styles.center}>
              <p>No tienes una cuenta? </p><a href="#">REGISTRATE</a>
            </div>
          </form>
        </div>


      </Card>
    </main>
  );
}
