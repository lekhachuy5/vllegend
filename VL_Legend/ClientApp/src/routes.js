import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/adminpages/layouts/DashboardLayout';
import MainLayout from 'src/adminpages/layouts/MainLayout';
import AccountView from 'src/adminpages/views/account/AccountView';
import LecturerListView from 'src/adminpages/views/customer/LecturerListView';
import DashboardView from 'src/adminpages/views/reports/DashboardView';
import LoginView from 'src/adminpages/views/auth/LoginView';
import NotFoundView from 'src/adminpages/views/errors/NotFoundView';
import ClassListView from 'src/adminpages/views/product/ClassListView';
import ClassFormCreateView from 'src/adminpages/views/product/ClassForm';
import ClassFormEditView from 'src/adminpages/views/product/ClassListView/customForm';
import SettingsView from 'src/adminpages/views/settings/SettingsView';
import StudentListView from 'src/adminpages/views/students/StudentsListView';
import CourseListView from 'src/adminpages/views/course/CourseListView';
import CourseFormCreate from 'src/adminpages/views/course/CourseFormView';
import ClientLayout from 'src/clientpages/demos/RestaurantLandingPage.js';
import LeaderBoard from 'src/clientpages/demos/EventLandingPage.js';


const routes = [
  {
    path: 'quanly',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'lecturers', element: <LecturerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'classes', element: <ClassListView /> },
      { path: 'configs', element: <SettingsView /> },
      { path: 'students', element: <StudentListView /> },
      { path: 'course/:id', element: <CourseListView /> },
      { path: 'classes/form', element: <ClassFormCreateView /> },
      {
        path: 'classes/formedit/:id',
        element: <ClassFormEditView/>
      },
      { path: 'course/create/', element: <CourseFormCreate /> },
      { path: '*', element: <Navigate to="/quanly/404" /> }
    ]
  },
  {
    path: 'quanly',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/quanly/dashboard" /> },
      // { path: '*', element: <Navigate to="/quanly/404" /> }
    ]
  },
  {
    path: 'homepage',
    element: <ClientLayout />,
    children: [
    
      // { path: '*', element: <Navigate to="/quanly/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/homepage" /> },
      { path: 'leaderboard', element: <LeaderBoard /> },
      // { path: '*', element: <Navigate to="/quanly/404" /> }
    ]
  }
];

export default routes;
