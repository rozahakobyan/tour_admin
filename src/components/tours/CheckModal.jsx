import React, {useEffect} from 'react';
import CustomsPortal from "../CustomsPortal";
import {FaCheckCircle} from "react-icons/fa";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";
import {Account} from "../../helpers/account";

const CheckModal = ({show, setShow}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (show === false) {
            const time = setTimeout(() => {
                setShow(true)
            }, 1000)

            return () => clearTimeout(time)
        }
    }, [show]);

    useEffect(() => {
        if (show === true) {
            const time = setTimeout(() => {
                setShow(null)
                navigate('/tour/settings-tours')
                Account.setNavbarUrlPathSub('settings-tours')
            }, 650)
            return () => clearTimeout(time)
        }
    }, [show])

    return (
        show !== null ? <CustomsPortal className={'add_tour_check container_modal'}>
                <FaCheckCircle className={classNames('check', {
                    isActiveCheck: show
                })}/>
            </CustomsPortal>
            : null
    );
};

export default CheckModal;
