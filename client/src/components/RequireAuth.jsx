/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSelector } from '@/store/reducers/auth';
import Spinner from '@/components/Spinner';

function RequireAuth({ children }) {
  const { isLoading } = useSelector(authSelector);
 
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner width={50} height={50} color={'#54D4A0'} />
      </div>
    );
  }
  return children;
}

export default RequireAuth;
