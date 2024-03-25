import {configureStore} from "@reduxjs/toolkit";
import {users} from './reducter/users'
import {destination} from "./reducter/destinations";
import {categories} from "./reducter/categories";
import {tours} from "./reducter/tours";

const root = {
    users,
    destination,
    categories,
    tours
}

export const store = configureStore({reducer: root})
