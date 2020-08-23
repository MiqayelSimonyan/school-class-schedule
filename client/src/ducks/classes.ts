import { all, takeEvery, call, put } from 'redux-saga/effects';
import { List, Map, fromJS } from 'immutable';
import { AxiosResponse } from 'axios';

import api from 'services/axios';

import { SetMapTypeAllowedData } from 'types/global/reducer-state';

import {
    GET_CLASS_REQUEST,
    GET_CLASS_SUCCESS,
    GET_CLASS_ITEM_REQUEST,
    GET_CLASS_ITEM_SUCCESS,
    CREATE_CLASS_ITEM_REQUEST,
    CREATE_CLASS_ITEM_SUCCESS,
    UPDATE_CLASS_ITEM_REQUEST,
    UPDATE_CLASS_ITEM_SUCCESS,
    DELETE_CLASS_ITEM_REQUEST,
    DELETE_CLASS_ITEM_SUCCESS,
    ClassActionTypes,
    IClass,
    IGetClassItemAction,
    IUpdateClassItemAction,
    IDeleteClassItemAction,
    ICreateClassItemAction
} from '../types/store/classes';
import { IClassState } from 'types/store/classes';

const initialState: IClassState = {
    loading: true,
    classes: List.of(),
    classItem: Map()
};

export const moduleName = 'classes';

type MapTypeAllowedData = SetMapTypeAllowedData<IClassState>;

const initialStateMap = <MapTypeAllowedData>Map(initialState);

export default function reducer(
    state: MapTypeAllowedData = initialStateMap,
    action: ClassActionTypes
) {
    switch (action.type) {
        case GET_CLASS_REQUEST:
            return state
                .set('loading', true);

        case GET_CLASS_SUCCESS:
            return state
                .set('loading', false)
                .set('classes', fromJS(action.payload))

        case GET_CLASS_ITEM_REQUEST:
            return state
                .set('loading', true)

        case GET_CLASS_ITEM_SUCCESS:
            return state
                .set('loading', false)
                .set('classItem', fromJS(action.payload))

        case CREATE_CLASS_ITEM_REQUEST:
            return state
                .set('loading', true)

        case CREATE_CLASS_ITEM_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['classes', state.get('classes').size], action.payload);

        case UPDATE_CLASS_ITEM_REQUEST:
            return state
                .set('loading', true)

        case UPDATE_CLASS_ITEM_SUCCESS: {
            let id = action.payload?._id;
            let index = state.get('classes').toJS().findIndex(item => item._id === id);

            return state
                .set('loading', false)
                .setIn(['classes', index], fromJS(action?.payload))
                .set('classItem', fromJS(action.payload))
        }

        case DELETE_CLASS_ITEM_REQUEST:
            return state
                .set('loading', true)

        case DELETE_CLASS_ITEM_SUCCESS: {
            let id = action.payload;
            let index = id ? state.get('classes').toJS().findIndex(item => item._id === id) : -1;

            return !id ?
                state
                    .set('loading', false)
                :
                state
                    .set('loading', false)
                    .removeIn(['classes', index])
        }
        default:
            return state;
    };
};

/* actions */
export function getClasses(): ClassActionTypes {
    return {
        type: GET_CLASS_REQUEST
    };
};

export function getClassItem(payload: string): ClassActionTypes {
    return {
        type: GET_CLASS_ITEM_REQUEST,
        payload
    };
};

export function createClassItem(payload: IClass): ClassActionTypes {
    return {
        type: CREATE_CLASS_ITEM_REQUEST,
        payload
    };
};

export function updateClassItem(payload: IClass): ClassActionTypes {
    return {
        type: UPDATE_CLASS_ITEM_REQUEST,
        payload
    };
};

export function deleteClassItem(payload: string): ClassActionTypes {
    return {
        type: DELETE_CLASS_ITEM_REQUEST,
        payload
    };
};

/* saga */
export const getClassSaga = function* () {
    try {
        const data: AxiosResponse<Array<IClass>> = yield call(api, 'classes');

        yield put({
            type: GET_CLASS_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    };
};

export const getClassItemSaga = function* (action: Required<IGetClassItemAction>) {
    try {
        const data: AxiosResponse<Array<IClass>> = yield call(api, `classes/${action.payload}`);

        yield put({
            type: GET_CLASS_ITEM_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    };
};

export const createClassItemSaga = function* (action: Required<ICreateClassItemAction>) {
    const { name } = action.payload;

    try {
        const data: AxiosResponse<IClass> = yield call(api.post, 'classes', { name });

        yield put({
            type: CREATE_CLASS_ITEM_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    };
};

export const updateClassItemSaga = function* (action: Required<IUpdateClassItemAction>) {
    const { _id, name } = action.payload;

    try {
        const data: AxiosResponse<IClass> = yield call(api.patch, `classes/${_id}`, { name });

        yield put({
            type: UPDATE_CLASS_ITEM_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    };
};

export const deleteClassItemSaga = function* (action: Required<IDeleteClassItemAction>) {
    try {
        const data: AxiosResponse<{ success: boolean }> = yield call(api.delete, `classes/${action.payload}`);

        yield put({
            type: DELETE_CLASS_ITEM_SUCCESS,
            payload: data?.data.success ? action.payload : null
        });
    } catch (err) {
        console.log('err', err);
    };
};

export const saga = function* () {
    yield all([
        takeEvery(GET_CLASS_REQUEST, getClassSaga),
        takeEvery(GET_CLASS_ITEM_REQUEST, getClassItemSaga),
        takeEvery(CREATE_CLASS_ITEM_REQUEST, createClassItemSaga),
        takeEvery(UPDATE_CLASS_ITEM_REQUEST, updateClassItemSaga),
        takeEvery(DELETE_CLASS_ITEM_REQUEST, deleteClassItemSaga)
    ]);
};