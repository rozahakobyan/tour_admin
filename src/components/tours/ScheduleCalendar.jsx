import React, {useCallback, useContext, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {TourContext} from "../../pages/app/profiles/tour/AddNewTour";
import ScheduleList from "./ScheduleList";

const ScheduleCalendar = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const tourContext = useContext(TourContext);
    const {
        setTour,
        tour,
        filesErrors,
        setFilesErrors
    } = tourContext;

    const handleAddDate = useCallback(() => {
        if (selectedDate !== '') {
            setTour(arg => ({
                ...arg,
                schedule: [...arg.schedule, selectedDate]
            }))
            setFilesErrors(arg => ({
                ...arg,
                schedule: ''
            }))
        }
    }, [selectedDate]);


    return (
        <div className={'schedule_calendar'}>
            <div className="row">
                <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    showTimeSelect
                    placeholderText="Select Date and Time"
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <div onClick={handleAddDate} className={'btn'}>Add Date</div>
            </div>
            <ul className={'schedule_list'}>
                {
                    tour.schedule.map((item, index) =>
                        <ScheduleList
                            setTour={setTour}
                            tour={tour}
                            setSelectedDate={setSelectedDate}
                            key={index}
                            item={item}/>)
                }
            </ul>
            {filesErrors.schedule ? <small className={'errors_message'}>{filesErrors.schedule}</small> : null}
        </div>
    );
};

export default ScheduleCalendar;
