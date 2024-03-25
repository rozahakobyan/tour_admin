import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCategoriesRequest} from "../../../../store/action/categories";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";

const AddNewCategories = () => {
    const [categories, setCategories] = useState({title: "", icon: null});
    const errors = useSelector(state => state.categories.errors);
    const loading = useSelector(state => state.categories.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e) => {
        const text = e.target.value
        setCategories({...categories, title: text});
    }, [categories]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setCategories({...categories, icon: file})
    }, [categories]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(addCategoriesRequest(categories));
        if (payload?.status === 'ok') {
            navigate('/categories/settings-categories')
            Account.setNavbarUrlPathSub('settings-categories')
        }
    }, [categories]);

    return (
        <div className={'tour_categories childrenWidth'}>
            <Helmet>
                <title>add new categories</title>
            </Helmet>
            <div className="tour_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={categories.title}
                                onChange={handleChangeText}
                                placeholder={'title...'}
                                type="text"/>
                        </div>
                        {errors.title ? <small>{errors.title}</small> : null}
                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload"
                                className="custom-file">
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
                            {errors.file ? <small>{errors.file}</small> : null}
                        </div>
                        <Button title={'Save'} loading={loading}/>
                    </div>
                    {
                        categories.icon ?
                            <figure className={'icon_file_img'}>
                                <img src={URL.createObjectURL(categories?.icon)} alt={categories.icon?.name}/>
                            </figure>
                            : null
                    }
                </form>
            </div>
        </div>
    );
};

export default AddNewCategories;
