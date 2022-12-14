import { getSessionByToken } from "../repositories/sessionsRepository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function validateToken(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    let session;

    try {
        if (token) {
            session = (await getSessionByToken(token)).rows[0];
        }
        if (!token || !session) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        res.locals.user = session.user_id;
        return next();
    } catch (err) {
        console.error(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
