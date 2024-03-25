import React, {useCallback} from 'react';
import {MdDelete} from "react-icons/md";
import useGetDateFull from "../hooks/useGetDateFull";
import {useDispatch} from "react-redux";
import {deleteScheduleItemTourRequest} from "../../store/action/tours";

const ScheduleUpdateList = ({item, tour, setTour, setSelectedDate}) => {
    const {getFullDate, time} = useGetDateFull(item.date ? item.date : item);
    const dispatch = useDispatch();
    const handleDeleteDate = useCallback((date) => () => {
        const filterDate = tour.schedule.filter(item => {
            if (item.id) {
                if (item.id !== date.id) {
                    return item
                }
            } else {
                if (item !== date) {
                    return item
                }
            }
        });
        if (date.id) {
            dispatch(deleteScheduleItemTourRequest(date.id))
        }
        setTour({...tour, schedule: filterDate})
        if (filterDate.length === 0) {
            setSelectedDate('')
        }
    }, [tour]);
    return (
        <li>
            <div>
                <p>{getFullDate}/{time}</p>
                <MdDelete className={'icon'} onClick={handleDeleteDate(item)}/>
            </div>
        </li>
    );
};

export default ScheduleUpdateList;