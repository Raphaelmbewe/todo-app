/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import routeNames from '@/routes/routeNames';
import { authSelector, AuthUser, clearAuth } from '@/store/reducers/auth';
import Spinner from '@/components/Spinner';

function RequireAuth({ children }) {
  const { isLoading, login, token } = useSelector(authSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("TOKEN:", token)

  useEffect(() => {
    dispatch(AuthUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearAuth());
  }, [dispatch]);
  
  
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner width={50} height={50} color={'#54D4A0'} />
      </div>
    );
  }

  if (!isLoading && !login) {
    localStorage.removeItem('token'); // remove token if not logged in
    return (
      <Navigate to={routeNames.landing} state={{ from: location }} replace />
    );
  }

  if (token) {
    localStorage.setItem('token', token); // save token to local storage
  }

  return children;
}

export default RequireAuth;
