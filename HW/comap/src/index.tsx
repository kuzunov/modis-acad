import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/main/App';
import Dashboard from './components/Dashboard';
import EditUserForm from './components/EditUserForm';
import Login from './components/Login';
import Profile from './components/Profile';
import reportWebVitals from './reportWebVitals';
import EventController from './components/events/EventController';
import NotFound from './components/NotFound';
import Sidebar from './components/main/Sidebar';
import EventDetails from './components/events/EventDetails';
import { mockEevents } from './mock-data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <EditUserForm />
      },
      {
        path: "/events",
        element: <EventController />,
        children:[
          {path:"/events/:eventId",
          loader: ()=>{ return mockEevents[1]},
          element:<EventDetails />,}
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
