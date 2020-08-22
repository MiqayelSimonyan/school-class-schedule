import { List } from 'immutable';
import { IActionCreator } from 'types/global/action-creator';
import { ImmutableMap } from 'types/global/immutable-map';

export const GET_CLASS_REQUEST = 'GET_CLASS_REQUEST';
export const GET_CLASS_SUCCESS = 'GET_CLASS_SUCCESS';
export const GET_CLASS_ITEM_REQUEST = 'GET_CLASS_ITEM_REQUEST';
export const GET_CLASS_ITEM_SUCCESS = 'GET_CLASS_ITEM_SUCCESS';

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

// selector types
export interface IClass {
    _id?: string;
    name: string;
};

export type ClassActionTypes = IGetClassAction
    | IGetClassSuccessAction
    | IGetClassItemAction
    | IGetClassItemSuccessAction;