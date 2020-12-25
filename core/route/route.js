"use strict";
const path = require("path");
const ValidateJWTMiddleware = require(path.resolve('./core/middleware/validate-jwt.js'));
// const UserRouter = require(path.resolve("./src/api/user/route/user"));
const EmployeeRouter = require(path.resolve("./src/api/employee/employee.route"));
const TeamRouter = require(path.resolve("./src/api/team/team.route"));
const AuthenticationRouter = require(path.resolve('./src/api/authentication/route/authentication'));

function initRouteModule(app) {
  app.use(`/${global.config.prefix_module.admin}authentication`, AuthenticationRouter);
  app.use(`/${global.config.prefix_module.admin}*`, ValidateJWTMiddleware.isAuth);
  app.use(`/${global.config.prefix_module.admin}employee`, EmployeeRouter);
  app.use(`/${global.config.prefix_module.admin}team`, TeamRouter);

  app.use(function (req, res, next) {
    return res.status(404).send({
      error: true,
      message: "Page not found",
    });
    // next(createError(404));
  });
}

module.exports = initRouteModule;
