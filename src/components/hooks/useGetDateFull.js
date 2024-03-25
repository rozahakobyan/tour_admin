import React, {useMemo} from 'react';

const useGetDateFull = (date) => {
    const getFullDate = useMemo(() => {
        const currentDate = new Date(date)
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const dey = currentDate.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${dey}`
    }, [date]);

    const time = useMemo(() => {
        const currentDate = new Date(date);
        const hours = (`0${currentDate.getHours()}`).slice(-2);
        const minutes = (`0${currentDate.getMinutes()}`).slice(-2);
        return `${hours}:${minutes}`;
    }, [date]);

    return {
        getFullDate,
        time
    }
};

export default useGetDateFull;
