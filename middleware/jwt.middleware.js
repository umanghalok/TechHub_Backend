import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];//accessToken concat with Bearer
    const token = authHeader && authHeader.split(' ')[1];//Extract the token from the 'Bearer <token>' format
    // console.log(authHeader);
    try{
        if (token == null) {
            return response.status(401).json({ msg: 'token is missing' });
            //The HTTP 401 Unauthorized client error response status code indicates that a request was not successful
        }
    
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(403).json({ msg: 'invalid token' })
                // The HTTP 403 Forbidden client error response status code indicates that the server understood the request but refused to process it.
            }
    
            request.user = user;// Store the decoded user information in the request object
            next();//so that now middleware passes the control to the next controller
        })
    }
    catch(error){
        return response.status(500).json({msg: error.msg});
    }
    
}