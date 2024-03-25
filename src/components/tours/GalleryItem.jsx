import React, {useCallback} from 'react';
import {MdDeleteForever} from "react-icons/md";
import {API_URL} from "../../store/Api";
import CarouselGallery from "./CarouselGallery";
import {useDispatch} from "react-redux";
import {deleteGalleryItemTourRequest} from "../../store/action/tours";

const GalleryItem = ({
                         item,
                         setTour,
                         tour,
                         setActiveGalleryIndex,
                         setShowCarousel,
                         index,
                         showCarousel,
                         activeGalleryIndex
                     }) => {
    const dispatch = useDispatch()
    const handleDeleteImages = useCallback((fileItem) => () => {
        const filterTour = tour.gallery.filter(file => {
            if (file.id) {
                if (file.id !== fileItem.id) {
                    return item
                }
            } else {
                if (fileItem.name !== file.name) {
                    return item
                }
            }
        })
        if (fileItem.id) {
            dispatch(deleteGalleryItemTourRequest(fileItem.id))
        }
        setTour({...tour, gallery: filterTour})
    }, [tour]);

    const handleGalleryListIndex = useCallback((index) => () => {
        setActiveGalleryIndex(index)
        setShowCarousel(false)
    }, []);

    return (
        <li>
            <figure>
                <img onClick={handleGalleryListIndex(index)}
                     src={item.src ? `${API_URL}${item.src}` : URL.createObjectURL(item)}
                     alt={item.name || ""}/>
                <span className={'delete'}
                      onClick={handleDeleteImages(item)}>
                         <MdDeleteForever/>
                        </span>
            </figure>
            <CarouselGallery
                gallery={tour.gallery}
                setActiveGalleryIndex={setActiveGalleryIndex}
                activeGalleryIndex={activeGalleryIndex}
                setShowCarousel={setShowCarousel}
                showCarousel={showCarousel}
            />
        </li>
    );
};

export default GalleryItem;