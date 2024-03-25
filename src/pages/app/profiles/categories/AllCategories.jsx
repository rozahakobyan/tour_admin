import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {allCategoriesRequest} from "../../../../store/action/categories";
import LoadingPage from "../../../../components/LoadingPage";
import SettingsItem from "../../../../components/categories/SettingsItem";

const AllCategories = () => {
    const loading = useSelector(state => state.categories.loading);
    const isLoading = useSelector(state => state.categories.message?.isLoading)
    const list = useSelector(state => state.categories.list);
    const [updateItem, setUpdateItem] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allCategoriesRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'all-categories childrenWidth'}>
            <Helmet>
                <title>all categories </title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading && isLoading === undefined ? <LoadingPage/>
                        : list.map(item =>
                            <SettingsItem
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                item={item}/>)
                }
            </div>
        </div>
    );
};

export default AllCategories;
