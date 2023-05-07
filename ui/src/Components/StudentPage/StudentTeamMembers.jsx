import {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Dialog, DialogContent} from "@mui/material";
import PropTypes from "prop-types";
import '../Teams/TeamMembers/TeamMembers.module.scss'
import TempProfile from "../Teams/TeamMembers/TempProfile.jsx";
import s from '../Teams/TeamMembers/TeamMembers.module.scss'
import {axiosInstance} from "../Server/ServerConfig.js";

const StudentTeamMembers = ({ studentsList, team}) => {
    const [profileState, setProfileState] = useState(false);
    const [current, setCurrent] = useState({});

    const [owner, setOwner] = useState({});

    useEffect(() => {
        axiosInstance.get("/api/v1/users/findUserById?id="+team.owner_id).then(r=> {
            setOwner(r.data)
        })
    }, []);

    return (
        <div>
            <br/>

            <br/>
            <br/>
            <br/>
            <b style={{marginLeft: '30px'}}>Владелец группы</b>
            <div className={s.ownerBlock}>
                <Typography sx={{marginLeft: '10px', paddingTop: '10px'}}>{owner.firstname} {owner.lastname}</Typography>
            </div>

            <div >
                <br/>
                <b style={{marginLeft: '30px'}}>Участники группы</b>

                {
                    studentsList.map(student =>
                        <div className={s.ownerBlock} key={student.id}>
                            <Typography onClick = { () => { setProfileState(true); setCurrent(student) }} sx={{marginLeft: '10px', paddingTop: '10px'}}>{student.firstname} {student.lastname}</Typography>
                        </div>
                    )
                }
                <Dialog open={profileState}
                        fullWidth  onClose={() => setProfileState(false)}>
                    <DialogContent sx={{backgroundColor: '#e1dede'}}>
                        <TempProfile user={current}/>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
};
StudentTeamMembers.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    }).isRequired,
    team: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        owner_id: PropTypes.number.isRequired,
    }).isRequired,
    studentsList: PropTypes.array.isRequired,
};


export default StudentTeamMembers;
