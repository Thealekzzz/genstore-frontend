import React from 'react';
// import { Navigate } from 'react-router-dom';
import NoAccess from '../NoAccess/NoAccess';
import NeedAuth from '../NeedAuth/NeedAuth';

const ProtectedRoute = ({ isLogged, allowedRoles = [], userData, element: Container, ...props }) => {
  return (
    <>
      {isLogged
        ? ( <> {
          allowedRoles.length === 0 || (allowedRoles || []).includes(userData.role)
            ? (
              <Container {...props} userData={userData} />
            ) : (
              <NoAccess />
            )

        } </> ) : <NeedAuth />}
    </>
  );
};

export default ProtectedRoute;