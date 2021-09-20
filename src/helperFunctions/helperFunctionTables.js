import Session from 'react-session-api';

const getTableNumber = () => {
    return Session.get('table_number');
}
export default getTableNumber;