import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';+
dotenv.config();

import { commentsRouter, eventsRouter, organizationsRouter, placesRouter, reviewsRouter, usersRouter } from './routers/comap-routers';


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






// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     sendErrorResponse(req, res, err.status || 500, `Server error: ${err.message}`, err);
// })

app.listen(+process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Listening on http://${process.env.HOSTNAME}:${process.env.PORT}`)
})