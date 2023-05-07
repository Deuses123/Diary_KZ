import {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {axiosInstance} from "../Server/ServerConfig.js";

import PropTypes from "prop-types";
import StudentTeamMembers from "./StudentTeamMembers.jsx";
import StudentTeamTasks from "./StudentTeamTasks.jsx";

const StudentTeamPage = ({user,team}) => {
    const [students, setStudents] = useState([]);
    const [currentProps, setCurrentProps] = useState(<></>);

    useEffect( () => {
        axiosInstance.get(`/api/v1/student-control/find-all-team-students?teamId=${team.id}`).then(
            async r => {
                setStudents(r.data);
                setCurrentProps(<StudentTeamMembers team={team} user={user} studentsList={r.data}/>);
            }
        );
    }, [team]);

    const studentsList = async () => {
        setCurrentProps(<StudentTeamMembers team={team} user={user} studentsList={students}/>);
    }
    const tasksList = () => {
        setCurrentProps(<StudentTeamTasks team={team} user={user}/>)
    }
    return (
        <div>
            <div>
                {team ? (
                    <div>
                        <Button variant='text' sx={{width: '200px'}} onClick={studentsList}>Список учеников</Button>
                        <Button variant='text' sx={{width: '200px'}} onClick={tasksList}>Задании</Button>
                        {
                            currentProps
                        }
                    </div>
                ) : (
                    <Typography variant="body1">
                        Выберите команду из списка.
                    </Typography>
                )}
            </div>
        </div>
    );
};
StudentTeamPage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        role: PropTypes.string
    }),
    team: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        owner_id: PropTypes.number,
    })
};

export default StudentTeamPage;
