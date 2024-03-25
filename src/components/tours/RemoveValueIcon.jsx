import React, {useCallback} from 'react';
import {IoIosCloseCircleOutline} from "react-icons/io";

const RemoveValueIcon = ({keys, setTour, value}) => {

    const handleRemove = useCallback(() => {
        setTour((prevValues) => ({
            ...prevValues,
            [keys]: '',
        }));
    }, [keys])

    return (
        value.length >= 1 ? <IoIosCloseCircleOutline onClick={handleRemove} className={'remove'}/> : null
    );
};

export default RemoveValueIcon;
