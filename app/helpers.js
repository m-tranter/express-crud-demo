
const myLogger = function(req, _, next) {
  console.log(`Incoming: ${req.url}`);
  next();
};



export { myLogger };
