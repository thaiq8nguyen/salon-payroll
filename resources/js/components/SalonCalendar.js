import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";

const SalonCalendar = ({ enableDateSelection, handleSelectDate }) => {
    const [date, setDate] = useState(dayjs().toDate());
    const [minDate, setMinDate] = useState(dayjs().subtract(7, "day").startOf("day").toDate());
    const [maxDate, setMaxDate] = useState(date);

    useEffect(() => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        handleSelectDate(formattedDate);
    }, [date]);

    useEffect(() => {
        if (!enableDateSelection) {
            setMinDate(date);
        } else {
            setMinDate(dayjs().subtract(7, "day").startOf("day").toDate());
        }
    }, [enableDateSelection]);

    return (
        <>
            <Calendar maxDate={maxDate} minDate={minDate} value={date} onChange={setDate} />
        </>
    );
};

export default SalonCalendar;
