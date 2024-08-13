import Divider from "@mui/material/Divider";
import styles from "../../../page.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  MessageMail,
  EventCalendar,
  Analisis,
  BussinesProduct,
  Recruitment,
  MultiFolder,
  Flag,
  Share,
  Privacy,
  SettingGear,
  QuestionMark,
  Chat,
  RatingStar,
  MessagesBubbleSettings,
  Bin,
  PlusIcon,
} from "../../../assets/icons";

export default function NavClient() {
  return (
    <div className={styles.navClientConteiner}>
      <div>
        <button type="submit" className={styles.buttonClient}>
          Crear Cliente
        </button>
      </div>
      <List>
        <div className={styles.blockNav}>
          <h4>Solicitudes</h4>
          <ListItem
          //   secondaryAction={
          //     /* aqui va el elemento que se quiera poner a la derecha */
          //   }
          >
            <ListItemIcon>
              <MessageMail className={styles.iconsNavbar} />
            </ListItemIcon>
            <ListItemText primary="Aprobaciones" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <RatingStar className={styles.iconsNavbar} />
            </ListItemIcon>
            <ListItemText primary="Favoritos" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MessagesBubbleSettings className={styles.iconsNavbar} />
            </ListItemIcon>
            <ListItemText primary="Importante" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Bin className={styles.iconsNavbar} />
            </ListItemIcon>
            <ListItemText primary="Papelera" />
          </ListItem>
          <Divider />
        </div>

        <div className={styles.blockNav}>
          <h4>Etiquetas</h4>
          <div>
            <FormGroup style={{ marginLeft: 18 }}>
              <FormControlLabel control={<Checkbox />} label="Principal" />
              <FormControlLabel control={<Checkbox />} label="Social" />
              <FormControlLabel control={<Checkbox />} label="Trabajo" />
              <FormControlLabel control={<Checkbox />} label="Amigos" />
            </FormGroup>
            <Divider />
          </div>
          <div className={styles.createLabelButton}>
            <PlusIcon />
            <span> Crear nueva etiqueta</span>
          </div>
        </div>
      </List>
    </div>
  );
}
