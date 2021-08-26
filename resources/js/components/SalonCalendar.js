import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";

const SalonCalendar = ({ handleSelectDate }) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        handleSelectDate(formattedDate);
    }, [date]);

    return (
        <>
            <Calendar value={date} onChange={setDate} />
        </>
    );
};

export default SalonCalendar;
