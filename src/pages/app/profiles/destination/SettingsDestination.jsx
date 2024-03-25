import React, {createContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allDestinationRequest} from "../../../../store/action/destinations";
import LoadingPage from "../../../../components/LoadingPage";
import DestinationList from "../../../../components/destination/DestinationList";
import {Helmet} from "react-helmet";
import {Account} from "../../../../helpers/account";

export const ContextDestination = createContext(null);
const SettingsDestination = () => {
    const loading = useSelector(state => state.destination.loading);
    const list = useSelector(state => state.destination.list);
    const [activeId, setActiveId] = useState(null);
    const [getItem, setGetItem] = useState({active: null, item: {}});
    const [update, setUpdate] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if (getItem.active === true) {
            const time = setTimeout(() => {
                setGetItem({
                    active: null,
                    item: {}
                })
            }, 650)
            return () => clearTimeout(time)
        }
    }, [getItem]);

    useEffect(() => {
        const aboutItem = Account.getDestination()
        if (aboutItem) {
            setUpdate(JSON.parse(aboutItem))
        }
    }, [])

    useEffect(() => {
        dispatch(allDestinationRequest())
    }, [dispatch]);


    return (
        <div className={'all-destination childrenWidth'}>
            <Helmet>
                <title>all destination</title>
            </Helmet>
            <div className="cont-all-des">
                <ContextDestination.Provider
                    value={{
                        activeId,
                        setActiveId,
                        setGetItem,
                        getItem,
                        setUpdate,
                        update,
                    }}
                >
                    {
                        loading ? <LoadingPage
                                className={'loading-page'}
                                width={'15px'}
                            />
                            : list.map(item =>
                                <DestinationList
                                    item={item}
                                    key={item.id}/>
                            )
                    }
                </ContextDestination.Provider>
            </div>
        </div>
    );
};

export default SettingsDestination;
