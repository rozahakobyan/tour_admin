import React, {useCallback, useContext} from 'react';
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import {API_URL} from "../../store/Api";
import {FaWindowClose} from "react-icons/fa";
import {ContextDestination} from "../../pages/app/profiles/destination/SettingsDestination";

const AllZoomItem = () => {
    const desContext = useContext(ContextDestination)
    const {getItem, setGetItem} = desContext;

    const handleCloseSee = useCallback(() => {
        setGetItem({...getItem, active: true})
    }, [getItem]);

    return (
        getItem.active !== null
            ? <CustomsPortal className={'see_des_item'}>
                <div className={classNames('modal', {
                    isActiveSeeModal: getItem.active === true
                })}>
                    <img src={`${API_URL}/${getItem.item.image}`} alt={getItem.item.name}/>
                    <FaWindowClose onClick={handleCloseSee} className={'close'}/>
                </div>
            </CustomsPortal>
            : null
    );
};

export default AllZoomItem;
