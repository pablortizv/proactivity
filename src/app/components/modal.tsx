import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalProps {
    titleText: string;
    bodyText: string;
    cancelText: string;
    confirmText: string;
    openModal: boolean,
    handleClose: () => void;
    handleConfirm: () => void;
}

export default function Modal({ titleText, bodyText, cancelText, confirmText, openModal, handleClose, handleConfirm }: ModalProps) {
    // Modal reusable con opción de una sola acción o dos para casos de confirmación
    return (
        <React.Fragment>
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {titleText}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {bodyText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {cancelText && <Button onClick={handleClose}>
                        {cancelText}
                    </Button>
                    }
                    {confirmText && <Button onClick={handleConfirm} autoFocus>
                        {confirmText}
                    </Button>
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}