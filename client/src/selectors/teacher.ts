import { createSelector } from 'reselect';

import { moduleName } from 'ducks/teacher';

const stateSelector = (key: string) => (state: any) => state[moduleName].get(key);

export const teacherSelector = createSelector(stateSelector('teacher'), (value) => {
    return value && value.toJS ? value.toJS() : value
});

export const teachersSelector = createSelector(stateSelector('teachers'), (value) => {
    return value && value.toJS ? value.toJS() : value
});

export const teacherLoadingSelector = createSelector(stateSelector('teacherLoading'), (value) => {
    return value && value.toJS ? value.toJS() : value
});

export const teachersLoadingSelector = createSelector(stateSelector('teachersLoading'), (value) => {
    return value && value.toJS ? value.toJS() : value
});