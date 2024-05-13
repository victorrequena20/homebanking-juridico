import styles from "../page.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

export default function Auth() {
  return (
    <div className={styles.authContainer}>
      <Card variant="outlined" className={styles.cardbody}>
        <div>
          <form action="">
            <div className={styles.forms}>
              <span>Nombre de usuario</span>
              <TextField className={styles.textfield}  id="outlined-basic" label="" variant="outlined" />
              <span>Contraseña</span>
              <TextField className={styles.textfield}  id="outlined-password" type="password" label="" variant="outlined" />
            </div>
            <div className={styles.buttonlog}>
                <Button variant="contained" className={styles.button}>Iniciar Sesión</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}