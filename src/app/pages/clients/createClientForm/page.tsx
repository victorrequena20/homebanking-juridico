"use client";

import React, { useState } from 'react';
import styles from "../../../page.module.css";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [foto, setFoto] = useState(null);

  const handleNombreChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNombre(e.target.value);
  };

  const handleApellidoChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setApellido(e.target.value);
  };

  const handleCorreoChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCorreo(e.target.value);
  };

  const handleTelefonoChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTelefono(e.target.value);
  };

  const handleFechaNacimientoChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFechaNacimiento(e.target.value);
  };

  const handleGeneroChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setGenero(e.target.value);
  };

  const handleFotoChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    setFoto(file);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Enviar los datos del formulario a través de una solicitud HTTP
    // usar fetch() o axios para enviar los datos al servidor
    console.log({
      nombre,
      apellido,
      correo,
      telefono,
      fechaNacimiento,
      genero,
      foto
    });
  };

  return (
    <form 
    autoComplete='off' onSubmit={handleSubmit}>

        <div className={styles.clientsFormContainer}>
            <div className={styles.wrapperFormConteiner}>
                <div className={styles.iconContainer}>
                    <CameraAltIcon />
                </div>
                {/* <div>
                    <label className={styles.labelClient}>Subir foto</label>
                </div> */}
                <div className={styles.wraperClient}>

                    <div className={styles.wraperClientInput}>
                        
                        <div className={styles.imputsConteiner}>
                            <label className={styles.labelClient}>Primer Nombre</label>
                            <input className={styles.inputClient} type="text" value={nombre} onChange={handleNombreChange} />
                        </div>
                            
                        
                        <div className={styles.imputsConteiner}>
                            <label className={styles.labelClient}>Correo</label>
                            <input className={styles.inputClient} type="email" value={correo} onChange={handleCorreoChange} />
                        </div>

                        <div className={styles.imputsConteiner}>
                            <label className={styles.labelClient}>Fecha de Nacimiento</label>
                            <input className={styles.inputClient} type="date" value={fechaNacimiento} onChange={handleFechaNacimientoChange} />
                        </div>

                    </div>

                    <div className={styles.wraperClientInput}>
                        <div className={styles.imputsConteiner}>
                            <label className={styles.labelClient}>Apellido</label>
                            <input className={styles.inputClient} type="text" value={apellido} onChange={handleApellidoChange} />
                        </div>
                        
                        <div className={styles.imputsConteiner}>
                            <label className={styles.labelClient}>Número de Teléfono</label>
                            <input className={styles.inputClient} type="tel" value={telefono} onChange={handleTelefonoChange} />
                        </div>
                        
                        <div className={styles.imputsConteiner}>
                            <label className={styles.labelClient}>Genero</label>
                            <select className={styles.inputClient}  value={genero} onChange={handleGeneroChange}>
                                <option value="">Selecciona...</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                    </div>
                    
                    
                </div>
                <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.buttonClient}>Enviar</button>
                </div>

            </div>

            
            

        </div>

    </form>
  );
};

export default Formulario;