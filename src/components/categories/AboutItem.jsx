import React, {useCallback} from 'react';
import {API_URL} from "../../store/Api";
import useGetDateFull from "../hooks/useGetDateFull";

const AboutItem = ({item}) => {
    const {getFullDate: createDate, time: createTime} = useGetDateFull(item?.createdAt);
    const {getFullDate: updateDate, time: updateTime} = useGetDateFull(item.updatedAt);


    return (
        <figure className={'item'}>
            <img src={`${API_URL}/${item.icon}`} alt={item.title}/>
            <figcaption className={'about_text'}>
                <p>Categories name: <span>{item.title}</span></p>
                <p>Categories create date: <span>{createDate}/{createTime}</span></p>
                <p>Categories update date: <span>{updateDate}/{updateTime}</span></p>
            </figcaption>
        </figure>
    );
};

export default AboutItem;
