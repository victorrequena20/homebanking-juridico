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

export function formatDateEsddMMMMyyyy(dateString: any): string {
  // Convertir la cadena de fecha a un objeto Date
  const date = new Date(dateString);

  // Definir los nombres de los meses en español
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

  // Extraer el día, mes y año del objeto Date
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Formatear la fecha como "DD MMMM YYYY"
  return `${day} ${month} ${year}`;
}
