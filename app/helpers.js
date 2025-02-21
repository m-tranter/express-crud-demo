import { v4 } from 'uuid';

const myLogger = function(req, _, next) {
  console.log(`Incoming: ${req.url}`);
  next();
};

const makeItem = (obj) => {
  return { ...obj, id: v4(), editing: false, v: 0 }
};

export { myLogger, makeItem };
