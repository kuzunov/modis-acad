import { IEvent } from "./model/event";
import { IUser, USER_ROLE, USER_STATUS } from "./model/user";
export const mockEevents = [
    {id:1,
        name:"peshlaka",
        date:1705,
        poster:"https://poster.triennial.orbitel.bg/wp-content/uploads/2021/06/10r-poster-935x400.jpg",
        location:{ lat: -34.397, lng: 150.644 },

        participants: []} as unknown as IEvent,{id:2,
            name:"peshlaka",
            date:1705,
            poster:"https://poster.triennial.orbitel.bg/wp-content/uploads/2021/06/10r-poster-935x400.jpg",
    
            participants: []} as unknown as IEvent,{id:3,
                name:"peshlaka",
                date:1705,
                poster:"https://poster.triennial.orbitel.bg/wp-content/uploads/2021/06/10r-poster-935x400.jpg",
        
                participants: []} as unknown as IEvent,{id:4,
                    name:"peshlaka",
                    date:1705,
                    poster:"https://poster.triennial.orbitel.bg/wp-content/uploads/2021/06/10r-poster-935x400.jpg",
            
                    participants: []} as unknown as IEvent,{id:5,
                        name:"peshlaka",
                        date:1705,
                        poster:"https://poster.triennial.orbitel.bg/wp-content/uploads/2021/06/10r-poster-935x400.jpg",
                
                        participants: []} as unknown as IEvent,
    {id:6,
        name:"peshlakata",
        date:17205,
        poster:"https://poster.triennial.orbitel.bg/wp-content/uploads/2021/06/10r-poster-935x400.jpg",

        participants: []}as unknown as IEvent,
];
export const mock_user:IUser = {
    id: 1,
    firstName: "Ivan",
    lastName: "Petkan",
    username: "ivankata",
    password: "petkankata",
    gender: "m",
    role: USER_ROLE.ADMIN,
    status: USER_STATUS.ACTIVE,
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Anser_anser_1_%28Piotr_Kuczynski%29.jpg/1200px-Anser_anser_1_%28Piotr_Kuczynski%29.jpg",
    registered: 0,
    modified: 0
}