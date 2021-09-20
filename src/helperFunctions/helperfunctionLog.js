import Session from 'react-session-api';

const isLoggedIn = () => {
    return Session.get('loggedIn');
}
export default {isLoggedIn};





