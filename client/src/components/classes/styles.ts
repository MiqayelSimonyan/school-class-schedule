import { makeStyles } from '@material-ui/core';

export default makeStyles({
    popupTitle: {
        margin: 0
    },
    textField: {
        '& div': {
            '&:before': {
                borderBottom: '2px solid #fff!important'
            },

            '& input': {
                color: '#fff!important'
            }
        }
    }
});