/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//require crypto for generate id for all database value
const { randomUUID } = require("crypto");

module.exports = {
  //user show their all pending tickets
  userHistory: async (req, res) => {
    let status = req.params.status;
    //token find from cookie
    const token = req.cookies.token;
    //owner of ticket find from user database with token
    const owner = await User.findOne({ token: token });

    if (status == "pending") {
      //find pending tiket of specific user
      const ticketPending = await Ticket.find({
        owner: owner.id,
        status: "Pending",
      });
      res.send(ticketPending);
    } else if (status == "processed") {
      const ticketProcessed = await Ticket.find({
        owner: owner.id,
        status: "Processed",
      });
      res.status(200).send(ticketProcessed);
    } else {
      res.status(400);
    }
  },

  //book specific place ticket by user
  create: async (req, res) => {
    try {
      //take placeid from params
      const placeId = req.params.id;
      //token find from cookie
      const token = req.cookies.token;
      //find place with placeid
      const place = await Places.findOne({ id: placeId });
      //get realtime of ticket generation
      const date = new Date().getTime();
      //generated ticket store as pending status
      const status = "Pending";
      //last ticket of specific place find with placeid
      let tickets = await Ticket.find({ placeId: placeId })
        .sort([{ createdAt: "DESC" }])
        .limit(1);
      //find user with token
      const userId = await User.findOne({ token: token });

      //generate first ticket of specific place from 001
      if (tickets.length == 0) {
        const ticketNo = "001";

        //ticket create with specific place with specific owner
        const newTicket = await Ticket.create({
          id: randomUUID(),
          ticketNo: ticketNo,
          createdAt: date,
          updatedAt: date,
          placeId: placeId,
          status: status,
          placeAlph: place.alph,
          owner: userId.id,
        }).fetch();
        res
          .status(200)
          .json({ message: "Ticket generated successfully." }, newTicket);
      } else {
        //if tickets get from database then check last generated ticket and create next ticket
        let ticno = tickets[0].ticketNo;

        //if ticket is less then 9 then that store with extra two zeros
        if (parseInt(ticno) < 9) {
          let ticketNo = "00" + (parseInt(ticno) + 1);

          //ticket create with specific place with specific owner
          const newTicket = await Ticket.create({
            id: randomUUID(),
            ticketNo: ticketNo,
            createdAt: date,
            updatedAt: date,
            placeId: placeId,
            status: status,
            placeAlph: place.alph,
            owner: userId.id,
          }).fetch();
          res
            .status(200)
            .json({ message: "Ticket generated successfully." }, newTicket);
        }

        //if ticket is greater then 99 then that store three digit new ticket
        else if (parseInt(ticno) >= 99) {
          let ticketNo = parseInt(ticno) + 1;

          //ticket create with specific place with specific owner
          const newTicket = await Ticket.create({
            id: randomUUID(),
            ticketNo: ticketNo,
            createdAt: date,
            updatedAt: date,
            placeId: placeId,
            status: status,
            placeAlph: place.alph,
            owner: userId.id,
          }).fetch();
          res
            .status(200)
            .json({ message: "Ticket generated successfully." }, newTicket);
        }
        //if ticket is greater then 9 then that store with a extra zero
        else if (parseInt(ticno) >= 9) {
          let ticketNo = "0" + (parseInt(ticno) + 1);
          //ticket create with specific place with specific owner
          const newTicket = await Ticket.create({
            id: randomUUID(),
            ticketNo: ticketNo,
            createdAt: date,
            updatedAt: date,
            placeId: placeId,
            status: status,
            placeAlph: place.alph,
            owner: userId.id,
          });
          res
            .status(200)
            .json({ message: "Ticket generated successfully." }, newTicket);
        }
      }
    } catch (error) {
      res.status(424).json({ message: "Some error during ticket generation." });
      console.log(error);
    }
  },

  //admin show pending ticket of specific place
  admin: async (req, res) => {
    //take placeid from params
    const placeid = req.params.id;

    //find tickets that status was pending with specific place
    let tickets = await Ticket.find({ status: "Pending", placeId: placeid });
    res.status(200).send(tickets);
  },

  processed: async (req, res) => {
    //get ticket id from params
    let id = req.params.id;

    //get ticket form id and update status to processed
    await Ticket.updateOne(id, { status: "Processed" });
    res.status(200).json({ message: "Processed" });
  },
};
