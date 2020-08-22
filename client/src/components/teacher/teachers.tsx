import React, { FunctionComponent, memo, useState, useEffect, ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, List, FormControlLabel, Switch } from '@material-ui/core';

import { IIndexSignature } from 'types/global/index-signature';
import { ITeacher } from 'types/store/teacher';
import { RoutePropsType } from 'types/global/route-props';
import { IMatchParams } from 'types/common';

import { setAdmin } from 'ducks/teacher';

type Props = RoutePropsType<IMatchParams, {
    teachers: Array<ITeacher>;
    classes: IIndexSignature<string>;
}>;

const Teachers: FunctionComponent<Props> = ({ teachers, classes, match }) => {
    const [switchState, setSwitchState] = useState<IIndexSignature<any>>({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (teachers.length) {
            const newSwitchState: IIndexSignature<string> = {};

            teachers.forEach(teacher => {
                const { _id, role } = teacher;

                if (role == 'admin' && _id) {
                    newSwitchState[_id] = role;
                };
            });

            setSwitchState(newSwitchState);
        };
    }, []);

    const handleChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
        setSwitchState({ ...switchState, [id]: event.target.checked });


        dispatch(
            setAdmin({
                id,
                admin: event.target.checked
            })
        );
    };

    return (
        <Grid item>
            {
                <List>
                    {
                        !teachers?.length ? null :
                            teachers.map(teacher => {
                                const { _id, username } = teacher;

                                return <Grid container key={_id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                                    <Grid item xs={6} style={{ lineHeight: '35px' }}>
                                        {username}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={_id && switchState[_id] ? true : false}
                                                    onChange={handleChange.bind(null, _id || '1')}
                                                    name="checkedB"
                                                    color="primary"
                                                />
                                            }
                                            label="Admin"
                                        />
                                    </Grid>
                                </Grid>
                            })
                    }
                </List>
            }
        </Grid>
    );
};

export default memo(withRouter(Teachers));