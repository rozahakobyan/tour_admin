import React, {useCallback} from 'react';
import {API_URL} from "../../store/Api";
import useGetDateFull from "../hooks/useGetDateFull";
import {useNavigate} from "react-router-dom";
import {Account} from "../../helpers/account";

const InformationAboutItem = ({item}) => {
    const {getFullDate: createDate, time: createTime} = useGetDateFull(item?.createdAt);
    const {getFullDate: updateDate, time: updateTime} = useGetDateFull(item.updatedAt);
    const navigate = useNavigate();

    const handleUpdate = useCallback((item) => () => {
        Account.setDestination(JSON.stringify(item))
        Account.setNavbarUrlPathSub('settings-destination')
        navigate('/destination/settings-destination');
    }, [navigate]);

    return (
        <figure className={'item'}>
            <img src={`${API_URL}/${item.image}`} alt={item.title}/>
            <figcaption className={'about_text'}>
                <p>Destination name: <span>{item.title}</span></p>
                <p>Destination create date: <span>{createDate}/{createTime}</span></p>
                <p>Destination update date: <span>{updateDate}/{updateTime}</span></p>
            </figcaption>
            <button onClick={handleUpdate(item)}>Update</button>
        </figure>
    );
};

export default InformationAboutItem;
