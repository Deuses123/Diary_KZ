import {useEffect, useState} from 'react';
import {List, ListItem, ListItemText} from '@mui/material';
import {axiosInstance} from "../Server/ServerConfig.js";
import TeamPage from "./TeamPage.jsx";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import PropTypes from "prop-types";

const TeamListPage = ({user}) => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const nav = useNavigate();
    const {teamId} = useParams();

    useEffect(() => {

        axiosInstance.get('/api/v1/teacher-control/getTeamsByOwnerId')
            .then(response => {
                setTeams(response.data);
                if(teamId!==undefined){
                    response.data.map(r => {
                        if(r.id.toString() === teamId){
                            setSelectedTeam(r);
                        }
                    })
                }
            })
            .catch(error => {
                console.error('Error fetching teams:', error);
            });
    }, []);


    const handleTeamClick = (team) => {
        setSelectedTeam(team);
    };


    return (
        <div style={{display: 'flex'}}>
            <div  style={{ width: 300, paddingRight: '10px'} }>
                <List component="nav">

                    {teams.length !== 0 ? teams.map((team) => (
                        <ListItem
                            key={team.id}
                            onClick={() => handleTeamClick(team)}
                            sx={{  backgroundColor:  selectedTeam.id === team.id ? '#8d8a8a': '#c2c0c0',}}
                        >
                            <ListItemText
                                primary={team.name}
                                secondary={`Владелец: ${user.firstname} ${user.lastname}`}
                                sx={{
                                    color: 'brown',
                                    padding: '10px', // Установите нужный вам размер паддинга
                                    border: '10px', borderColor: 'black'
                                }}
                            />
                        </ListItem>
                    )) : ''}
                </List>
                <Button onClick = {() => nav('/create-team')}>Создать команду</Button>
            </div>
            <div style={{ }}>
                {selectedTeam!=null ?  <TeamPage user={user} team={selectedTeam} /> : '' }
            </div>
        </div>
    );
}

TeamListPage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        role: PropTypes.string
    })
};

export default TeamListPage;
