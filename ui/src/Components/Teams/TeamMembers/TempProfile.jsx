import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const TempProfile = ({user}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                borderRadius: 8,
                backgroundColor: "#e1dede",
                margin: "0 auto",
            }}
        >

            <Avatar
                src="/path/to/avatar.jpg"
                alt="User Avatar"
                sx={{ width: 170, height: 170, marginRight: 20 }}
            />

            <div>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "#000000", fontWeight: "bold" }}
                >{user.role === "STUDENT" ? 'Ученик' : ''} {user.role === "TEACHER" ? 'Учитель' : ''} </Typography>

                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "#000000", fontWeight: "bold" }}
                >
                    {user.firstname} {user.lastname}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#000000" }}>
                    {user.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#000000" }}>
                    {user.phone}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#000000" }}>
                    Адрес: {user.address}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#000000" }}>
                    Дата рождения: {user.birth_date}
                </Typography>

            </div>

        </Box>
    );
};
TempProfile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        role: PropTypes.string,
        address: PropTypes.string,
        phone: PropTypes.string,
        birth_date: PropTypes.string,
    }),
};


export default TempProfile;
