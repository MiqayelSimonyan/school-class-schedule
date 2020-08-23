import { List } from 'immutable';
import { IActionCreator } from 'types/global/action-creator';
import { ImmutableMap } from 'types/global/immutable-map';

export const GET_CLASS_REQUEST = 'GET_CLASS_REQUEST';
export const GET_CLASS_SUCCESS = 'GET_CLASS_SUCCESS';
export const GET_CLASS_ITEM_REQUEST = 'GET_CLASS_ITEM_REQUEST';
export const GET_CLASS_ITEM_SUCCESS = 'GET_CLASS_ITEM_SUCCESS';
export const CREATE_CLASS_ITEM_REQUEST = 'CREATE_CLASS_ITEM_REQUEST';
export const CREATE_CLASS_ITEM_SUCCESS = 'CREATE_CLASS_ITEM_SUCCESS';
export const UPDATE_CLASS_ITEM_REQUEST = 'UPDATE_CLASS_ITEM_REQUEST';
export const UPDATE_CLASS_ITEM_SUCCESS = 'UPDATE_CLASS_ITEM_SUCCESS';
export const DELETE_CLASS_ITEM_REQUEST = 'DELETE_CLASS_ITEM_REQUEST';
export const DELETE_CLASS_ITEM_SUCCESS = 'DELETE_CLASS_ITEM_SUCCESS';

export interface IClassState {
    loading: boolean;
    classes: List<IClass>;
    classItem: ImmutableMap<IClass>;
};

// actions
export interface IGetClassAction extends IActionCreator {
    type: typeof GET_CLASS_REQUEST;
};

export interface IGetClassSuccessAction extends IActionCreator {
    type: typeof GET_CLASS_SUCCESS;
};

export interface IGetClassItemAction extends IActionCreator<string> {
    type: typeof GET_CLASS_ITEM_REQUEST;
};

export interface IGetClassItemSuccessAction extends IActionCreator {
    type: typeof GET_CLASS_ITEM_SUCCESS;
};

export interface ICreateClassItemAction extends IActionCreator<IClass> {
    type: typeof CREATE_CLASS_ITEM_REQUEST;
};

export interface ICreateClassItemSuccessAction extends IActionCreator<IClass> {
    type: typeof CREATE_CLASS_ITEM_SUCCESS;
};

export interface IUpdateClassItemAction extends IActionCreator<IClass> {
    type: typeof UPDATE_CLASS_ITEM_REQUEST;
};

export interface IUpdateClassItemSuccessAction extends IActionCreator<IClass> {
    type: typeof UPDATE_CLASS_ITEM_SUCCESS;
};

export interface IDeleteClassItemAction extends IActionCreator<string> {
    type: typeof DELETE_CLASS_ITEM_REQUEST;
};

export interface IDeleteClassItemSuccessAction extends IActionCreator<string> {
    type: typeof DELETE_CLASS_ITEM_SUCCESS;
};

// selector types
export interface IClass {
    _id?: string;
    name: string;
    lessons?: Array<any>;
};

export type ClassActionTypes = IGetClassAction
    | IGetClassSuccessAction
    | IGetClassItemAction
    | IGetClassItemSuccessAction
    | ICreateClassItemAction
    | ICreateClassItemSuccessAction
    | IUpdateClassItemAction
    | IUpdateClassItemSuccessAction
    | IDeleteClassItemAction
    | IDeleteClassItemSuccessAction;