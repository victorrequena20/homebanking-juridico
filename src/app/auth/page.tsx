import styles from "../page.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Home() {
  return (
    <main className={styles.main}>
      <Card variant="outlined" className={styles.cardbody}>
        <div>
          <form action="">

            <div className={styles.forms}>
              <TextField  id="outlined-basic" label="Usuario" variant="outlined" />
            </div>
            <div className={styles.forms}>
              <TextField  id="outlined-basic" label="Contraseña" variant="outlined" />
            </div>
            <div  className={styles.check}>
            <label><input type="checkbox"/> Recordar mi Usuario en este equipo</label>
            </div>
            {/* <div  className={styles.check}>
              <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar mi Usuario en este equipo"
            />
            </div> */}
            
            {/*  */}
            {/* <div className={styles.buttonlog}>
              <TextField className={styles.test} id="outlined-basic" label="Usuario" variant="outlined" />
              <TextField className={styles.test} id="outlined-basic" label="Contraseña" variant="outlined" />
              <label className={styles.label}><input type="checkbox"/>Recordar mi Usuario en este equipo</label>
            </div> */}
            {/* <div className="remembet-forgot">
              <label><input type="checkbox" />Recordar mi Usuario en este equipo</label>
            </div> */}

            <div className={styles.buttonlog}>
                <Button variant="outlined" >LIMPIAR</Button>
                <Button variant="contained" className={styles.button}>INGRESAR</Button>
            </div>
            <div className={styles.check}>
              <a href="#">Olvidaste tu Contraseña</a>
              
            </div>
            <hr/>
            <div className={styles.endline}>
              <p>No tienes una cuentas?  </p><a href="#">  REGISTRATE</a>
            </div>
          </form>
        </div>
      </Card>
    </main>
  );
}
