import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const ProtectedLayout: React.FC = () => {
  useEffect(() => {
    //  if (!user) navigate('/login')
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
