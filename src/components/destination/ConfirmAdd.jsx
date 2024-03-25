import React, {useCallback, useContext} from 'react';
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import {AiOutlineCloseSquare} from "react-icons/ai";
import {SyncLoader} from "react-spinners";
import {AddDescContext} from "../../pages/app/profiles/destination/AddNewDestination";
import {useDispatch, useSelector} from "react-redux";
import {addNewDestinationRequest} from "../../store/action/destinations";
import {Account} from "../../helpers/account";
import {useNavigate} from "react-router-dom";

const ConfirmAdd = () => {
    const DescContext = useContext(AddDescContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {setResultDestination, resultDestination, selectedFile, text, setErrors} = DescContext;
    const loading = useSelector(state => state.destination.loading);


    const handleCloseResultDestination = useCallback(() => {
        setResultDestination(true)
    }, []);

    const handleAddNewDestination = useCallback(async () => {
        const {payload} = await dispatch(addNewDestinationRequest({
            title: text,
            image: selectedFile
        }));
        if (payload.status === 'ok') {
            setErrors({})
            setResultDestination(true)
            Account.setNavbarUrlPathSub('settings-destination')
            setTimeout(() => {
                navigate('/destination/settings-destination')
            }, 500)
        }
    }, [text, selectedFile]);

    return (
        resultDestination !== null
            ? <CustomsPortal className={'result_destination container_modal'}>
                <div className={classNames('res_cont', {
                    isActiveResCont: resultDestination
                })}>
                    <div className="header_res">
                        <p><span>Destination  name:</span> {text}</p>
                        <AiOutlineCloseSquare
                            onClick={handleCloseResultDestination}
                            className={'delete-icon'}/>
                    </div>
                    <div className={'images'}>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt={selectedFile?.name}/>
                    </div>
                    <div className={'bottom_btn'}>
                        <button onClick={handleAddNewDestination}>{
                            loading ?
                                <SyncLoader
                                    size={11}
                                    color={'#fff'}/>
                                : 'Save'
                        }</button>
                    </div>
                </div>
            </CustomsPortal>
            : null
    );
};

export default ConfirmAdd;
