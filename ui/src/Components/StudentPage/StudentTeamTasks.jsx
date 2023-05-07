import {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {axiosInstance} from "../Server/ServerConfig.js";

const StudentTeamTasks = ({ team }) => {

    const [tasks, setTasks] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/api/v1/student-control/find-all-team-tasks?team_id=${team.id}`).then( r =>
            setTasks(r.data)
        )
    }, []);

    return (
        <div style={{marginTop: '30px'}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{backgroundColor: '#bbbaba'}}>
                            <TableCell>Название</TableCell>
                            <TableCell>Описание</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map( task =>
                            <TableRow style={{backgroundColor: '#ecebeb', cursor: 'pointer'}} onClick = {() => nav('/task/'+task.task_id+'/'+team.id)} key={task.task_id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.description}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
StudentTeamTasks.propTypes = {
    team: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        owner_id: PropTypes.number,
    }),
};

export default StudentTeamTasks;
