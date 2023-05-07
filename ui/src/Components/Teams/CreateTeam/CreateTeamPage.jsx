import './CreateTeam.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useState} from "react";
import {axiosInstance} from "../../Server/ServerConfig.js";
import {useNavigate} from "react-router-dom";
const CreateTeamPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const nav = useNavigate();
    const create = () => {
        axiosInstance.post('/api/v1/teacher-control/create-team', {name: name, description: description});
        nav('/teams', {replace: true});
    }
    return (
        <div className="main-block">
            <Box className="create-team-form" sx={{width: '500px'}} boxShadow={3}>
                <h2>Создать команду</h2>
                <form >
                    <TextField label="Название команды" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextField label="Описание команды" multiline value={description} onChange={(e) => setDescription(e.target.value)} rows={4} fullWidth />
                    <Button type="submit" variant="contained" color="primary" onClick={create}>
                        Создать
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default CreateTeamPage;
