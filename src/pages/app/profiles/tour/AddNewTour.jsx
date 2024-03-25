import React, {createContext, useCallback, useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import RemoveValueIcon from "../../../../components/tours/RemoveValueIcon";
import FeaturedImages from "../../../../components/tours/FeaturedImages";
import SelectDestinationList from "../../../../components/tours/SelectDestinationList";
import SelectCategoriesList from "../../../../components/tours/SelectCategoriesList";
import ScheduleCalendar from "../../../../components/tours/ScheduleCalendar";
import FileGalery from "../../../../components/tours/FileGallery";
import {useDispatch, useSelector} from "react-redux";
import {addTourRequest} from "../../../../store/action/tours";
import {validateAddTour} from "../../../../helpers/regex";
import CheckModal from "../../../../components/tours/CheckModal";
import {SyncLoader} from "react-spinners";

export const tourState = {
    title: "",
    featuredImage: null,
    destinationId: '',
    categoryId: '',
    duration: "",
    schedule: [],
    price: '',
    gallery: [],
    description: ''
}
export const TourContext = createContext(null);
const AddNewTour = () => {
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
    const [showCarousel, setShowCarousel] = useState(null);
    const [status, setStatus] = useState(null);
    const [tour, setTour] = useState(tourState);
    const [filesErrors, setFilesErrors] = useState({})
    const dispatch = useDispatch();
    const errors = useSelector(state => state.tours.errors);
    const loading = useSelector(state => state.tours.loading);
    const handleChange = useCallback((key) => (event) => {
        setTour(prevState => ({
            ...prevState,
            [key]: event.target.value
        }))
    }, []);

    const handleCreateTour = useCallback(async (e) => {
        e.preventDefault()
        const fileErrors = validateAddTour(tour)
        setFilesErrors(fileErrors)
        const {payload} = await dispatch(addTourRequest(tour))
        if (payload.status === 'ok') {
            setStatus(false)
        }
    }, [tour]);

    return (
        <TourContext.Provider value={{
            tour,
            setTour,
            errors,
            setActiveGalleryIndex,
            activeGalleryIndex,
            showCarousel,
            setShowCarousel,
            filesErrors,
            setFilesErrors

        }}>
            <div className={'add_new_tour childrenWidth'}>
                <Helmet>
                    <title>add new tour</title>
                </Helmet>
                <form>
                    <div className="cont_form">
                        <div className="left_item">
                            <div className="input_item">
                                <input
                                    value={tour.title}
                                    onChange={handleChange('title')}
                                    placeholder={"Title tour..."}
                                    type="text"/>
                                <RemoveValueIcon
                                    setTour={setTour}
                                    keys={'name'}
                                    value={tour.title}/>
                            </div>
                            {errors?.title ? <small className={'errors_message'}>{errors.title}</small> : null}
                            <FeaturedImages/>
                            <SelectDestinationList setTour={setTour} errors={errors}/>
                            <SelectCategoriesList setTour={setTour} errors={errors}/>

                            <div className={'input_item m_top'}>
                                <input
                                    value={tour.duration}
                                    onChange={handleChange('duration')}
                                    placeholder={"Duration..."}
                                    type="text"/>
                                <RemoveValueIcon
                                    setTour={setTour}
                                    keys={'duration'}
                                    value={tour.duration}/>
                            </div>
                            {errors.duration ? <small className={'errors_message'}>{errors.duration}</small> : null}
                        </div>
                        <div className="right_item">
                            <ScheduleCalendar/>
                            <div className="input_item_right">
                                <div className={'price_row'}>
                                    <input
                                        placeholder={'Price...'}
                                        value={tour.price}
                                        onChange={handleChange('price')}
                                        type="text"/>
                                    <RemoveValueIcon
                                        setTour={setTour}
                                        keys={'price'}
                                        value={tour.price}/>
                                </div>
                            </div>
                            {errors.price ? <small className={'errors_message'}>{errors.price}</small> : null}
                            <FileGalery/>

                            <div className={'desc_text'}>
                                <textarea
                                    onChange={handleChange('description')}
                                    value={tour.description}
                                    placeholder={'Description text...'}/>
                            </div>
                            {errors.description ?
                                <small className={'errors_message'}>{errors.description}</small> : null}
                        </div>
                    </div>
                    <button onClick={handleCreateTour}>{
                        loading ?
                            <SyncLoader
                                size={11}
                                color={'#fff'}/> : "Save"
                    }</button>
                </form>
                <CheckModal setShow={setStatus} show={status}/>
            </div>
        </TourContext.Provider>
    )
        ;
};

export default AddNewTour;
