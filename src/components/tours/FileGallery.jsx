import React, {useCallback, useContext} from 'react';
import {MdDeleteForever, MdOutlineDriveFolderUpload} from "react-icons/md";
import {TourContext} from "../../pages/app/profiles/tour/AddNewTour";
import CarouselGallery from "./CarouselGallery";

const FileGallery = () => {
    const {
        setTour,
        tour,
        setActiveGalleryIndex,
        setShowCarousel,
        filesErrors,
        setFilesErrors,
        activeGalleryIndex,
        setShowCarouse,
        showCarousel
    } = useContext(TourContext);

    const handleChangeFiles = useCallback((e) => {
        const file = [...e.target.files].map(item => {
            item[Symbol('id_img')] = Math.floor(Math.random() * 1457)
            return item
        })
        setTour(arg => ({
            ...arg,
            gallery: [...arg.gallery, ...file]
        }))
        setFilesErrors(arg => ({
            ...arg,
            gallery: ''
        }))

    }, []);

    const handleDeleteImages = useCallback((item) => () => {
        const symbols = Object.getOwnPropertySymbols(item)
        const filterTour = tour.gallery.filter(file => {
            const symbolsFilter = Object.getOwnPropertySymbols(file)
            if (item[symbols[0]] !== file[symbolsFilter[0]]) {
                return item
            }
        })
        setTour({...tour, gallery: filterTour})
    }, [tour]);

    const handleGalleryListIndex = useCallback((index) => () => {
        setActiveGalleryIndex(index)
        setShowCarousel(false)
    }, [])


    return (
        <div className={'add_gallery'}>
            <div className={'file_gallery custom-file'}>
                <label
                    htmlFor="files_gallery"
                    className="custom-file-upload">
                    <MdOutlineDriveFolderUpload
                        className={'icon'}/>
                    Choose file
                </label>
                <input
                    onChange={handleChangeFiles}
                    name={'files_gallery'}
                    accept="image/*"
                    id="files_gallery"
                    multiple
                    type="file"/>
            </div>
            {
                tour.gallery.length !== 0
                    ?
                    <ul className={'gallery_list'}>
                        {
                            tour.gallery.map((item, index) => {
                                const symbols = Object.getOwnPropertySymbols(item)
                                return (
                                    <li key={item[symbols[0]]}>
                                        <figure>
                                            <img onClick={handleGalleryListIndex(index)}
                                                 src={URL.createObjectURL(item)}
                                                 alt={item.name}/>
                                            <span className={'delete'} onClick={handleDeleteImages(item)}>
                                            <MdDeleteForever/>
                                       </span>
                                        </figure>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    : null
            }

            <CarouselGallery
                gallery={tour.gallery}
                setActiveGalleryIndex={setActiveGalleryIndex}
                activeGalleryIndex={activeGalleryIndex}
                setShowCarouse={setShowCarousel}
                showCarousel={showCarousel}
            />
            {filesErrors.gallery ? <small className={'errors_message'}>{filesErrors.gallery}</small> : null}
        </div>
    );
};

export default FileGallery;
