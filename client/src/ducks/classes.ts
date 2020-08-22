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
    ClassActionTypes,
    IClass,
    IGetClassItemAction
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

export const saga = function* () {
    yield all([
        takeEvery(GET_CLASS_REQUEST, getClassSaga),
        takeEvery(GET_CLASS_ITEM_REQUEST, getClassItemSaga)
    ]);
};