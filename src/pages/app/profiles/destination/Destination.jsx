import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {allDestinationRequest} from "../../../../store/action/destinations";
import LoadingPage from "../../../../components/LoadingPage";
import InformationAboutItem from "../../../../components/destination/InformationAboutItem";

const Destination = () => {
    const loading = useSelector(state => state.destination.loading);
    const list = useSelector(state => state.destination.list);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allDestinationRequest())
    }, [dispatch]);

    return (
        <div className={'childrenWidth destination-about'}>
            <Helmet>
                <title>destination</title>
            </Helmet>
            <h1>information about Destination</h1>
            <div className={'cont_dec_about'}>
                {
                    loading ? <LoadingPage/>
                        : list.map(item => <InformationAboutItem key={item.id} item={item}/>)
                }
            </div>
        </div>
    );
};

export default Destination;
