import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allCategoriesRequest} from "../../store/action/categories";
import Select from "react-select";

const SelectCategoriesList = ({setTour, errors, item}) => {
    const list = useSelector(state => state.categories.list);
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
            categoryId: e.value
        }))
    }, [])

    useEffect(() => {
        dispatch(allCategoriesRequest())
    }, []);

    return (
        <>
            <Select
                onChange={handleChange}
                className={'destinations_select'}
                placeholder={'Categories...'}
                options={options}
                defaultValue={item && {value: item.category.id, label: item.category.title}}
            />
            {errors.categoryId ? <small className={'errors_message'}>is not allowed to be empty</small> : null}
        </>
    );
};

export default SelectCategoriesList;
