import PropTypes from "prop-types";

const MainPage = ({user}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem'}}>
                Добро пожаловать, {user.firstname}!
            </h1>
            { user.role === 'TEACHER' ?
            <p style={{textAlign: 'center', fontSize: '1.2rem', marginLeft: '150px', marginRight: '150px', marginBottom: '2rem'}}>
                Здесь вы можете создавать команды в качестве учителя, выставлять задания с файлами и оценивать студентов.
            </p>
                :
                <p style={{textAlign: 'center', fontSize: '1.2rem', marginLeft: '150px', marginRight: '150px', marginBottom: '2rem'}}>
                    Для студентов доступна возможность получения заданий и просмотра своих оценок.
                </p>
            }
        </div>
    );
};
MainPage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        role: PropTypes.string
    }),
}
export default MainPage;
