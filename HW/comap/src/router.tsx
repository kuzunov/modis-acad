import Login from "@mui/icons-material/Login";
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
import OrganizationsController from "./components/oragnizations/OrganizationsController";
import LatestReviews from "./components/reviews/LatestReviews";
import Review from "./components/reviews/Review";
import ReviewList from "./components/reviews/ReviewList";
import EditUserForm from "./components/users/EditUserForm";
import Profile from "./components/users/Profile";
import { mockEevents } from "./mock-data";
import { EventsApi } from "./service/rest-api-client";
export const router = createBrowserRouter([
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
          loader: () => {return EventsApi.findAll();},
          children:[
            {
            path:":eventId",
            loader: async ({params})=>{
              if (params.eventId){
              const eventId = parseInt(params.eventId);
              return {event: await EventsApi.findById(eventId), local:""};
              }
              },
            element:<EventDetails />,
            action: () => new Response(JSON.stringify({"asd":"asd"}), {
              status: 200,
              headers: {
                "Content-Type": "application/json; utf-8",
              },
              }),
              children:[
         

              ]
            },
            {
            path:"add",
            element: <AddEvent />,
          },
          {
            path:"delete/:eventId",
            action: async ({params}) => {
              if (params.eventId) {
                const eventId = parseInt(params.eventId);
                return await EventsApi.deleteById(eventId);                   }
            }
          },
          {
            path:":eventId/edit",
            loader:({params})=>{
              if (params.eventId){
                const eventId = parseInt(params.eventId)
              return EventsApi.findById(eventId)}
            },
            element:<AddEvent />
          }
          ]
        },{
          path: "/organizations",
          element: <OrganizationsController />,
          children:[
            {
            path:":organizationId",
            loader: ()=>{ return mockEevents[1]},
            element:<OragnizationDetails />,
          },    {
            path:"add",
            loader: ()=>{ return mockEevents[1]},
            element:<AddOrganization />,
          }
          ]
        },
        {
          path: "/reviews",
          element: <ReviewList />,
          children: [
            {
            path:":reviewId",
            element:<Review/>
          }, {
            path:"latest",
            element:<LatestReviews/>
          },
        ],
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
  ]);