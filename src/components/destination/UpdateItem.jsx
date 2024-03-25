import React, {useCallback, useContext, useEffect} from 'react';
import {ContextDestination} from "../../pages/app/profiles/destination/SettingsDestination";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {API_URL} from "../../store/Api";
import {FaWindowClose} from "react-icons/fa";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {updateDestinationRequest} from "../../store/action/destinations";
import {Account} from "../../helpers/account";

const UpdateItem = () => {
    const desContext = useContext(ContextDestination);
    const dispatch = useDispatch();
    const {
        update,
        setUpdate,
    } = desContext;

    const handleClose = useCallback(() => {
        setUpdate({...update, isActive: true})
        Account.removeDestination()
    }, [update]);

    useEffect(() => {
        if (update?.isActive) {
            setTimeout(() => {
                setUpdate(null)
            }, 600)
        }
    }, [update]);

    const handleChange = useCallback((e) => {
        const value = e.target.value
        setUpdate({...update, title: value})
    }, [update]);

    const handleChangeFile = useCallback((event) => {
        setUpdate({...update, image: event.target.files[0]})
    }, [update]);

    const handleSave = useCallback((e) => {
        e.preventDefault()
        const {createdAt, updatedAt, ...data} = update
        setTimeout(() => {
            dispatch(updateDestinationRequest(data))
            Account.removeDestination()
        }, 800)
        setUpdate({...update, isActive: true})
    }, [update]);


    return (
        update ? <CustomsPortal className={'update'}>
                <div className={classNames('modal', {
                    isActiveModal: update.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={handleChange}
                                    value={update.title || ''}
                                    type="text"
                                />
                            </div>
                            <div className={'item_file_upload'}>
                                <label
                                    htmlFor="file-upload"
                                    className="custom-file-upload">
                                    <MdOutlineDriveFolderUpload
                                        className={'icon'}/>
                                    Choose file
                                </label>
                                <input
                                    onChange={handleChangeFile}
                                    name={'files'}
                                    accept="image/*"
                                    id="file-upload"
                                    type="file"/>
                            </div>
                            <button onClick={handleSave}>
                                Save
                            </button>
                        </div>
                        <div className={'images'}>
                            <img src={
                                update?.image?.name
                                    ? URL.createObjectURL(update.image)
                                    : `${API_URL}/${update.image}`}
                                 alt={'destination image'}/>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
};

export default UpdateItem;
