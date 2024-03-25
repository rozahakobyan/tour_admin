import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "../../../../components/LoadingPage";
import AboutItem from "../../../../components/categories/AboutItem";
import {Helmet} from "react-helmet";
import {allCategoriesRequest} from "../../../../store/action/categories";

const Categories = () => {
    const loading = useSelector(state => state.categories.loading);
    const list = useSelector(state => state.categories.list);
    const dispatch = useDispatch()

    useEffect(()=>{
         dispatch(allCategoriesRequest())
    },[])

    return (
        <div className={'categories childrenWidth'}>
            <Helmet>
                <title>categories</title>
            </Helmet>
            <h1>information about Categories</h1>
           <div className="cont_cat">
               {
                   loading ? <LoadingPage/>
                       : list.map(item => <AboutItem key={item.id} item={item}/>)
               }
           </div>
        </div>
    );
};

export default Categories;
