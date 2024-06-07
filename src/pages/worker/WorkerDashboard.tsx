import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logout } from '../../redux/reducers/user/UserSlice';
import Logo from '../../components/public/Logo';
import WorkerSideBar from '../../components/worker/WorkerSideBar';

const WorkerDashboard = () => {
  

    return (
          <>
          <WorkerSideBar/>
          </>
    );
}

export default WorkerDashboard;
