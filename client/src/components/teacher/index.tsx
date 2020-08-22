import React, { memo, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import { isAuthSelector } from 'selectors/auth';
import { teacherSelector, teachersSelector, teachersLoadingSelector } from 'selectors/teacher';

import Teachers from './teachers';

import Loading from 'components/common/loading';

import { RoutePropsType } from 'types/global/route-props';
import { ITeacher } from 'types/store/teacher';
import { IStoreIsAuth } from 'types/store/auth';
import { IMatchParams } from 'types/common';

import styles from './styles';

import 'assets/styles/pages/teacher.scss';

const useStyles = styles;

type Props = RoutePropsType<IMatchParams, {}>;

const Teacher: FunctionComponent<Props> = ({ match }) => {
    let teachersLoading: Array<ITeacher> = useSelector(teachersLoadingSelector);
    let teachers: Array<ITeacher> = useSelector(teachersSelector);
    let teacher: ITeacher = useSelector(teacherSelector);
    let isAuth: IStoreIsAuth = useSelector(isAuthSelector);

    const classes = useStyles();

    return (
        !isAuth ? null :
            <div className="teachers_wrapper">
                {teachersLoading ? <Loading /> : !teachers.length ? <h2 style={{ textAlign: 'center' }}>No Teachers</h2> :
                    <>
                        <Grid container>
                            <Grid item xs={12} className={classes.title}>
                                <Typography variant="h5" className="header-message">Teachers</Typography>
                                <Teachers classes={classes} teachers={teachers} />
                            </Grid>
                        </Grid>
                    </>
                }
            </div>
    )
};

export default memo(Teacher);