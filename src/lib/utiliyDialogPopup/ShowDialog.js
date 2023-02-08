import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IsText from './IsText';
import IsCheck from './IsCheck';
import IsSelect from './IsSelect';

export default function ShowDialog({ params, handleReaction }) {
    const [state, setState] = React.useState({});
    const {
        dialogHeader,
        content,
        confirmBttTxt,
        rejectBttTxt,
    } = params;
    // console.log(params);

    const notifyChange = (newState) => {
        // console.log({ ...state, ...newState });
        setState({ ...state, ...newState });
    }

    // onMount / unMount
    React.useEffect(() => {
        // memoize preferences risolvendo i content uno per uno
        let localState = {};
        content.map((i) => {
            if (i.selected !== undefined) localState[i.variable] = i.selected;
        });
        setState(localState);
        return () => {
            // unmount
        };
    }, []);

    return (
        <Dialog
            open
            onClose={() => handleReaction({ reject: true })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialogHeader}</DialogTitle>
            <DialogContent>
                {
                    content.map(
                        (item) => (
                            {
                                'isText': <IsText item={item} key={item.variable} notifyChange={notifyChange} />,
                                'isCheck': <IsCheck item={item} key={item.variable} notifyChange={notifyChange} />,
                                'isSelect': <IsSelect item={item} key={item.variable} notifyChange={notifyChange} />
                            }[item.kind]
                        ))
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleReaction({ ...state, ...{ confirm: true } })}>{confirmBttTxt}</Button>
                <Button onClick={() => handleReaction({ reject: true })} autoFocus>
                    {rejectBttTxt}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
