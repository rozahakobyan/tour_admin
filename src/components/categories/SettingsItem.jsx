import React, {useCallback} from 'react';
import {API_URL} from "../../store/Api";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateItem from "./UpdateItem";
import {useDispatch} from "react-redux";
import {deleteCategoriesRequest} from "../../store/action/categories";

const SettingsItem = ({item, setUpdateItem, updateItem}) => {
    const dispatch = useDispatch();

    const handleUpdate = useCallback((item) => () => {
        setUpdateItem(item)
    }, []);

    const handleDeleteGetId = useCallback((id) => () => {
        dispatch(deleteCategoriesRequest(id))
    }, []);

    return (
        <div className={'item'}>
            <img src={`${API_URL}/${item.icon}`} alt={item.title}/>
            <h3>{item.title}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(item)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDeleteGetId(item.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItem
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
};

export default SettingsItem;
