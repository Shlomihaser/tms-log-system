import IUser from "./user.type.ts";

declare global {
    namespace Express {
        interface Request {
            user?: IUser; 
        }
    }
}

interface CustomJwtPayload extends JwtPayload { userId: string; } 