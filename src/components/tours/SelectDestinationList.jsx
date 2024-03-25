import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allDestinationRequest} from "../../store/action/destinations";
import Select from "react-select";

const SelectDestinationList = ({errors, setTour, item}) => {
    const list = useSelector(state => state.destination.list);
    const dispatch = useDispatch();

    const options = useMemo(() => {
        return list.map(item => ({
            value: item.id,
            label: item.title
        }))
    }, [list]);

    const handleChange = useCallback((e) => {
        setTour((data) => ({
            ...data,
            destinationId: e.value
        }))
    }, [])

    useEffect(() => {
        dispatch(allDestinationRequest())
    }, []);

    return (
        <>
            <Select
                onChange={handleChange}
                className={'destinations_select'}
                placeholder={'Destinations...'}
                options={options}
                defaultValue={item && {value: item.destination.id, label: item.destination.title}}
            />
            {errors.destinationId ? <small className={'errors_message'}>is not allowed to be empty</small> : null}
        </>
    );
};

export default SelectDestinationList;
