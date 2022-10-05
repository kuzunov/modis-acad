import { IComment } from "../model/comment";
import { IEvent } from "../model/event";
import { IOrganization } from "../model/organization";
import { IPlace } from "../model/place";
import { IReview } from "../model/review";
import { IUser } from "../model/user";
import { commentValidationSchema, eventValidationSchema, organizationValidationSchema, reviewValidationSchema, userValidationsSchema } from "../utils/validationSchemas";
import customRouter from "./custom-router";
import modifyChildRouter from "./modifyChildRouter";

const childCommentsRouter = customRouter<IComment>(process.env.DB_FOLDER+process.env.COMMENTS_DB,'comment',true,commentValidationSchema)
modifyChildRouter<IComment>(childCommentsRouter,process.env.DB_FOLDER+process.env.COMMENTS_DB,commentValidationSchema);
const childReviewsRouter = customRouter<IReview>(process.env.DB_FILES+process.env.COMMENTS_DB,'review',true)
modifyChildRouter(childReviewsRouter,process.env.DB_FOLDER+process.env.COMMENTS_DB,reviewValidationSchema);


export const eventsRouter = customRouter<IEvent>(process.env.DB_FOLDER+process.env.EVENTS_DB, 'event',false,eventValidationSchema);
eventsRouter.use('/:parentid/comments',childCommentsRouter );

export const usersRouter = customRouter<IUser>(process.env.DB_FOLDER+process.env.USERS_DB, 'user',false,userValidationsSchema)
usersRouter.use('/:parentid/comments',childCommentsRouter )

export const organizationsRouter = customRouter<IOrganization>(process.env.DB_FOLDER+process.env.ORGANIZATIONS_DB, 'organization',false,organizationValidationSchema);
organizationsRouter.use('/:parentid/comments',childCommentsRouter)

export const commentsRouter = customRouter<IComment>(process.env.DB_FOLDER+process.env.COMMENTS_DB, 'comment');
export const reviewsRouter =  customRouter<IReview>(process.env.DB_FOLDER+process.env.REVIEWS_DB, 'review');
export const placesRouter = customRouter<IPlace>(process.env.DB_FOLDER+process.env.PLACES_DB, 'place');