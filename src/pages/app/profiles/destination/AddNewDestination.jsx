import React, {createContext, useCallback, useEffect, useState} from 'react';
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {AiOutlineCloseSquare} from "react-icons/ai";
import useToggle from "../../../../components/hooks/useToggle";
import {addDestinationRegex} from "../../../../helpers/regex";
import ConfirmAdd from "../../../../components/destination/ConfirmAdd";
import ZoomAddItem from "../../../../components/destination/ZoomAddItem";
import {Helmet} from "react-helmet";

export const AddDescContext = createContext(null);
const AddNewDestination = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [zoomFileImg, , setZoomFileImg] = useToggle(null);
    const [text, setText] = useState('');
    const [errors, setErrors] = useState({});
    const [resultDestination, setResultDestination] = useState(null);

    const handleFileChange = useCallback((event) => {
        setSelectedFile(event.target.files[0]);
    }, []);

    const handleChange = useCallback((e) => {
        setText(e.target.value)
    }, []);

    const handleOpenZoomPortal = useCallback(() => {
        setZoomFileImg(false)
    }, []);

    useEffect(() => {
        if (zoomFileImg) {
            const time = setTimeout(() => {
                setZoomFileImg(null)
            }, 500)
            return () => clearTimeout(time)
        }
    }, [zoomFileImg]);

    useEffect(() => {
        if (resultDestination) {
            const time = setTimeout(() => {
                setResultDestination(null)
            }, 500)
            return () => clearTimeout(time)
        }
    }, [resultDestination]);

    const handleRemove = useCallback((event) => {
        setSelectedFile(null)
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (!addDestinationRegex.test(text)) {
            setErrors({
                name: 'is not allowed to be empty'
            })
        } else if (selectedFile === null) {
            setErrors({
                file: 'is not allowed to be empty'
            })
        } else {
            setResultDestination(false)
            setErrors({})
        }
    }, [text, selectedFile]);


    const handleRemoveInputText = useCallback(() => {
        setText('')
    }, []);

    return (
        <div className={'destination childrenWidth'}>
            <Helmet>
                <title>add new destination</title>
            </Helmet>
            <div className="desc_cont">
                <form onSubmit={handleSubmit}>
                    <div className={'item-desc'}>
                        <input
                            value={text}
                            onChange={handleChange}
                            placeholder={'name...'}
                            type={'text'}/>
                        {
                            text.length >= 3 ? <AiOutlineCloseSquare
                                    onClick={handleRemoveInputText}
                                    className={'remove-icon'}/>
                                : null
                        }
                    </div>
                    {errors.name ? <small>{errors.name}</small> : null}
                    <div className={'item_file'}>
                        <label
                            htmlFor="file-upload"
                            className="custom-file-upload">
                            <MdOutlineDriveFolderUpload
                                className={'icon'}/>
                            Choose file
                        </label>
                        <input
                            name={'files'}
                            accept="image/*"
                            id="file-upload"
                            onChange={handleFileChange}
                            type="file"/>
                        {errors.file ? <small>{errors.file}</small> : null}
                    </div>
                    <button>Continue</button>
                    {
                        selectedFile
                            ? <div
                                className={'img_url'}>
                               <span className={'close'} onClick={handleRemove}>
                                    <AiOutlineCloseSquare
                                        className={'delete-icon'}/>
                               </span>
                                <img
                                    onClick={handleOpenZoomPortal}
                                    title={'To see more clearly Click mi'}
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                                    alt={selectedFile?.name}/>
                            </div>
                            : null
                    }
                </form>
            </div>
            <AddDescContext.Provider
                value={{
                    selectedFile,
                    zoomFileImg,
                    text,
                    errors,
                    resultDestination,
                    setResultDestination,
                    setErrors,
                    setZoomFileImg
                }}>
                <ZoomAddItem/>
                <ConfirmAdd/>
            </AddDescContext.Provider>
        </div>
    );
};

export default AddNewDestination;
