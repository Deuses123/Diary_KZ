import {useEffect, useState} from 'react';
import {List, ListItem, ListItemText} from '@mui/material';
import {axiosInstance} from "../Server/ServerConfig.js";
import {useNavigate, useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import StudentTeamPage from "./StudentTeamPage.jsx";
const StudentTeamListPage = ({user}) => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const nav = useNavigate();
    const {teamId} = useParams();

    useEffect(() => {
        axiosInstance.get('/api/v1/student-control/findAllStudentTeams')
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
                            sx={{  backgroundColor:  selectedTeam === team ? '#8d8a8a': '#c2c0c0',}}
                        >
                            <ListItemText
                                primary={team.name}
                                secondary={`Описание: ${team.description}`}
                                sx={{
                                    color: 'brown',
                                    padding: '10px', // Установите нужный вам размер паддинга
                                    border: '10px', borderColor: 'black'
                                }}
                            />
                        </ListItem>
                    )) : ''}
                </List>
            </div>
            <div style={{ }}>
                {selectedTeam!=null ?  <StudentTeamPage user={user} team={selectedTeam} /> : '' }
            </div>
        </div>
    );
}
StudentTeamListPage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        role: PropTypes.string
    })
};
export default StudentTeamListPage;
