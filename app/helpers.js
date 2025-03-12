
'use strict';
const myLogger = (tokens) => {
  return (req, _, next) => {
    console.log(`Incoming: ${req.url}\nIP: ${req.ip}`);
    if (tokens.length) {
      console.log("Users:");
    }
    tokens.forEach(t => console.log(t.name));
    next();
  };
};

export { myLogger };
