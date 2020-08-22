import { all, takeEvery, call, put } from 'redux-saga/effects';
import { List, Map, fromJS } from 'immutable';
import { AxiosResponse } from 'axios';

import api from 'services/axios';

import { SetMapTypeAllowedData } from 'types/global/reducer-state';

import {
    ITeacherState,
    TeacherActionTypes,
    ITeacher,
    IGetTeachersAction,
    ISetAdminAction,
    GET_TEACHER_REQUEST,
    GET_TEACHER_SUCCESS,
    GET_TEACHERS_REQUEST,
    GET_TEACHERS_SUCCESS,
    SET_ADMIN_REQUEST,
    SET_ADMIN_SUCCESS
} from '../types/store/teacher';
import { SetAdmin } from 'types/teacher';

const initialState: ITeacherState = {
    teachersLoading: true,
    teacherLoading: true,
    teachers: List.of(),
    teacher: Map()
};

export const moduleName = 'teacher';

type MapTypeAllowedData = SetMapTypeAllowedData<ITeacherState>;

const initialStateMap = <MapTypeAllowedData>Map(initialState);

export default function reducer(
    state: MapTypeAllowedData = initialStateMap,
    action: TeacherActionTypes
) {
    switch (action.type) {
        case GET_TEACHER_REQUEST:
            return state
                .set('teacherLoading', true);

        case GET_TEACHER_SUCCESS:
            return state
                .set('teacherLoading', false)
                .set('teacher', fromJS(action.payload))

        case GET_TEACHERS_SUCCESS:
            return state
                .set('teachersLoading', false)
                .set('teachers', fromJS(action.payload) || state.get('teachers'))

        case SET_ADMIN_SUCCESS:
            return state
                .set('teacherLoading', false)
                .setIn(['teacher', 'role'], fromJS(action.payload));

        default:
            return state;
    };
};

/* actions */
export function getTeacher(): TeacherActionTypes {
    return {
        type: GET_TEACHER_REQUEST
    };
};

export function getTeachers(): TeacherActionTypes {
    return {
        type: GET_TEACHERS_REQUEST
    };
};

export function setAdmin(payload: SetAdmin): TeacherActionTypes {
    return {
        type: SET_ADMIN_REQUEST,
        payload
    };
};

/* saga */
export const getTeachersSaga = function* (action: Required<IGetTeachersAction>) {
    try {
        const data: AxiosResponse<Array<ITeacher>> = yield call(api, 'teachers');

        yield put({
            type: GET_TEACHERS_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    };
};

export const getTeacherSaga = function* () {
    try {
        const data: AxiosResponse<Array<ITeacher>> = yield call(api, 'teacher');

        yield put({
            type: GET_TEACHER_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    };
};

export const setAdminSaga = function* (action: Required<ISetAdminAction>) {
    const { id, admin } = action.payload;

    try {
        const data: AxiosResponse<Array<ITeacher>> = yield call(api.patch, `teacher/${id}`, { role: admin ? 'admin' : 'user' });

        yield put({
            type: SET_ADMIN_SUCCESS,
            payload: data?.data
        });
    } catch (err) {
        console.log('err', err);
    };
};

export const saga = function* () {
    yield all([
        takeEvery(GET_TEACHER_REQUEST, getTeacherSaga),
        takeEvery(GET_TEACHERS_REQUEST, getTeachersSaga),
        takeEvery(SET_ADMIN_REQUEST, setAdminSaga)
    ]);
};