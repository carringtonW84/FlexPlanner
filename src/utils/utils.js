import { FRENCH_HOLIDAYS } from "../assets/constants/frenchHolidays";

export const getMonthDays = (year, month) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const isHoliday = (date) => {
  const key = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
  return FRENCH_HOLIDAYS[key];
};

export const getDayOfWeekName = (dayIndex) => {
  const dayNames = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];
  return dayNames[dayIndex];
};

export const getStatusLabel = (status) => {
  const labels = {
    onsite: "🏢 Sur site",
    remote: "🏠 Télétravail",
    vacation: "🏖️ Congés",
    holiday: "🎉 Férié",
    weekend: "🌅 Week-end",
  };
  return labels[status] || "Non défini";
};

export const getStatusColor = (status) => {
  const colors = {
    onsite: "bg-green-100 text-green-800 border-green-200",
    remote: "bg-blue-100 text-blue-800 border-blue-200",
    vacation: "bg-yellow-100 text-yellow-800 border-yellow-200",
    holiday: "bg-red-100 text-red-800 border-red-200",
    weekend: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
};
