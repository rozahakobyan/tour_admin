import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteTourRequest, listTourRequest} from "../../../../store/action/tours";
import {API_URL} from "../../../../store/Api";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";

const AllTours = () => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const list = useSelector(state => state.tours.list)
    const navigation = useNavigate();

    useEffect(() => {
        dispatch(listTourRequest(page))
    }, [page, dispatch]);


    const handleDeleteGetId = useCallback((id) => () => {
        dispatch(deleteTourRequest(id))
    }, [dispatch]);

    const handleSeeItem = useCallback((id) => () => {
        navigation('/tour-details/' + id)
    }, [navigation]);


    const handleUpdate = useCallback((id) => () => {
        navigation('/tour-update/' + id);
    }, []);

    const handlePageClick = useCallback(({selected}) => {
        setPage(selected + 1)
    }, []);

    return (
        <div className={'all_tour childrenWidth'}>
            <div className={'row_items'}>
                {
                    list.tours ?

                        list.tours.map(item => (
                            <div key={item.id} className={'item'}>
                                <img src={`${API_URL}/${item.featuredImage}`} alt=""/>
                                <h1>{item.title}</h1>
                                <ul className="icon_row">
                                    <li
                                        onClick={handleSeeItem(item.id)}
                                        className={'icon'}>
                                        <MdOutlineRemoveRedEye/>
                                    </li>
                                    <li
                                        onClick={handleUpdate(item.id)}
                                        className={'icon'}>
                                        <BiEdit/>
                                    </li>
                                    <li
                                        onClick={handleDeleteGetId(item.id)}
                                        className={'icon'}>
                                        <RiDeleteBin6Line/>
                                    </li>
                                </ul>
                            </div>
                        ))
                        : null}
            </div>
            <div className={'pages'}>
                {
                    list.pages && list.pages > 1 ?
                        <ReactPaginate
                            breakLabel="..."
                            className={'paginate'}
                            nextLabel=" >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={list?.pages}
                            previousLabel="< "
                            renderOnZeroPageCount={null}
                        />
                        : null
                }
            </div>
        </div>
    );
};

export default AllTours;
