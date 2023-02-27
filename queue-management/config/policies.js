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
    logout: "userAuth",
  },
  AdminController: {
    logout: "adminAuth",
  },
  PlacesController: {
    user: "userAuth",
    admin: "adminAuth",
    create: "adminAuth",
    update: "adminAuth",
    delete: "adminAuth",
  },
  TicketController: {
    userHistory: "userAuth",
    create: "userAuth",
    admin: "adminAuth",
    processed: "adminAuth",
  },
};
