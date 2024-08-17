export function formatSpanishDate(dateArray: [number, number, number]): string {
  !dateArray && (dateArray = [0, 0, 0]);
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

  const formattedDay = day?.toString()?.padStart(2, "0");
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

export function getTodayFormattedEsddMMMMyyyy(): string {
  const today = new Date();
  return formatDateEsddMMMMyyyy(today);
}

export function parseByDayString(input: string): { label: string; value: string }[] {
  const daysMap: { [key: string]: string } = {
    MO: "Lunes",
    TU: "Martes",
    WE: "Miércoles",
    TH: "Jueves",
    FR: "Viernes",
    SA: "Sábado",
    SU: "Domingo",
  };

  // Encuentra la parte que corresponde a BYDAY
  const byDayMatch = input.match(/BYDAY=([^;]+)/);
  if (!byDayMatch) {
    return [];
  }

  // Extrae los días y los separa en un array
  const daysArray = byDayMatch[1].split(",");

  // Filtra cualquier valor vacío y convierte los días a objetos con label y value
  return daysArray
    .filter(day => day) // Elimina posibles valores vacíos
    .map(day => ({
      label: daysMap[day],
      value: day,
    }));
}

export function convertFromTimestampToSpanishDate(timestamp: string): string {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("es-ES", { month: "long" });
  const year = date.getFullYear();

  return `${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} del ${year}`;
}
