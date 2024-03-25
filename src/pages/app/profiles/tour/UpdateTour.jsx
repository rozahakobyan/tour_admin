import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {itemTourRequest, updateTourRequest} from "../../../../store/action/tours";
import {useNavigate, useParams} from "react-router-dom";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {API_URL} from "../../../../store/Api";
import SelectDestinationList from "../../../../components/tours/SelectDestinationList";
import SelectCategoriesList from "../../../../components/tours/SelectCategoriesList";
import {SyncLoader} from "react-spinners";
import DatePicker from "react-datepicker";
import ScheduleUpdateList from "../../../../components/tours/ScheduleUpdateList";
import GalleryItem from "../../../../components/tours/GalleryItem";

const UpdateTour = () => {
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
    const [showCarousel, setShowCarousel] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [tour, setTour] = useState(null);
    const loading = useSelector(state => state.tours.loading)
    const item = useSelector(state => state.tours.item?.tour);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = params;

    useEffect(() => {
        if (id) {
            dispatch(itemTourRequest(id))
        }
    }, [id]);

    useEffect(() => {
        if (item) {
            const {category, destination, galleries, rating, toursteps, tourschedules, id, ...data} = item
            setTour({
                ...data,
                schedule: tourschedules,
                gallery: galleries,
                categoryId: category.id,
                destinationId: destination.id
            })
        }
    }, [item]);

    const handleChange = useCallback((key) => (event) => {
        setTour(prevState => ({
            ...prevState,
            [key]: event.target.value
        }))
    }, []);

    const handleChangeFile = useCallback((e) => {
        setTour({...tour, featuredImage: e.target.files[0]})
    }, [tour]);

    const handleAddDate = useCallback(() => {
        if (selectedDate !== '') {
            setTour(arg => ({
                ...arg,
                schedule: [...arg.schedule, selectedDate]
            }))
        }
    }, [selectedDate]);

    const handleChangeFilesGallery = useCallback((e) => {
        const file = [...e.target.files].map(item => {
            return item
        })
        setTour(arg => ({
            ...arg,
            gallery: [...arg.gallery, ...file]
        }))
    }, []);


    const handleCreateTour = useCallback(async (e) => {
        e.preventDefault()
        const {gallery, schedule, ...data} = tour
        const filteredGallery = gallery.filter(item => {
            return item.size
        });

        const filteredDate = schedule.filter(item => {
            return item.date === undefined
        });

        const {payload} = await dispatch(updateTourRequest({
            id,
            tour: {
                ...data,
                gallery: filteredGallery,
                schedule: filteredDate
            }
        }))

        if(payload.status === "ok"){
            navigate(`/tour/settings-tours`)
        }
    }, [tour]);

    return (
        tour &&
        <div className={'update_tour childrenWidth'}>
            <form>
                <div className={'cont_form'}>
                    <div className="left_item">
                        <div className="input_item">
                            <input
                                value={tour.title}
                                onChange={handleChange('title')}
                                placeholder={"Title tour..."}
                                type="text"/>
                        </div>
                        <div className="featuredImage">
                            <div className="file_btn">
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
                            </div>
                            <figure>
                                <img
                                    src={tour.featuredImage?.name ? URL.createObjectURL(tour?.featuredImage)
                                        : `${API_URL}${tour.featuredImage}`}
                                    alt={tour?.title}/>
                            </figure>
                        </div>

                        <SelectDestinationList setTour={setTour} item={item} errors={{}}/>
                        <SelectCategoriesList setTour={setTour} item={item} errors={{}}/>
                        <div className="input_item">
                            <input
                                value={tour.duration}
                                onChange={handleChange('duration')}
                                placeholder={"Duration"}
                                type="text"/>
                        </div>
                    </div>
                    <div className="right_item">
                        <div className={'schedule_calendar'}>
                            <div className="row">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={setSelectedDate}
                                    showTimeSelect
                                    placeholderText="Select Date and Time"
                                    timeFormat="HH:mm"
                                    timeIntervals={1}
                                    timeCaption="Time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                                <div onClick={handleAddDate} className={'btn'}>Add Date</div>
                            </div>
                            <ul className={'schedule_list'}>
                                {
                                    tour.schedule &&
                                    tour.schedule.map((item, index) =>
                                        <ScheduleUpdateList
                                            setTour={setTour}
                                            setSelectedDate={setSelectedDate}
                                            tour={tour}
                                            key={index}
                                            item={item}/>)
                                }
                            </ul>
                        </div>
                        <div className={'price_row'}>
                            <input
                                placeholder={'Price...'}
                                value={tour.price}
                                onChange={handleChange('price')}
                                type="text"/>
                        </div>
                        <div className={'add_gallery'}>
                            <div className={'file_gallery '}>
                                <label
                                    htmlFor="files_gallery"
                                    className="custom-file-upload">
                                    <MdOutlineDriveFolderUpload
                                        className={'icon'}/>
                                    Choose file
                                </label>
                                <input
                                    onChange={handleChangeFilesGallery}
                                    name={'files_gallery'}
                                    accept="image/*"
                                    id="files_gallery"
                                    multiple
                                    type="file"/>
                            </div>
                            <ul className={'gallery_list'}>
                                {tour.gallery &&
                                    tour.gallery.map((item, index) =>
                                        <GalleryItem
                                            key={index}
                                            index={index}
                                            showCarousel={showCarousel}
                                            setShowCarousel={setShowCarousel}
                                            setActiveGalleryIndex={setActiveGalleryIndex}
                                            activeGalleryIndex={activeGalleryIndex}
                                            tour={tour}
                                            setTour={setTour}
                                            item={item}/>
                                    )
                                }
                            </ul>
                        </div>
                        <div className={'desc_text'}>
                                <textarea
                                    onChange={handleChange('description')}
                                    value={tour.description}
                                    placeholder={'Description text...'}/>
                        </div>
                    </div>
                </div>
                <button onClick={handleCreateTour}>{
                    loading ?
                        <SyncLoader
                            size={11}
                            color={'#fff'}/> : "Save"
                }</button>
            </form>
        </div>
    );
};

export default UpdateTour;