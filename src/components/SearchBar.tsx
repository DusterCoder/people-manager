import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    value: string;
    onChange: (value: string) => void;
};


export default function SearchBar({ value, onChange }: Props) {
    return (
        <TextField
            variant="outlined"
            size="small"
            placeholder="Cerca"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                ),
            }}
        />
    );
}
