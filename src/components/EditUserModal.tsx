import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { User } from '../types/user';

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

    const onSubmit = (data: User) => {
        onSave(data);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Modifica Utente</DialogTitle>
            <DialogContent>
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => <TextField {...field} label="Nome" fullWidth margin="normal" />}
                />
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <TextField {...field} label="Cognome" fullWidth margin="normal" />}
                />
                <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => <TextField {...field} label="Data di Nascita" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annulla</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Salva</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;
