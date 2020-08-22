import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import Header from 'components/shared/header';
import HomePage from 'components/home';
import PageNotFound from 'components/page-not-found';
import Teacher from 'components/teacher';
import PrivateRoute from 'components/common/private-route';

import { isAuth as isAuthAction } from 'ducks/auth';
import { isAuthSelector } from 'selectors/auth';

import { IStoreIsAuth } from 'types/store/auth';
import { getTeachers, getTeacher } from 'ducks/teacher';

const useStyles = makeStyles({
    grid: {
        margin: '0 auto'
    },
});

const Root = () => {
    let isAuth: IStoreIsAuth = useSelector(isAuthSelector);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(isAuthAction());
        dispatch(getTeacher());
    }, []);

    useEffect(() => {
        if (isAuth.hasOwnProperty('auth') && isAuth.auth) {
            dispatch(getTeachers());
        };
    }, [isAuth]);

    return (
        <>
            <Header />
            <Grid item xs={8} className={classes.grid}>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <PrivateRoute path={['/teachers', '/teacher/:id']} component={Teacher} exact />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Grid>
        </>
    );
};

export default Root;