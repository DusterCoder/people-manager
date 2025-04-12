import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { User } from '../types/user';

interface DeleteUserModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    user: User;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ open, onClose, onDelete, user }) => {
    const onSubmit = () => {
        onDelete();
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Conferma Eliminazione</DialogTitle>
            <DialogContent>
                <Typography>Sei sicuro di voler eliminare {user.firstName} {user.lastName}?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annulla</Button>
                <Button onClick={onSubmit} color="secondary">Elimina</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserModal;
