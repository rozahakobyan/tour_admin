import React, {useCallback} from 'react';
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import {FaWindowClose} from "react-icons/fa";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {API_URL} from "../../store/Api";
import {useDispatch} from "react-redux";
import {isLoading, updateCategoriesRequest} from "../../store/action/categories";

const UpdateItem = ({updateItem, setUpdateItem}) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleChange = useCallback((e) => {
        const text = e.target.value
        setUpdateItem({...updateItem, title: text})
    }, [updateItem]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, icon: file})
    }, [updateItem]);


    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(updateCategoriesRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_categories container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={handleChange}
                                    value={updateItem.title || ''}
                                    type="text"
                                />
                            </div>
                            <div className={'row_img'}>
                                <div>
                                    <div className={'custom-file'}>
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
                                        updateItem?.icon?.name
                                            ? URL.createObjectURL(updateItem.icon)
                                            : `${API_URL}/${updateItem.icon}`}
                                         alt={updateItem.title}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
};

export default UpdateItem;
