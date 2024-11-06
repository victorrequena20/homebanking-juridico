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

export function getPrevMonthFormattedEsddMMMMyyyy(): string {
  const today = new Date();
  today.setMonth(today.getMonth() - 1);
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

export function formatTimestampToSpanishDate(timestampMs: number): string {
  // Convertir el número de milisegundos a segundos
  const timestamp = timestampMs / 1000;

  // Convertir el timestamp a una fecha
  const date = new Date(timestamp * 1000);

  // Definir los nombres de los meses en español
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Formatear la fecha como "DD de MMMM de YYYY"
  const formattedDate = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  return isNaN(date.getTime()) ? "" : formattedDate;
}

export function parseDateFromString(dateString: string): Date | null {
  if (!dateString) return null;

  const [day, month, year] = dateString.split("/").map(Number);
  if (day && month && year) {
    return new Date(year, month - 1, day); // Meses son base 0 en Date
  }

  return null;
}

interface InputType {
  row: [number, string];
}

interface OutputType {
  label: string;
  value: number;
}

export function transformArray(input: InputType[]): OutputType[] {
  return input.map(item => ({
    label: item.row[1],
    value: item.row[0],
  }));
}

export function generateCSV(csvData: any): string {
  // Función auxiliar para escapar campos si es necesario
  const escapeField = (field: any): string => {
    if (typeof field === "string" && (field.includes(",") || field.includes('"') || field.includes("\n"))) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return String(field);
  };

  // Generar la línea de encabezados
  const headers = csvData.columnHeaders.map((header: any) => escapeField(header.columnName));
  let csvContent = headers.join(",") + "\n";

  // Generar las líneas de datos
  csvData.data.forEach((item: any) => {
    const row = item.row.map((field: any) => {
      if (Array.isArray(field)) {
        // Si el campo es un array (como la fecha), lo unimos con guiones
        return field.join("-");
      }
      return escapeField(field);
    });
    csvContent += row.join(",") + "\n";
  });

  return csvContent;
}

export function downloadCSV(csvContent: string, fileName: string = "output.csv"): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function formatToPercentage(number:number) {
  return `${number?.toFixed(2).replace('.', ',')}%`;
}