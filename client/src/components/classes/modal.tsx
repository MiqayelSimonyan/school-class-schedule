import React, { FunctionComponent, memo, Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid, TextField, Button } from '@material-ui/core';

import { updateClassItem as updateClassItemAction, deleteClassItem as deleteClassItemAction, createClassItem as createClassItemAction } from 'ducks/classes';

import CustomModal from 'components/common/custom-modal';
import styles from './styles';

import { IClass } from 'types/store/classes';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    mode: string;
    activeClass: IClass | null
};

const useStyles = styles;

const Modal: FunctionComponent<Props> = ({ open, setOpen, mode, activeClass }) => {
    const dispatch = useDispatch();
    const styleClasses = useStyles();
    const [changedClassName, setClassName] = useState<string>('');

    const modalHandler = () => setOpen(!open);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setClassName(event?.target?.value);
    };

    const action = () => {
        let type = mode.trim().toLowerCase();

        if (changedClassName || type === 'delete') {
            if (type == 'create') {
                dispatch(
                    createClassItemAction({ name: changedClassName })
                );
            } else if (type === 'edit' && activeClass?._id) {
                dispatch(
                    updateClassItemAction({ _id: activeClass._id, name: changedClassName })
                );
            } else if (type === 'delete' && activeClass?._id) {
                dispatch(
                    deleteClassItemAction(activeClass._id)
                );
            };

            setOpen(false);
            setClassName('');
        };
    };

    return (
        <CustomModal open={open} modalHandler={modalHandler} overlay="overlay">
            <Box className="modal-header">
                <h4>{mode}</h4>
            </Box>
            <Grid container className="modal-body">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {
                            mode === 'Delete' ? <h4 className={styleClasses.popupTitle}>Are you sure?</h4> :
                                <TextField
                                    id="standard-username"
                                    className={styleClasses.textField}
                                    fullWidth
                                    onChange={onChange}
                                    defaultValue={activeClass?.name}
                                />
                        }
                    </Grid>
                </Grid>

                <Box mt={5} className='modal-footer'>
                    <Button
                        onClick={action}
                        variant="contained"
                        color="primary"
                    >
                        {mode !== 'Delete' ? mode : 'Yes'}
                    </Button>
                    {
                        mode !== 'Delete' ? null :
                            <Button
                                style={{ marginLeft: '10px' }}
                                variant="contained"
                                color="primary"
                                onClick={modalHandler}
                            >
                                No
                            </Button>
                    }
                </Box>
            </Grid>
        </CustomModal>
    );
};

export default memo(Modal);