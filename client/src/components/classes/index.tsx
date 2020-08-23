import React, { useEffect, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { List, ListItem, Typography, Button, Grid } from '@material-ui/core';

import { getClasses } from 'ducks/classes';

import { classesSelector } from 'selectors/classses';
import { teacherSelector } from 'selectors/teacher';

import Modal from './modal';

import { IClass } from 'types/store/classes';

const Classes = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<string>('');
    const [activeClass, setActiveClass] = useState<IClass | null>(null);
    const user = useSelector(teacherSelector);
    const classes: Array<IClass> = useSelector(classesSelector);

    useEffect(() => {
        dispatch(getClasses());
    }, []);

    const onClick = (item: IClass | null, event: ChangeEvent<any>) => {
        let tagName = event.target?.tagName.toLowerCase();

        if (tagName === 'div' || tagName === 'li') {
            history.push(`classes/${item?._id}`);
        } else {
            setMode(event.target?.textContent);
            setActiveClass(item);
            setOpen(true);
        };
    };

    return (
        <>
            <Typography variant="h5" className="header-message">Classes</Typography>
            <br />
            <Button
                onClick={onClick.bind(null, null)}
                variant="contained"
                color="primary"
            >
                Create
            </Button>
            {
                !classes?.length ? null :
                    <>
                        <List>
                            {
                                classes.map(item => {
                                    const { _id, name } = item;

                                    return <ListItem
                                        onClick={onClick.bind(null, item)}
                                        style={{ cursor: 'pointer', borderBottom: '1px solid #ccc' }}
                                        key={_id}
                                    >
                                        <Grid item md={12}>
                                            {name}
                                        </Grid>
                                        {
                                            user?.role !== 'superadmin' ? null :
                                                <Grid container>
                                                    <Grid item md={6} style={{ textAlign: 'right' }}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            Edit
                                                    </Button>
                                                    </Grid>
                                                    <Grid item md={6} style={{ textAlign: 'right' }}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            Delete
                                                    </Button>
                                                    </Grid>
                                                </Grid>
                                        }
                                    </ListItem>
                                })
                            }
                        </List>
                        <Modal open={open} setOpen={setOpen} mode={mode} activeClass={activeClass} />
                    </>
            }
        </>
    );
};

export default Classes;