import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {axiosInstance} from "../Server/ServerConfig.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel, Radio, RadioGroup
} from "@mui/material";
import pencil from './pencil.svg';
import './Profile.css'
// eslint-disable-next-line react/prop-types
const Profile = ({user}) => {
    const [current, setUser] = useState(user);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('M');


    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    };
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const tuser = {
            name: name,
            lastname: lastname,
            phone: phone,
            address: address,
            gender: gender,
            birth_date: dateOfBirth,
        };
        console.log(tuser)
        // Выполните здесь необходимую обработку данных
        axiosInstance.post('api/v1/users/addInformation',tuser, {
            headers: {
                'Content-Type': 'application/json',
            }}).then(r => {
            if (r.status === 200) {
                axiosInstance.get('/api/v1/users/giveMe').then(r => setUser(r.data));
            }
        }
        );
        handleClose();
    };


    return (
        <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                borderRadius: 8,
                backgroundColor: "#ada2a2",
                width: 700,
                height: 400,
                margin: "0 auto",
                marginTop: '100px   ',
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            }}>

            <div className="edit-button" onClick={handleOpen}>
                <img src={pencil} alt="Your SVG" />
            </div>

            <Avatar
                src="/path/to/avatar.jpg"
                alt="User Avatar"
                sx={{ width: 170, height: 170, marginRight: 20 }}
            />

            <div>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "#000000", fontWeight: "bold" }}
                >{current.role === "STUDENT" ? 'Ученик' : ''} {current.role === "TEACHER" ? 'Учитель' : ''} </Typography>

                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "#000000", fontWeight: "bold" }}
                >
                    {current.firstname} {current.lastname}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#000000" }}>
                    {current.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#000000" }}>
                    {current.phone_number}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#000000" }}>
                    Адрес: {current.address}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#000000" }}>
                    Дата рождения: {current.birth_date}
                </Typography>

            </div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Заполните данные</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            label="Фамилия"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={e => setLastname(e.target.value)}
                        />
                        <TextField
                            label="Адресс"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={e => setAddress(e.target.value)}

                        />
                        <TextField
                            label="Номер телефона"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={e => setPhone(e.target.value)}
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Пол</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel value="M" control={<Radio />} label="Мужской" />
                                <FormControlLabel value="W" control={<Radio />} label="Женский" />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            label="Дата рождения"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Profile;
