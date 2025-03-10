import NoAccess from '../NoAccess/NoAccess';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLogged, allowedRoles = [], userData, element: Container, ...props }) => {
  return (
    <>
      {isLogged ? (
        <>
          {' '}
          {allowedRoles.length === 0 || (allowedRoles || []).includes(userData.role) ? (
            <Container {...props} userData={userData} />
          ) : (
            <NoAccess />
          )}{' '}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
