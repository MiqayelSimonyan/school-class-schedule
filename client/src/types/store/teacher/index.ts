import { List } from 'immutable';

import { IActionCreator } from 'types/global/action-creator';
import { ImmutableMap } from 'types/global/immutable-map';
import { ILoginRegister } from 'types/auth';
import { SetAdmin } from 'types/teacher';

export const GET_TEACHER_REQUEST = 'GET_TEACHER_REQUEST';
export const GET_TEACHER_SUCCESS = 'GET_TEACHER_SUCCESS';
export const GET_TEACHERS_REQUEST = 'GET_TEACHERS_REQUEST';
export const GET_TEACHERS_SUCCESS = 'GET_TEACHERS_SUCCESS';
export const SET_ADMIN_REQUEST = 'SET_ADMIN_REQUEST';
export const SET_ADMIN_SUCCESS = 'SET_ADMIN_SUCCESS';

export interface ITeacherState {
    teachersLoading: boolean;
    teacherLoading: boolean;
    teacher: ImmutableMap<ITeacher>;
    teachers: List<ITeacher>;
};

// actions
export interface IAddTeacherAction extends IActionCreator<ILoginRegister> {
    type: typeof GET_TEACHER_REQUEST;
};

export interface IAddTeacherSuccessAction extends IActionCreator<ITeacher> {
    type: typeof GET_TEACHER_SUCCESS;
};

export interface IGetTeachersAction extends IActionCreator {
    type: typeof GET_TEACHERS_REQUEST;
};

export interface IGetTeachersSuccessAction extends IActionCreator {
    type: typeof GET_TEACHERS_SUCCESS;
};

export interface ISetAdminAction extends IActionCreator<SetAdmin> {
    type: typeof SET_ADMIN_REQUEST;
};

export interface ISetAdminSuccessAction extends IActionCreator<SetAdmin> {
    type: typeof SET_ADMIN_SUCCESS;
};

// selector types
export interface ITeacher {
    _id?: string;
    username: string;
    role?: string;
};

export type TeacherActionTypes = IAddTeacherAction
    | IAddTeacherSuccessAction
    | IGetTeachersAction
    | IGetTeachersSuccessAction
    | ISetAdminAction
    | ISetAdminSuccessAction;