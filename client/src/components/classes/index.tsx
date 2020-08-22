import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { List, ListItem, Typography } from '@material-ui/core';

import { getClasses } from 'ducks/classes';
import { IClass } from 'types/store/classes';

import { classesSelector } from 'selectors/classses';

const Classes = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes: Array<IClass> = useSelector(classesSelector);

    useEffect(() => {
        dispatch(getClasses());
    }, []);

    const onClick = (id: string) => {
        history.push(`classes/${id}`);
    };

    return (
        <>
            <Typography variant="h5" className="header-message">Classes</Typography>
            {
                !classes?.length ? null :
                    <List>
                        {
                            classes.map(item => {
                                const { _id, name } = item;

                                return <ListItem onClick={onClick.bind(null, _id || '')} style={{ cursor: 'pointer', borderBottom: '1px solid #ccc' }} key={_id}>{name}</ListItem>
                            })
                        }
                    </List>
            }
        </>
    );
};

export default Classes;