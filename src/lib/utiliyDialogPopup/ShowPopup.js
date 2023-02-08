import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IsText from './IsText';
import IsCheck from './IsCheck';
import IsSelect from './IsSelect';

function splitParameter(p, def) {
    if (!p) return def;
    const arr = p.split('-');
    if (arr.length == 2) {
        return {
            vertical: arr[0],
            horizontal: arr[1],
        };
    }
    return def;
}

export default function ShowPopup({ params, handleReaction }) {
    const [state, setState] = React.useState({});
    const {
        anchorEl,
        position,
        dialogHeader,
        content,
        confirmBttTxt,
        rejectBttTxt,
    } = params;
    const ao = splitParameter(position?.eventObj, {
        vertical: 'bottom',
        horizontal: 'left',
    });
    const to = splitParameter(position?.panel, {});

    const notifyChange = (newState) => {
        // console.log({ ...state, ...newState });
        setState({ ...state, ...newState });
    }

    // onMount / unMount
    React.useEffect(() => {
        // memoize preferences risolvendo i content uno per uno
        let localState={};
        content.map((i)=>{
            if (i.selected !== undefined) localState[i.variable]=i.selected; 
        });
        setState(localState);
        return () => {
            // unmount
        };
    }, []);

    return (
        <Popover
            open
            anchorEl={anchorEl}
            onClose={() => handleReaction({ reject: true })}
            anchorOrigin={ao}
            transformOrigin={to}
            PaperProps={{
                style: { minWidth: '300px' },
            }}
        >
            <div>
                <DialogTitle id="responsive-dialog-title">{dialogHeader}</DialogTitle>
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
            </div>
        </Popover>
    );
}