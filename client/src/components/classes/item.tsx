import React, { FunctionComponent, useEffect, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getClassItem } from 'ducks/classes';
import { RoutePropsType } from 'types/global/route-props';
import { IMatchParams } from 'types/common';
import { classItemSelector } from 'selectors/classses';
import { IClass } from 'types/store/classes';

type Props = RoutePropsType<IMatchParams, {}>;

const ClassItem: FunctionComponent<Props> = ({ match }) => {
    const dispatch = useDispatch();
    const classItem: IClass = useSelector(classItemSelector);

    useEffect(() => {
        dispatch(getClassItem(match?.params?.id));
    }, []);

    return (
        <h1>{classItem.name}</h1>
    );
};

export default memo(withRouter(ClassItem));