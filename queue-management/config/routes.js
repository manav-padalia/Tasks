/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  //static admin login
  "POST /admin/auth/login": "AdminController.login",
  //admin logout with authantication
  "POST /admin/auth/logout": "AdminController.logout",

  //create new user with signup
  "POST /user/auth/signup": "UserController.register",
  //login with validation
  "POST /user/auth/login": "UserController.login",
  //user logout with authantication
  "POST /user/auth/logout": "UserController.logout",

  //admin get all places with pending ticket
  "GET /admin/place": "PlacesController.admin",
  //admin create new place with placename
  "POST /admin/place": "PlacesController.create",
  //admin can delete specific place with placeid
  "DELETE /admin/place/:id": "PlacesController.delete",
  //admin can update specific place with placeid
  "POST /admin/place/:id": "PlacesController.update",

  //user get all places with pending ticket
  "GET /user/place": "PlacesController.user",

  //user can book their ticket at specific place with specific placeid
  "POST /user/ticket/:id": "TicketController.create",
  //admin get all pending tickets with specific place
  "GET /admin/ticket/:id": "TicketController.admin",
  //admin processed ticket with ticketid
  "POST /admin/process-ticket/:id": "TicketController.processed",

  //user show their pending all tickets
  "GET /user/ticket/:status": "TicketController.userHistory",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
