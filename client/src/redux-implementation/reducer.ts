import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import authReducer, { moduleName as authModule } from 'ducks/auth';
import teacherReducer, { moduleName as teacherModule } from 'ducks/teacher';

export default combineReducers({
    router,
    [authModule]: authReducer,
    [teacherModule]: teacherReducer
});