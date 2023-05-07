import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosInstance} from "../Server/ServerConfig.js";
import {BsFileEarmarkCode, BsFileEarmarkPdf, BsFileEarmarkText} from "react-icons/bs";
import DescriptionIcon from "@mui/icons-material/Description.js";
import {AiOutlineFileImage} from "react-icons/ai";
import {FaFileArchive} from "react-icons/fa";
import {TableCell, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StudentTaskInfo = ({user}) => {
    const {task_id, teamId} = useParams();
    const [task, setTask] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [answer, setAnswer] = useState('');
    const [assignment, setAssignment] = useState({});
    useEffect(() => {
        axiosInstance.get('/api/v1/student-control/get-task-result?taskId='+task_id+'&teamId='+teamId).then( r => {
            if(r.data.status === false){
                setAssignment(r.data);
                console.log(assignment.status)
            }
        })
        axiosInstance.get('/api/v1/student-control/find-task-by-id?taskId='+task_id).then( r => {
            setTask(r.data)
            console.log(task.files.length);
        }
    )
    }, []);
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
    const nav = useNavigate();
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

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };
    const sendTaskAssignment = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('task_id', task_id)
        formData.append('answer', answer)
        formData.append('teamId', teamId)
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        nav('/Teams/'+teamId);
        axiosInstance.post('/api/v1/student-control/get-answer', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };
    return (
        <div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <h2>Задача - {task.name}</h2>
            </div>
            <div style={{marginLeft: '20%', fontSize: '20px'}}>
                <p>Описание: {task.description}</p>
            </div>

            {
                task.files !== undefined ?
                <div> <Typography sx={{marginLeft: '20px'}}>Файлы задачи</Typography>
                    <Typography sx={{marginLeft: '20px'}}>Нажмите для скачивании</Typography></div>
                    : ''
            }
            {task.files && task.files.map( (file,i) => (
                <div  key={i} >
                    <TableCell onClick={() => downloadFile(file)}>
                        {getFileIcon(file)} {file.substring(37)}
                    </TableCell>
                </div>
            ))}
            {
                assignment.status !== false ?
                <div style={{right:'20%', bottom: 30, position: 'fixed', textAlign: 'center'}}>
                    <span>
                        <input type="file" onChange={handleFileChange} multiple />
                        {selectedFiles.length > 0 && (
                            <span className="selected-files">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="file-item">
                                        <div className="file-name">{file.name}</div>
                                        <div className="file-size">{file.size / 1000} KB</div>
                                        <div style={{color: 'red'}} onClick={() => handleFileRemove(index)}>
                                            Удалить
                                        </div>
                                    </div>
                                ))}
                            </span>
                        )}
                    </span>
                    <TextField sx={{width: 700}} size='medium' value={answer} onChange={e => setAnswer(e.target.value)} placeholder=""/>
                    <Button sx={{height: 55, marginLeft: 1}} variant='outlined' size='large' onClick={e => sendTaskAssignment(e)}>Отправить</Button>
                </div>
                :
                    <div style={{display: 'flex', justifyContent: 'center', fontSize: '50', color: 'green'}}><h2>Ваша оценка - {assignment.score}%</h2></div>
            }
        </div>
    );
};



export default StudentTaskInfo;
