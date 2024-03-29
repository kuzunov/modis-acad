import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

dotenv.config();

import { authRouter, commentsRouter, eventsRouter, organizationsRouter, placesRouter, reviewsRouter, usersRouter } from './routers/comap-routers';
import { RepositoryImpl } from './dao/repository';
import { IEvent } from './model/event';
import { IUser } from './model/user';
import { IOrganization } from './model/organization';
import { IComment } from './model/comment';
import { IReview } from './model/review';
import { IPlace } from './model/place';
import { ChildRepositoryImpl } from './dao/child-entity-repository';
import { UsersRepositoryImpl } from './dao/users-repository';


const app = express();


app.use(cors())
app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));

app.use('/api/events',eventsRouter);

app.use('/api/users', usersRouter);


app.use('/api/organizations', organizationsRouter);

app.use('/api/comments', commentsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/places', placesRouter);
app.use('/api/auth', authRouter);






// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     sendErrorResponse(req, res, err.status || 500, `Server error: ${err.message}`, err);
// })

(async () => {
    console.log(process.env.DB_URL)
    const con = await MongoClient.connect(process.env.DB_URL);
    const db = con.db(process.env.DB_NAME);
    app.locals.UsersRepository = new UsersRepositoryImpl(db,'users');
    app.locals.EventsRepository = new RepositoryImpl<IEvent>(db,'events');
    app.locals.OrganizationsRepository = new RepositoryImpl<IOrganization>(db,'ogranizations');
    app.locals.CommentsRepository = new RepositoryImpl<IComment>(db,'comments');
    app.locals.ReviewsRepository = new RepositoryImpl<IReview>(db,'reviews');
    app.locals.PlacesRepository = new RepositoryImpl<IPlace>(db,'places');
    app.locals.CommentsChildRepository = new ChildRepositoryImpl<IComment>(db,'comments');
    app.locals.ReviewsChildRepository = new ChildRepositoryImpl<IReview>(db,'reviews');
    


    app.listen(+process.env.PORT, process.env.HOSTNAME, () => {
        console.log(`Listening on http://${process.env.HOSTNAME}:${process.env.PORT}`)
    })
    
})();
