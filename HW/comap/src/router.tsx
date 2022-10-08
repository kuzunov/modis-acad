import { createBrowserRouter } from "react-router-dom";
import AddEvent from "./components/events/AddEvent";
import EventController from "./components/events/EventController";
import EventDetails from "./components/events/EventDetails";
import About from "./components/main/About";
import App from "./components/main/App";
import Dashboard from "./components/main/Dashboard";
import NotFound from "./components/NotFound";
import AddOrganization from "./components/oragnizations/AddOrganization";
import OragnizationDetails from "./components/oragnizations/OragnizationDetails";
import Organizations from "./components/oragnizations/Oganizations";
import LatestReviews from "./components/reviews/LatestReviews";
import Review from "./components/reviews/Review";
import ReviewList from "./components/reviews/ReviewList";
import EditUserForm from "./components/users/EditUserForm";
import Profile from "./components/users/Profile";
import { mockEevents } from "./mock-data";
import { EventsApi, OrganizationsApi } from "./service/rest-api-client";
import Login from "./components/users/Login";
import ShareButtons from "./components/main/ShareButtons";
import ErrorComponent from "./components/ErrorComponent";
import UsersList from "./components/users/UsersList";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorComponent/>,
      },
      {
        path: "/users/:userId/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorComponent/>,
      },
      {
        path: "/register",
        // element: <EditUserForm />,
        errorElement: <ErrorComponent/>,
      },
      {
        path: "/events",
        element: <EventController />,
        errorElement: <ErrorComponent/>,
        loader: () => {
          return EventsApi.findAll();
        },
        children: [
          {
            path: ":eventId",
            errorElement: <ErrorComponent/>,
            loader: async ({ params }) => {
              if (params.eventId) {
                const eventId = params.eventId;
                return { event: await EventsApi.findById(eventId), local: "", comments: [{id:1,body:1},{id:1,body:1},{id:1,body:1}]};
              }
          
            },
            element: <EventDetails />,
            children: [
              {
                path: "delete",
                action: async ({ params }) => {
                  if (params.eventId) {
                    const eventId = params.eventId;
                    return await EventsApi.deleteById(eventId);
                  }
                },
                             
                
              },
              {
                path: "share",
                element:<ShareButtons />,
              },
            ],
          },
          {
            path: "add",
            element: <AddEvent />,
            errorElement: <ErrorComponent/>,
          },
          {
            path: ":eventId/edit",
            errorElement: <ErrorComponent/>,
            loader: ({ params }) => {
              if (params.eventId) {
                const eventId = params.eventId;
                return EventsApi.findById(eventId);
              }
            },
            element: <AddEvent />,
          },
        ],
      },
      {
        path: "/organizations",
        errorElement: <ErrorComponent/>,
        element: <Organizations />,
        loader: () => {
          return OrganizationsApi.findAll();
        },
        children: [
          {
            path: ":organizationId",
            errorElement: <ErrorComponent/>,
            loader:  async ({ params }) => {
              if (params.organizationId) {
              return { event: await EventsApi.findById(params.organizationId), local: "", comments: [{id:1,body:1},{id:1,body:1},{id:1,body:1}]};
            }},
            element: <OragnizationDetails />,
          },
          {
            path: "add",
            errorElement: <ErrorComponent/>,
            loader: () => {
              return mockEevents[1];
            },
            element: <AddOrganization />,
          },
        ],
      },
      {
        path: "/users",
        element: <UsersList />,
        errorElement: <ErrorComponent/>,
        loader: () => {},
        children: [
         { 
          path:":userId",
          errorElement: <ErrorComponent/>,
          loader: () => {},
          children: [
            {
            path:"edit",
            // element: <EditUserForm/>,
            loader: () => {},
            
          }
          ]
        },
        ],
      },
      {
        path: "/reviews",
        errorElement: <ErrorComponent/>,
        element: <LatestReviews />,
        children: [
          // {
          //   path: ":reviewId",
          //   element: <Review {}/>,
          // },
          {
            path: "latest",
            element: <LatestReviews />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
