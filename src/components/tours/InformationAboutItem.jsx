import React, {useCallback} from 'react';
import {API_URL} from "../../store/Api";
import useGetDateFull from "../hooks/useGetDateFull";
import {useNavigate} from "react-router-dom";

const InformationAboutItem = ({item}) => {
    const {getFullDate: createDate, time: createTime} = useGetDateFull(item?.createdAt);
    const {getFullDate: updateDate, time: updateTime} = useGetDateFull(item.updatedAt);
    const navigate = useNavigate();

    const handleSee = useCallback((id) => () => {
        navigate('/tour-details/' + id)
    }, []);

    return (
        <figure className={'item'}>
            <img src={`${API_URL}/${item.featuredImage}`} alt={item.title}/>
            <figcaption className={'about_text'}>
                <p>Tour name: <span>{item.title}</span></p>
                <p>Tour create date: <span>{createDate}/{createTime}</span></p>
                <p>Tour update date: <span>{updateDate}/{updateTime}</span></p>
            </figcaption>
            <button onClick={handleSee(item.id)}>See</button>
        </figure>
    );
};

export default InformationAboutItem;
