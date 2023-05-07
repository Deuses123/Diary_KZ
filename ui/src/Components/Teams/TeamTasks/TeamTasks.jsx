import {useEffect, useState} from "react";
import {axiosInstance} from "../../Server/ServerConfig.js";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import './Task.css'
import PropTypes from "prop-types";

const TeamTasks = ({ team }) => {

    const [tasks, setTasks] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/api/v1/teacher-control/get-all-tasks?teamId=${team.id}`).then( r =>
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
            <div className='create-button'>
                <Button variant="contained" color="secondary" onClick={() => nav('/create-task/'+team.id, {replace: true})}>Создать задание</Button>
            </div>
        </div>
    );
};
TeamTasks.propTypes = {
    team: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        owner_id: PropTypes.number,
    }),
};

export default TeamTasks;
