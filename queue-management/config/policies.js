/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // "/adminlogout":"Auth",

  UserController: {
    userLogout: "userAuth",
  },
  AdminController: {
    adminLogout: "adminAuth",
  },
  PlacesController: {
    userPlaces : "userAuth",
    adminPlaces: "adminAuth",
    addPlace: "adminAuth",
    editPlace: "adminAuth",
    updatePlace: "adminAuth",
    deletePlace : "adminAuth"
  },
  TicketController: {
    userPendingTicket: "userAuth",
    userProcessedTicket: "userAuth",
    createTicket: "userAuth",
    adminTicket: "adminAuth",
    proceedTicket: "adminAuth"
  },
};
