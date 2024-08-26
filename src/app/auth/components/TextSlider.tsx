import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  {
    text: '"Gracias al crédito exprés del Banco Digital de Caracas, pude expandir mi negocio de panadería en tiempo récord. Su plataforma en línea hizo todo el proceso rápido y sin complicaciones."',
    logo: "/assets/images/profile.jpg",
    name: "María Rodríguez",
    company: "Fundadora de 'Pan Caraqueño'",
  },
  {
    text: '"El Banco Digital de Caracas no solo me ofreció un crédito, sino también asesoría financiera. Eso me ayudó a optimizar mi startup de tecnología y ahora estamos creciendo más rápido que nunca."',
    logo: "/assets/images/profile3.jpg",
    name: "Carlos Mendoza",
    company: "CEO de 'TechVenezuela'",
  },
  {
    text: '"Como emprendedora, valoro la flexibilidad. El Banco Digital de Caracas entendió mis necesidades y me dio un crédito a medida que me permitió lanzar mi línea de moda sustentable."',
    logo: "/assets/images/profile2.jpg",
    name: "Luisa Hernández",
    company: "Diseñadora de 'EcoChic Caracas'",
  },
];

const TextSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    resetInterval();
  };

  return (
    <div
      style={{
        width: "370px",
        height: "340px",
        borderRadius: "8px",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 10,
        paddingLeft: "60px",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="body2" color="var(--secondaryText)" textAlign="justify" fontWeight="300" maxWidth="32ch">
            {data[currentIndex].text}
          </Typography>
          <Image
            width={48}
            height={48}
            src={data[currentIndex].logo}
            alt="Logo"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "100px",
              objectFit: "cover",
              objectPosition: "top",
              marginTop: "24px",
              marginBottom: "24px",
            }}
          />
          <Typography variant="body2" fontWeight="400">
            {data[currentIndex].name}
          </Typography>
          <Typography variant="body2" color="var(--secondaryText)">
            {data[currentIndex].company}
          </Typography>
        </motion.div>
      </AnimatePresence>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "8px",
          mx: "auto",
          height: "40px",
          position: "absolute",
          bottom: "0px",
          left: "60px",
          width: "100%",
        }}
      >
        {data.map((_, index) => (
          <motion.span
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? "#484848" : "#60677820",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          ></motion.span>
        ))}
      </Box>
    </div>
  );
};

export default TextSlider;
