import React, {useCallback, useContext} from 'react';
import {API_URL} from "../../store/Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {BiEdit} from "react-icons/bi";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {deleteDestinationRequest} from "../../store/action/destinations";
import {ContextDestination} from "../../pages/app/profiles/destination/SettingsDestination";
import UpdateItem from "./UpdateItem";
import AllZoomItem from "./AllZoomItem";

const DestinationList = ({item}) => {
    const dispatch = useDispatch();
    const desContext = useContext(ContextDestination)
    const {activeId, setActiveId, setGetItem, setUpdate} = desContext

    const handleDeleteGetId = useCallback((id) => () => {
        setActiveId(id)
        setTimeout(() => {
            dispatch(deleteDestinationRequest(id))
        }, 500)
    }, []);

    const handleSeeItem = useCallback((item) => () => {
        setGetItem({
            item,
            active: false
        })
    }, []);


    const handleUpdate = useCallback((item) => () => {
        setUpdate(item)
    }, []);


    return (
        <div className={classNames(classNames('item_des', {
            deleteItem: activeId === item.id
        }))}>
            <img src={`${API_URL}/${item.image}`} alt=""/>
            <h1>{item.title}</h1>
            <ul className="icon_row">
                <li
                    onClick={handleSeeItem(item)}
                    className={'icon'}>
                    <MdOutlineRemoveRedEye/>
                </li>
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
            <AllZoomItem/>
            <UpdateItem/>
        </div>
    );
};

export default DestinationList;
