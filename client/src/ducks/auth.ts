import { AxiosResponse } from 'axios';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import { Map, fromJS } from 'immutable';

import { IAuthState, AuthActionTypes } from 'types/store/auth';
import { SetMapTypeAllowedData } from 'types/global/reducer-state';

import history from '../session-history';
import api from 'services/axios';

import {
    IS_AUTH_REQUEST,
    IS_AUTH_SUCCESS,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS,
    LOG_IN_REGISTER_REQUEST,
    AUTH_ERROR_SUCCESS
} from '../types/store/auth';
import { IAddTeacherAction, ITeacher, GET_TEACHER_SUCCESS } from 'types/store/teacher';
import { ILoginRegister, IIsAuth } from 'types/auth';
import { IIndexSignature } from 'types/global/index-signature';

const initialState: IAuthState = {
    loading: false,
    isAuth: Map(),
    errors: Map({})
};

export const moduleName = 'auth';

type MapTypeAllowedData = SetMapTypeAllowedData<IAuthState>;

const initialStateMap = <MapTypeAllowedData>Map(initialState);

export default function reducer(
    state: MapTypeAllowedData = initialStateMap,
    action: AuthActionTypes
) {
    switch (action.type) {
        case IS_AUTH_REQUEST:
            return state
                .set('loading', true);

        case LOG_IN_REGISTER_REQUEST:
            return state
                .set('loading', true)

        case IS_AUTH_SUCCESS:
            return state
                .set('loading', false)
                .set('isAuth', fromJS({ auth: action.payload }))
                .set('errors', fromJS({}))

        case SIGN_OUT_REQUEST:
            return state
                .set('loading', true)

        case SIGN_OUT_SUCCESS:
            return state
                .set('isAuth', fromJS({ auth: false }))

        case AUTH_ERROR_SUCCESS:
            return state
                .set('loading', false)
                .set('errors', fromJS(action.payload))

        default:
            return state;
    };
};

/* actions */
export function loginRegister(payload: ILoginRegister): AuthActionTypes {
    return {
        type: LOG_IN_REGISTER_REQUEST,
        payload
    };
};

export function isAuth(): AuthActionTypes {
    return {
        type: IS_AUTH_REQUEST
    };
};

export function signOut(): AuthActionTypes {
    return {
        type: SIGN_OUT_REQUEST
    };
};

export function setAuthError(payload: IIndexSignature<string>): AuthActionTypes {
    return {
        type: AUTH_ERROR_SUCCESS,
        payload
    }
};

/* saga */
export const loginRegisterSaga = function* (action: Required<IAddTeacherAction>) {
    const { mode, teacher } = action.payload;

    try {
        const data: AxiosResponse<ITeacher> = yield call(api.post, mode, teacher);

        yield put({
            type: IS_AUTH_SUCCESS,
            payload: true
        });

        yield put({ type: GET_TEACHER_SUCCESS, payload: data?.data });

        history.push(data?.data?.role == 'superadmin' ? '/teachers' : '/classes');
    } catch (error) {
        yield put(setAuthError(error.response?.data));
    }
};

export const isAuthSaga = function* () {
    try {
        const data: AxiosResponse<IIsAuth> = yield call(api, 'isAuth');

        yield put({
            type: IS_AUTH_SUCCESS,
            payload: data?.data?.isAuth,
        });
    } catch (err) {
        console.log('err', err);
    }
};

export const signOutSaga = function* () {
    try {
        const data: AxiosResponse<{ _id: string, message: string }> = yield call(api, 'signOut');

        yield put({
            type: SIGN_OUT_SUCCESS,
            payload: data?.data,
        });

        yield put({ type: GET_TEACHER_SUCCESS, payload: null });

        history.push('/');
    } catch (err) {
        console.log('err', err);
    }
};

export const saga = function* () {
    yield all([
        takeEvery(LOG_IN_REGISTER_REQUEST, loginRegisterSaga),
        takeEvery(IS_AUTH_REQUEST, isAuthSaga),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ]);
};