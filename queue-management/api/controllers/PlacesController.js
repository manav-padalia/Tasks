/**
 * PlacesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//require crypto for generate id for all database value
const { randomUUID } = require("crypto");

module.exports = {
  //user show all places with search bar and queue
  userPlaces: async (req, res) => {
    // search object got from query
    search = req.query.search;

    //if search object got then search with specific character of placename
    if (search) {
      let places = await Places.find({
        placename: { contains: search },
      });
      let tickets = await Ticket.find({ status: "Pending" });

      //set pending ticket at specific place
      places.filter((place) => {
        place.ticket = [];
        tickets.filter((ticket) => {
          if (ticket.placeId == place.id) {
            place.ticket.push(ticket);
          } else {
            place.ticket = [];
          }
        });
      });
      res.json({ Places: places, PlaceQueue: tickets.length });
    }

    //if not get search then show all places
    else {
      let places = await Places.find({});
      let tickets = await Ticket.find({ status: "Pending" });

      //set pending ticket at specific place
      places.filter((place) => {
        place.ticket = [];
        tickets.filter((ticket) => {
          if (ticket.placeId == place.id) {
            place.ticket.push(ticket);
          } else {
            place.ticket = [];
          }
        });
      });
      res.json({ Places: places, PlaceQueue: tickets.length });
    }
  },

  //admin show all places with search bar and queue
  adminPlaces: async (req, res) => {
    // search object got from query
    search = req.query.search;

    //if search object got then search with specific character of placename
    if (search) {
      let places = await Places.find({
        placename: { contains: search },
      });
      let tickets = await Ticket.find({ status: "Pending" });

      //set pending ticket at specific place
      places.filter((place) => {
        place.ticket = [];
        tickets.filter((ticket) => {
          if (ticket.placeId == place.id) {
            place.ticket.push(ticket);
          } else {
            place.ticket = [];
          }
        });
      });
      res.json({ Places: places, PlaceQueue: tickets.length });
    }

    //if not get search then show all places
    else {
      //find all place's placename
      let places = await Places.find({}).select("placename");
      //find all pending tickets
      let tickets = await Ticket.find({ status: "Pending" });

      //set pending ticket at specific place
      places.filter((place) => {
        place.ticket = [];
        tickets.filter((ticket) => {
          if (ticket.placeId == place.id) {
            place.ticket.push(ticket);
          } else {
            place.ticket = [];
          }
        });
      });
      res.json({ Places: places, PlaceQueue: tickets.length });
    }
  },

  addPlace: async (req, res) => {
    //get placename from body
    const placename = req.body.placename;
    //get current adding time
    const date = new Date().getTime();

    //place find with place name if already exist then give message that place already exist
    const placeexist = await Places.findOne({ placename: placename });
    if (placeexist) {
      res.json({ message: "place already exist" });
    } else {
      //find places in descending order
      const places = await Places.find().sort([{ createdAt: "DESC" }]);

      //if places not find then first place create with prefix alphabet A else that follow ascii value for next prefix generate
      if ((places.length == 0)) {
        const alph = "A";
        //create new place with place name and generated prefix(alph)
        await Places.create({
          id: randomUUID(),
          placename: placename,
          createdAt: date,
          updatedAt: date,
          alph: alph,
        });
        res.json({ message: "place added" });
      } else {
        //find places in descending order and find prefix and create new prefix that's next of last
        const place = await Places.find().sort([{ createdAt: "DESC" }]);
        const alphabet = place[0].alph;
        const newalphabet = alphabet.charCodeAt(0) + 1;
        const alph = String.fromCharCode(newalphabet);
        //create new place with place name and generated prefix(alph)
        await Places.create({
          id: randomUUID(),
          placename: placename,
          createdAt: date,
          updatedAt: date,
          alph: alph,
        });
        res.json({ message: "place added" });
      }
    }
  },

  editPlace: async (req, res) => {
    //get specific placename with placeid
    const places = await Places.findOne({ id: req.params.id }).select(
      "placename"
    );
    res.send(places);
  },

  updatePlace: async (req, res) => {
    //get placeid from params and new placename from body
    const id = req.params.id;
    const placename = req.body.placename;

    //if placename find from places then that show message that place already exist else update placename
    const placeexist = await Places.findOne({ placename: placename });
    if (placeexist) {
      res.json({ message: "place already exist" });
    } else {
      await Places.update(id, {
        placename: placename,
      });
      res.json({ message: "place updated" });
    }
  },

  deletePlace: async (req, res) => {
    //delete specific place with id
    await Places.destroyOne({ id: req.params.id });
    res.json({ message: "place deleted" });
  },
};
