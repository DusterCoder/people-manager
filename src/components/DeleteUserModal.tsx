import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { User } from '../types/user';
import { useTranslation } from 'react-i18next';

interface DeleteUserModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    user: User;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ open, onClose, onDelete, user }) => {

    const { t } = useTranslation("common");
    const basePath = "delete."
    const onSubmit = () => {
        onDelete();
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t(basePath + "title")}</DialogTitle>
            <DialogContent>
                <Typography>{t(basePath + "message")} {user.firstName} {user.lastName}?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t(basePath + "buttons.cancel")}</Button>
                <Button variant="contained" onClick={onSubmit} color="secondary">{t(basePath + "buttons.confirm")}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserModal;
