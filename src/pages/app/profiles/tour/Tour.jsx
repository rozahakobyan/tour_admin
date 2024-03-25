import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listTourRequest} from "../../../../store/action/tours";
import {Helmet} from "react-helmet";
import InformationAboutItem from "../../../../components/tours/InformationAboutItem";
import {Account} from "../../../../helpers/account";

const Tour = () => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const list = useSelector(state => state.tours.list);

    useEffect(() => {
        dispatch(listTourRequest(page))
    }, [page]);

    return (
        <div className={'tour childrenWidth'}>
            <Helmet>
                <title>destination</title>
            </Helmet>
            <h1>information about Tour</h1>
            <div className="cont_tour">
                {list.tours ?
                    list.tours.map(item => <InformationAboutItem key={item.id} item={item}/>)
                    : null
                }
            </div>
        </div>
    );
};

export default Tour;
