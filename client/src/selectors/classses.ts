import { createSelector } from 'reselect';

import { moduleName } from 'ducks/classes';

const stateSelector = (key: string) => (state: any) => state[moduleName].get(key);

export const classesSelector = createSelector(stateSelector('classes'), (value) => {
    return value && value.toJS ? value.toJS() : value
});

export const classItemSelector = createSelector(stateSelector('classItem'), (value) => {
    return value && value.toJS ? value.toJS() : value
});