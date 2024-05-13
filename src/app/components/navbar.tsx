
import styles from "../page.module.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Divider, ListItemAvatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function Navbar() {
  return (
    <div className={styles.navContainer}>
        <div>
             <div className={styles.welcome}>
                <span>Bienvenido al Banco digital de Caracas</span>
            </div>
            <List >
                <span className={styles.navSpans}>General</span>
                <ListItem
                //   secondaryAction={
                //     /* aqui va el elemento que se quiera poner a la derecha */
                //   }
                >
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Solicitudes"
                />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Agendar"
                        />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Analisis"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                        primary="Crear productos financieros"
                        />
                </ListItem >
                <Divider />
                <span className={styles.navSpans}>Mi espacio</span>
                <ListItem
                //   secondaryAction={
                //     /* aqui va el elemento que se quiera poner a la derecha */
                //   }
                >
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Solicitudes"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Agendar"
                        />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Analisis"
                        />
                </ListItem>
                    
                <Divider />  
                <span className={styles.navSpans}>Mi espacio</span>
                <ListItem
                //   secondaryAction={
                //     /* aqui va el elemento que se quiera poner a la derecha */
                //   }
                >
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Solicitudes"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Agendar"
                        />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Analisis"
                        />
                </ListItem>
                <Divider />      
            </List>
        </div>
    </div>
  );
}
