import { IComment } from "../model/comment";
import { IEvent } from "../model/event";
import { IOrganization } from "../model/organization";
import { IPlace } from "../model/place";
import { IReview } from "../model/review";
import { IUser } from "../model/user";
import { commentValidationSchema, eventValidationSchema, organizationValidationSchema, reviewValidationSchema, userValidationsSchema } from "../utils/validationSchemas";
import customRouter from "./custom-router";
import modifyChildRouter from "./modifyChildRouter";
import { EventsRepository, CommentsRepository, OrganizationsRepository, PlacesRepository, ReviewsRepository, UsersRepository } from "../dao/repository";

const childCommentsRouter = customRouter<IComment>(CommentsRepository,'comment',true,commentValidationSchema)
modifyChildRouter<IComment>(childCommentsRouter,process.env.DB_FOLDER+process.env.COMMENTS_DB,commentValidationSchema);
const childReviewsRouter = customRouter<IReview>(ReviewsRepository,'review',true,reviewValidationSchema)
modifyChildRouter<IReview>(childReviewsRouter,process.env.DB_FOLDER+process.env.COMMENTS_DB,reviewValidationSchema);


export const eventsRouter = customRouter<IEvent>(EventsRepository, 'event',false,eventValidationSchema);
eventsRouter.use('/:parentid/comments',childCommentsRouter );

export const usersRouter = customRouter<IUser>(UsersRepository, 'user',false,userValidationsSchema)
usersRouter.use('/:parentid/comments',childCommentsRouter )

export const organizationsRouter = customRouter<IOrganization>(OrganizationsRepository, 'organization',false,organizationValidationSchema);
organizationsRouter.use('/:parentid/comments',childCommentsRouter)

export const commentsRouter = customRouter<IComment>(CommentsRepository, 'comment');
export const reviewsRouter =  customRouter<IReview>(ReviewsRepository, 'review');
export const placesRouter = customRouter<IPlace>(PlacesRepository, 'place');