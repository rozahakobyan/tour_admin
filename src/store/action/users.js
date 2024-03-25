import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Account} from "../../helpers/account";
import {Api} from "../Api";

export const removeUserLogout = createAction('remove/user', (payload) => {
    return {
        payload
    }
})
export const scrollStatus = createAction('scroll/status', (payload = null) => {
    return {
        payload
    }
});

export const userLoginRequest = createAsyncThunk('user/auth', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.login(payload)
        console.log(data,'hello')
        const {token, user} = data
        Account.sendProfileStrong(user)
        Account.sendTokenStrong(token)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});
export const userProfileRequest = createAsyncThunk('user/profile', async (_, thunkAPI) => {
    try {
        const {data} = await Api.profile()
        const {profile} = data
        Account.sendProfileStrong(profile)
        return profile
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const userForgetPassSendEmail = createAsyncThunk('user/send-email-forget', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.forgetSendEmail(payload)
        const {message} = data
        return message
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const userVerificationEmailCode = createAsyncThunk('user/verification-email-code', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.verificationEmailCode(payload)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const userForgetPassword = createAsyncThunk('user/forgot-password', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.forgetPassword(payload)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});

export const userUpdateProfileRequest = createAsyncThunk('user/update-profile', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.updateProfile(payload)
        thunkAPI.dispatch(userProfileRequest())
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const userUpdateProfilePasswordRequest = createAsyncThunk('user/update-profile-password', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.forgetPasswordProfile(payload)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const usersListRequest = createAsyncThunk('user/usersListRequest', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.usersList(payload)
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});


export const usersDeleteRequest = createAsyncThunk('user/usersDeleteRequest', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.usersDelete(payload.id)
        thunkAPI.dispatch(usersListRequest(payload))
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});
