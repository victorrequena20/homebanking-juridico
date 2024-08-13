export function formatSpanishDate(dateArray: [number, number, number]): string {
  const [year, month, day] = dateArray;

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = months[month - 1]; // Restamos 1 porque los meses en el array empiezan en 0

  return `${formattedDay} de ${formattedMonth} del ${year}`;
}

// Ejemplo de uso
const fecha = [2024, 8, 13];
