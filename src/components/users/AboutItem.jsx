import React, {useCallback} from "react";
import {API_URL} from "../../store/Api";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useDispatch} from "react-redux";
import {usersDeleteRequest} from "../../store/action/users";
import {useNavigate, useParams} from "react-router-dom";

const AboutItem = ({item}) => {
    const dispatch = useDispatch();

    const { page } = useParams();

    const handleUpdate = useCallback((item) => () => {
        // setUpdateItem(item)
    }, []);

    const handleDeleteGetId = useCallback( (id) => () => {
        dispatch(usersDeleteRequest({id, page}))
    }, [page]);

    return (
        <figure className={'item'}>
            <img src={`${API_URL}/${item.photo}`} alt={item.email} width={50} height={50}/>
            <figcaption className={'about_text'}>
                <p>Users email: <span>{item.email}</span></p>
                <p>Users first name: <span>{item.firstName}</span></p>
                <p>Users last name: <span>{item.lastName}</span></p>
                <p>Users role: <span>{item.role}</span></p>
            </figcaption>
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
        </figure>
    )
};

export default AboutItem;