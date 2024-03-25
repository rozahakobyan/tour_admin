import React from 'react';
import {Route, Routes} from "react-router-dom";
import Account from "./profiles/Account";
import Profile from "./profiles/Profile";
import Destination from "./profiles/destination/Destination";
import SettingsDestination from "./profiles/destination/SettingsDestination";
import Tour from "./profiles/tour/Tour";
import AllTours from "./profiles/tour/AllTours";
import AddNewTour from "./profiles/tour/AddNewTour";
import AllCategories from "./profiles/categories/AllCategories";
import AddNewCategories from "./profiles/categories/AddNewCategories";
import Services from "./profiles/Services";
import Message from "./profiles/Message";
import Hotels from "./profiles/Hotels";
import Food from "./profiles/Food";
import Cars from "./profiles/Cars";
import Users from "./profiles/Users";
import Settings from "./profiles/Settings";
import Help from "./profiles/Help";
import AddNewDestination from "./profiles/destination/AddNewDestination";
import EditProfile from "./EditProfile";
import EditAccountPassword from "./EditAccountPassword";
import Categories from "./profiles/categories/Categories";
import DetailsTour from "./profiles/tour/DetailsTour";
import UpdateTour from "./profiles/tour/UpdateTour";

const ProfileNavigate = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Account/>}>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/destination'} element={<Destination/>}/>
                <Route path={'/destination/settings-destination'} element={<SettingsDestination/>}/>
                <Route path={'/destination/add-new-destination'} element={<AddNewDestination/>}/>
                <Route path={'/categories'} element={<Categories/>}/>
                <Route path={'/categories/settings-categories'} element={<AllCategories/>}/>
                <Route path={'/categories/add-new-categories'} element={<AddNewCategories/>}/>
                <Route path={'/tour'} element={<Tour/>}/>
                <Route path={'/tour/settings-tours'} element={<AllTours/>}/>
                <Route path={'/tour/add-new-tour'} element={<AddNewTour/>}/>
                <Route path={'/tour-details/:id'} element={<DetailsTour/>}/>
                <Route path={'/tour-update/:id'} element={<UpdateTour/>}/>
                <Route path={'/services'} element={<Services/>}/>
                <Route path={'/services/message'} element={<Message/>}/>
                <Route path={'/hotels'} element={<Hotels/>}/>
                <Route path={'/food'} element={<Food/>}/>
                <Route path={'/cars'} element={<Cars/>}/>
                <Route path={'/users/:page'} element={<Users/>}/>
                <Route path={'/settings'} element={<Settings/>}/>
                <Route path={'/help'} element={<Help/>}/>
            </Route>
            <Route path={'/edit-profile'} element={<EditProfile/>}/>
            <Route path={'/edit-account-password'} element={<EditAccountPassword/>}/>
            <Route path={'*'} element={<Account/>}/>
        </Routes>
    );
};

export default ProfileNavigate;
