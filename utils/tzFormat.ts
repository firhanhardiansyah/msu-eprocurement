import { format } from "date-fns";

export const formatToUTC = (date: Date): string => {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return format(utcDate, "yyyy-MM-dd HH:mm:ss");
};
