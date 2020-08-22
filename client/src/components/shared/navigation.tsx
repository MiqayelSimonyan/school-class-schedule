import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';

import { teachersSelector } from 'selectors/teacher';
import { teacherSelector } from 'selectors/teacher';

import SignOut from 'components/auth/sign-out';
import { ITeacher } from 'types/store/teacher';

import 'assets/styles/layout/navigation.scss';

const Navigation = () => {
    const teachers: Array<ITeacher> = useSelector(teachersSelector);
    const teacher: ITeacher = useSelector(teacherSelector);

    return (
        <Grid container>
            <Grid item xs={9}>
                <Button>
                    <NavLink to="/" exact><HomeIcon /></NavLink>
                </Button>
                {
                    teachers?.length ?
                        <Button>
                            <NavLink to="/teachers" exact>teachers</NavLink>
                        </Button>
                        : null
                }
            </Grid>
            <Grid item xs={3} style={{ textAlign: 'right' }}>
                <h3 className="username">{teacher?.username}</h3>
                <SignOut />
            </Grid>
        </Grid>
    )
};

export default memo(Navigation);