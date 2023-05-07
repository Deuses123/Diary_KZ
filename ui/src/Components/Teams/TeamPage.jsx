import {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {axiosInstance} from "../Server/ServerConfig.js";
import TeamMembers from "./TeamMembers/TeamMembers.jsx";
import TeamTasks from "./TeamTasks/TeamTasks.jsx";
import PropTypes from "prop-types";

const TeamPage = ({user,team}) => {
    const [students, setStudents] = useState([]);
    const [currentProps, setCurrentProps] = useState(<></>);

    useEffect( () => {
        axiosInstance.get(`/api/v1/teacher-control/get-students-by-teamId?teamId=${team.id}`).then(
            r => {
                setStudents(r.data);
                setCurrentProps(<></>);
            }
        );
    }, [team]);

    const studentsList = async () => {
        setCurrentProps(<TeamMembers team={team} user={user} studentsList={students}/>);
    }
    const tasksList = () => {
        setCurrentProps(<TeamTasks team={team} user={user}/>)
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
TeamPage.propTypes = {
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

export default TeamPage;
