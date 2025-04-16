import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { User } from '../types/user';
import { useTranslation } from 'react-i18next';

interface EditUserModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: User) => void;
    user: User;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, onSave, user }) => {
    const { control, handleSubmit } = useForm<User>({
        defaultValues: user,
    });
    const { t } = useTranslation("common");
    const basePath = "edit."
    const onSubmit = (data: User) => {
        onSave(data);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> {t(basePath + "title")}</DialogTitle>
            <DialogContent>
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => <TextField {...field} label={t(basePath + "form.firstName")} fullWidth margin="normal" />}
                />
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <TextField {...field} label={t(basePath + "form.lastName")} fullWidth margin="normal" />}
                />
                <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => <TextField {...field} label={t(basePath + "form.dob")} type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t(basePath + "buttons.cancel")}</Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)} >{t(basePath + "buttons.save")}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;
