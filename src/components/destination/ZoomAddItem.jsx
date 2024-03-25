import React, {useCallback, useContext} from 'react';
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import {AiOutlineCloseSquare} from "react-icons/ai";
import {AddDescContext} from "../../pages/app/profiles/destination/AddNewDestination";

const ZoomAddItem = () => {
    const DescContext = useContext(AddDescContext);
    const {selectedFile, zoomFileImg, setZoomFileImg} = DescContext;

    const handleCloseZoomPortal = useCallback(() => {
        setZoomFileImg(true)
    }, []);

    return (
        zoomFileImg !== null
            ? <CustomsPortal
                className={'zoom_file_img container_modal'}>
                <div className={classNames('img_cont', {
                    isActiveZoomFile: zoomFileImg
                })}>
                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt={selectedFile?.name}/>
                    <AiOutlineCloseSquare
                        onClick={handleCloseZoomPortal}
                        className={'delete-icon'}/>
                </div>
            </CustomsPortal>
            : null
    );
};

export default ZoomAddItem;
