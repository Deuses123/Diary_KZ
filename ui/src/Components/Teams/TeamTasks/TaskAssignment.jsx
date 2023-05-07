import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {axiosInstance} from "../../Server/ServerConfig.js";
import {
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import './Task.css';
import { BsFileEarmarkPdf, BsFileEarmarkText, BsFileEarmarkCode } from 'react-icons/bs';
import { AiOutlineFileImage } from 'react-icons/ai';
import { FaFileArchive } from 'react-icons/fa';
import DescriptionIcon from '@mui/icons-material/Description';

const TaskAssignment = () => {
    const {teamId, task_id} = useParams();
    const [taskAssignments, setTaskAssignments] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [state, setState] = useState(false);
    const [task, setTask] = useState({});
    const handleChange = (event) => {
        setSelectedNumber(event.target.value);
    };
    useEffect(() => {
        axiosInstance.get('/api/v1/teacher-control/get-task-by-id?taskId='+task_id).then( r => {
            setTask(r.data);
        });

    }, []);


    const saveScore = (obj) => {
        axiosInstance.get(`/api/v1/teacher-control/set-student-score?task_id=${task_id}&user_id=${obj.userId}&score=${selectedNumber}`).then( () => state ? setState(false) : setState(true));
    }

    useEffect(() => {
        axiosInstance.get(`/api/v1/teacher-control/get-task-assignments?taskId=${task_id}&teamId=${teamId}`).then(r => {
                setTaskAssignments(r.data);
            }
        )
    }, [state]);

    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();

        switch (extension) {
            case 'pdf':
                return <BsFileEarmarkPdf />;
            case 'docx':
                return  <DescriptionIcon />
            case 'txt':
                return <BsFileEarmarkText />;
            case 'md':
                return <BsFileEarmarkCode />;
            case 'jpg':
            case 'jpeg':
                return <AiOutlineFileImage />;
            case 'png':
            case 'gif':
                return <AiOutlineFileImage />;
            case 'zip':
            case 'rar':
                return <FaFileArchive />;
            default:
                return <></>;
        }
    };
    const downloadFile = async (file) => {
        await axiosInstance({
            url: `/api/v1/users/download/${encodeURIComponent(file)}`,
            method: 'GET',
            responseType: 'blob'
        }).then(response => {
            // создать объект URL из полученного blob
            const fileUrl = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = file.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(fileUrl);
        })
    };

    return (
        <div>
            <br/>
            <div style={{display:'flex', justifyContent:'center'}}>
                <TableCell>Задача - {task.name}</TableCell>
            </div>
            <Typography sx={{marginLeft: '20px'}}>Файлы задачи</Typography>
            <Typography sx={{marginLeft: '20px'}}>Нажмите для скачивании</Typography>
            {task.files && task.files.map( (file,i) => (
                <div  key={i} >
                <TableCell onClick={() => downloadFile(file)}>
                    {getFileIcon(file)} {file.substring(37)}
                </TableCell>
                </div>
            ))}

            <br/>
            <br/>
            {
                taskAssignments.length!==0 ?
            <TableContainer component={Paper}>
                <Table style={{tableLayout: 'fixed'}}>
                    <TableHead>
                        <TableRow style={{backgroundColor: '#bbbaba'}}>
                            <TableCell>Имя</TableCell>
                            <TableCell>Фамилия</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Оценка за работу</TableCell>
                            <TableCell>Изменить оценку</TableCell>

                            <TableCell></TableCell>
                            <TableCell colSpan={2} >Ответ</TableCell>
                            <TableCell colSpan={4}>Отправленные файлы студентом</TableCell>
                            <TableCell colSpan={4}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskAssignments.map((obj, index) =>
                            <TableRow style={{backgroundColor: '#ecebeb', cursor: 'pointer'}} key={index}>
                                <TableCell>{obj.firstname}</TableCell>
                                <TableCell> {obj.lastname}</TableCell>
                                <TableCell>{obj.email}</TableCell>
                                <TableCell> {obj.score}%</TableCell>
                                <TableCell>
                                    <Select
                                        value={selectedNumber}
                                        onChange={handleChange}
                                        displayEmpty
                                        sx={{height: '20px', width: '120px'}}
                                        inputProps={{ 'aria-label': 'Выберите число' }}
                                        MenuProps={{sx: { maxHeight: 250}}}
                                    >
                                        <MenuItem value=""  disabled>
                                            Оценка
                                        </MenuItem>
                                        {Array.from({ length: 100 }, (_, index) => (
                                            <MenuItem  key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell/>
                                <TableCell colSpan={2}>{obj.answer}</TableCell>
                                <TableCell colSpan={4}>     {obj.files && obj.files.map( (file,i) => (
                                    <div  key={i} >
                                        <TableCell onClick={() => downloadFile(file)}>
                                            {getFileIcon(file)} {file.substring(37)}
                                        </TableCell>
                                    </div>
                                ))}
                                </TableCell>
                                <TableCell colSpan={2}></TableCell>
                                <TableCell colSpan={2}><Button sx={{opacity: '0.8'}} variant='outlined' color="secondary" onClick={() => saveScore(obj)}>Сохранить</Button></TableCell>

                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </TableContainer>
                    :
            <Typography>Список пуст</Typography>
            }
        </div>
    );
};

export default TaskAssignment;
