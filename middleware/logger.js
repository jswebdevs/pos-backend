const logger = (req, res, next) => {
    console.log('Inside the logger:');
    next();
  };
  
  module.exports = logger;
  