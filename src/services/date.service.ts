import { ReportPeriodPreset } from "@/types/report.types";

function startOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);

  return nextDate;
}

function endOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(23, 59, 59, 999);

  return nextDate;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

function startOfYear(date: Date) {
  return new Date(date.getFullYear(), 0, 1);
}

function endOfYear(date: Date) {
  return endOfDay(new Date(date.getFullYear(), 11, 31));
}

export function getDateRangeFromPreset(
  preset: ReportPeriodPreset,
  customStartDate?: string,
  customEndDate?: string,
) {
  const now = new Date();

  if (preset === "current_month") {
    return {
      startDate: startOfMonth(now).toISOString(),
      endDate: endOfMonth(now).toISOString(),
    };
  }

  if (preset === "last_month") {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    return {
      startDate: startOfMonth(lastMonth).toISOString(),
      endDate: endOfMonth(lastMonth).toISOString(),
    };
  }

  if (preset === "last_3_months") {
    const startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    return {
      startDate: startOfMonth(startDate).toISOString(),
      endDate: endOfDay(now).toISOString(),
    };
  }

  if (preset === "current_year") {
    return {
      startDate: startOfYear(now).toISOString(),
      endDate: endOfYear(now).toISOString(),
    };
  }

  return {
    startDate: customStartDate
      ? startOfDay(new Date(customStartDate)).toISOString()
      : startOfMonth(now).toISOString(),
    endDate: customEndDate
      ? endOfDay(new Date(customEndDate)).toISOString()
      : endOfDay(now).toISOString(),
  };
}

export function isDateInsideRange(
  date: string,
  startDate: string,
  endDate: string,
) {
  const currentTime = new Date(date).getTime();

  return (
    currentTime >= new Date(startDate).getTime() &&
    currentTime <= new Date(endDate).getTime()
  );
}

export function formatDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}
