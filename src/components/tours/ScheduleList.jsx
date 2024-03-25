import React, {useCallback, useContext} from 'react';
import {MdDelete} from "react-icons/md";
import {TourContext} from "../../pages/app/profiles/tour/AddNewTour";
import useGetDateFull from "../hooks/useGetDateFull";

const ScheduleList = ({item, setSelectedDate,tour,setTour}) => {
    const {getFullDate, time} = useGetDateFull(item);

    const handleDeleteDate = useCallback((date) => () => {
        const filterDate = tour.schedule.filter(item => item !== date);
        setTour({...tour, schedule: filterDate})
        if (filterDate.length === 0) {
            setSelectedDate('')
        }
    }, [tour]);
    return (
        <li key={item.toString()}>
            <div>
                <p>{getFullDate}/{time}</p>
                <MdDelete className={'icon'} onClick={handleDeleteDate(item)}/>
            </div>
        </li>
    );
};

export default ScheduleList;
