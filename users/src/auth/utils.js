const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: (req, res, next) => {
    const header = req.headers['authorization'];
    console.log("headers---", header);
    const authorizationHeaader = req.headers.authorization;
   
    let result;
    if (authorizationHeaader) {
        console.log("i am here 1");
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, "addjsonwebtokensecret");

        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
      }
    } else {
        console.log("i am here 2");
      result = { 
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};