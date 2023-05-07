import PropTypes from 'prop-types';

UserComponent.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    }).isRequired
};

export default UserComponent;
