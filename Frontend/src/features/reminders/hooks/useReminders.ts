import { QueryKey, useQuery } from "@tanstack/react-query";
import { getAllReminders } from "../../../services/apiReminders";

export function useReminders() {
  const {
    isLoading,
    data: reminders,
    error,
  } = useQuery({
    queryKey: ["reminders"],
    queryFn: getAllReminders,
  });
  return { reminders, error, isLoading };
}
