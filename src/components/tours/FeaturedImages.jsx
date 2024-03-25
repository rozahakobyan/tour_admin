import React, {useCallback, useContext, useEffect, useState} from 'react';
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {TourContext} from "../../pages/app/profiles/tour/AddNewTour";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import {FaWindowClose} from "react-icons/fa";

const FeaturedImages = () => {
    const [showFeatured, setShowFeatured] = useState(null);
    const tourContext = useContext(TourContext);
    const {
        tour,
        setTour,
        filesErrors,
        setFilesErrors
    } = tourContext;

    const handleToggle = useCallback(() => {
        setShowFeatured(false)
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowFeatured(true)
    }, []);


    const handleChangeFile = useCallback((e) => {
        setTour({...tour, featuredImage: e.target.files[0]})
        setFilesErrors(arg => ({
            ...arg,
            featuredImage: ''
        }))
    }, [tour]);

    useEffect(() => {
        if (showFeatured) {
            const time = setTimeout(() => {
                setShowFeatured(null)
            }, 650)
            return () => clearTimeout(time)
        }
    }, [showFeatured])

    return (
        <div className={'featured_images'}>
            <div className="row_featured">
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
                {
                    tour.featuredImage !== null ?
                        <figure>
                            <img onClick={handleToggle} src={URL.createObjectURL(tour?.featuredImage)}
                                 alt={tour.featuredImage.name}/>
                            {
                                showFeatured !== null ?
                                    <CustomsPortal className={'zoom_featured container_modal'}>
                                        <div className={classNames('modal', {
                                            isActive: showFeatured === true
                                        })}>
                                            <FaWindowClose onClick={handleCloseModal} className={'close'}/>
                                            <img src={URL.createObjectURL(tour?.featuredImage)}
                                                 alt={tour?.featuredImage?.name}/>
                                        </div>
                                    </CustomsPortal>
                                    : null
                            }
                        </figure>
                        : null
                }
            </div>
            {filesErrors.featuredImage ? <small className={'errors_message'}>{filesErrors.featuredImage}</small> : null}
        </div>
    );
};

export default FeaturedImages;
