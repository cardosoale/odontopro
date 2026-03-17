"use client";

import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ButtonPickerAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState("");

  // Initialize with current date or from URL param
  useEffect(() => {
    const dateFromUrl = searchParams.get("date");
    const today = format(new Date(), "yyyy-MM-dd");
    setSelectedDate(dateFromUrl || today);
  }, [searchParams]);

  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    const newDate = event.target.value;
    setSelectedDate(newDate);

    // Update URL with new date
    const url = new URL(window.location.href);
    url.searchParams.set("date", newDate);
    router.push(url.toString());
  }

  return (
    <input
      type="date"
      id="appointmentDatePicker"
      className="border-2 px-2 py-1 rounded-md text-sm md:text-base"
      value={selectedDate}
      onChange={handleChangeDate}
    />
  );
}
