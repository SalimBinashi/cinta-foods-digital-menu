import Session from 'react-session-api';

const getStatus = () => {
    return Session.get('status');
}
export default getStatus;