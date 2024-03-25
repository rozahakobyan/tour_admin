import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {itemTourRequest} from "../../../../store/action/tours";
import {API_URL} from "../../../../store/Api";
import LoadingPage from "../../../../components/LoadingPage";
import classNames from "classnames";

const DetailsTour = () => {
    const loading = useSelector(state => state.tours.loading);
    const item = useSelector(state => state.tours.item?.tour);
    const [src, setSrc] = useState(null);
    const [activeId, setActiveId] = useState()
    const params = useParams();
    const {id} = params
    const dispatch = useDispatch();


    useEffect(() => {
        if (id) {
            dispatch(itemTourRequest(id))
        }
    }, [id]);

    useEffect(() => {
        if (item?.featuredImage) {
            setSrc(item.featuredImage)
            setActiveId(item.id)
        }
    }, [item]);

    const handleSlider = useCallback((item) => () => {
        if (item.featuredImage) {
            setSrc(item.featuredImage)
        } else {
            setSrc(item.src)
        }
        setActiveId(item.id)
    }, [])

    if (loading) {
        return <LoadingPage/>
    }

    return (
        <div className={'details-tour childrenWidth'}>
            {
                item ? <div className={'item'}>
                        <div className={'top_about'}>
                            <div className="images">
                                <figure className={'featured_image'}>
                                    <img src={`${API_URL}/${src}`} alt={item.title}/>
                                </figure>
                                <div className={'gallery_item'}>
                                    <img
                                        onClick={handleSlider(item)}
                                        className={classNames({
                                            activeBottomImg: item.id === activeId
                                        })} src={`${API_URL}/${item.featuredImage}`} alt="images"/>
                                    {
                                        item?.galleries.map(gallery => (
                                            <img
                                                onClick={handleSlider(gallery)}
                                                className={classNames({
                                                    activeBottomImg: gallery.id === activeId
                                                })}
                                                key={gallery.id}
                                                src={`${API_URL}/${gallery.src}`} alt="images"/>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="right_about">
                                <span className={'about_list_title'}>Name: <span>{item.title}</span></span>
                                <span className={'about_list_title'}>Duration: <span>{item.duration} dey</span></span>
                                <span className={'about_list_title'}>Price: <span>{item.price}</span> AMD</span>
                                <span
                                    className={'about_list_title'}>Destination: <span>{item.destination.title}</span></span>
                                <span className={'about_list_title'}>Category: <span>{item.category.title}</span></span>
                                <p className={'desc_text'}>Description: <span>{item.description}</span></p>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};

export default DetailsTour;
