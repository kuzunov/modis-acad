import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import App from './components/main/App';
import Dashboard from './components/main/Dashboard';
import EditUserForm from './components/users/EditUserForm';
import reportWebVitals from './reportWebVitals';
import EventController from './components/events/EventController';
import NotFound from './components/NotFound';
import Sidebar from './components/main/Sidebar';
import EventDetails from './components/events/EventDetails';
import { mockEevents } from './mock-data';
import OrganizationsController from './components/oragnizations/OrganizationsController';
import Login from './components/users/Login';
import Profile from './components/users/Profile';
import AddEvent from './components/events/AddEvent';
import OragnizationDetails from './components/oragnizations/OragnizationDetails';
import AddOrganization from './components/oragnizations/AddOrganization';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        
      },
      {
        path: "/users/:userId/profile",
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
        element: <EventController displ={undefined}/>,
        children:[
          {
          path:"/events/:eventId",
          loader: ({params})=>{
            if (params.eventId){
            const eventId = parseInt(params.eventId);
            return mockEevents[eventId-1];
            }
            },
          element:<EventDetails />,
          },
          {
          path:"/events/add",
          element: <AddEvent/>
          }

        ]
      },{
        path: "/organizations",
        element: <OrganizationsController />,
        children:[
          {
          path:"/organizations/:organizationId",
          loader: ()=>{ return mockEevents[1]},
          element:<OragnizationDetails />,
        },    {
          path:"/organizations/add",
          loader: ()=>{ return mockEevents[1]},
          element:<AddOrganization />,
        }
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
