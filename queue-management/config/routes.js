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

  // "/": { view: "pages/homepage" },
  //static admin login
  "POST /adminlogin": "AdminController.adminLogin",
  //admin logout with authantication
  "POST /adminlogout": "AdminController.adminLogout",

  //create new user with signup
  "POST /usersignup": "UserController.userSignup",
  //login with validation
  "POST /userlogin": "UserController.userLogin",
  //user logout with authantication
  "POST /userlogout": "UserController.userLogout",

  //admin get all places with pending ticket
  "GET /adminplace": "PlacesController.adminPlaces",
  //admin create new place with placename
  "POST /admin/addplace": "PlacesController.addPlace",
  //admin can delete specific place with placeid
  "GET /admin/deleteplace/:id": "PlacesController.deletePlace",
  //admin can edit placename with placeid
  "GET /admin/editplace/:id": "PlacesController.editPlace",
  //admin can update specific place with placeid
  "POST /admin/updateplace/:id": "PlacesController.updatePlace",
  //user get all places with pending ticket
  "GET /userplace": "PlacesController.userPlaces",

  //user can book their ticket at specific place with specific placeid
  "POST /user/createticket/:id": "TicketController.createTicket",
  //admin get all pending tickets with specific place
  "GET /adminticket/:id": "TicketController.adminTicket",
  //admin processed ticket with ticketid
  "POST /admin/proceedticket/:id": "TicketController.proceedTicket",

  //user show their pending all tickets
  "GET /userpending": "TicketController.userPendingTicket",
  //user show their processed all tickets
  "GET /userprocessed": "TicketController.userProcessedTicket",

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
