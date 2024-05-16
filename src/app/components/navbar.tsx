
import styles from "../page.module.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Divider, ListItemAvatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MessageMail, EventCalendar, Analisis, BussinesProduct, Recruitment, MultiFolder, Flag, Share, Privacy, SettingGear, QuestionMark, Chat } from "../assets/icons";


export default function Navbar() {
  return (
    <div className={styles.navContainer}>
        <div>
            <div className={styles.welcome}>
                <span>Bienvenido al Banco digital de <span className={styles.gradient}>Caracas</span></span>
            </div>
            <List >
                <div className={styles.blockNav}>
                    <span className={styles.navSpans}>General</span>
                    <ListItem
                    //   secondaryAction={
                    //     /* aqui va el elemento que se quiera poner a la derecha */
                    //   }
                    >
                    <ListItemIcon>
                        <MessageMail className={styles.iconsNavbar} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Solicitudes"
                    />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                        <EventCalendar className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Agendar"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Analisis className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Analisis"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <BussinesProduct className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                        primary="Crear productos financieros"
                        />
                    </ListItem >
                    <ListItem>
                        <ListItemIcon>
                            <Recruitment className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                        primary="Reclutamiento"
                        />
                    </ListItem >
                    <ListItem>
                        <ListItemIcon>
                            <MultiFolder className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                        primary="Projecto"
                        />
                    </ListItem >
                    <Divider />
                </div>
                
                <div className={styles.blockNav}>
                    <span className={styles.navSpans}>Mi espacio</span>
                    <ListItem
                    //   secondaryAction={
                    //     /* aqui va el elemento que se quiera poner a la derecha */
                    //   }
                    >
                        <ListItemIcon>
                            <Flag className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Actividad"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Share className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Compartido"
                            />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Privacy className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Privacidad"
                            />
                    </ListItem>
                    <Divider />
                </div>

                <div className={styles.blockNav}>
                    <span className={styles.navSpans}>Soporte</span>
                    <ListItem
                    //   secondaryAction={
                    //     /* aqui va el elemento que se quiera poner a la derecha */
                    //   }
                    >
                        <ListItemIcon>
                            <SettingGear className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Ajustes"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <QuestionMark className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Ayuda"
                            />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Chat className={styles.iconsNavbar} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Chat"
                            />
                    </ListItem>
                    <Divider /> 

                </div>    
            </List>
        </div>
    </div>
  );
}
