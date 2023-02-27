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
  user: async (req, res) => {
    // search object got from query
    search = req.query.search;

    //if search object got then search with specific character of placename 
    if (search) {
      let places = await Places.find({
        placename: { contains: search },
      })
        .populate("ticket")
        .select("placename");
      res.status(200).json({ Places: places, places: places.length });
    }

    //if not get search then show all places
    else {
      //find all place's placename
      let places = await Places.find({}).populate("ticket").select("placename");
      res.status(200).json({ Places: places, places: places.length });
    }
  },

  //admin show all places with search bar and queue
  admin: async (req, res) => {
    // search object got from query
    search = req.query.search;

    //if search object got then search with specific character of placename
    if (search) {
      let places = await Places.find({
        placename: { contains: search },
      })
        .populate("ticket")
        .select("placename");
      res.status(200).json({ Places: places, places: places.length });
    }

    //if not get search then show all places
    else {
      let places = await Places.find({}).populate("ticket").select("placename");
      res.status(200).json({ Places: places, places: places.length });
    }
  },

  create: async (req, res) => {
    //get placename from body
    const placename = req.body.placename;
    //get current adding time
    const date = new Date().getTime();

    //place find with place name if already exist then give message that place already exist
    const placeexist = await Places.findOne({ placename: placename });
    if (placeexist) {
      res.status(208).json({message: "Place is already exist."});
    } else {
      //find places in descending order
      const places = await Places.find().sort([{ createdAt: "DESC" }]);

      //if places not find then first place create with prefix alphabet A else that follow ascii value for next prefix generate
      if (places.length == 0) {
        const alph = "A";
        //create new place with place name and generated prefix(alph)
        const newPlace = await Places.create({
          id: randomUUID(),
          placename: placename,
          createdAt: date,
          updatedAt: date,
          alph: alph,
        }).fetch();
        res.status(200).send(newPlace);
      } else {
        //find places in descending order and find prefix and create new prefix that's next of last
        const place = await Places.find().sort([{ createdAt: "DESC" }]);
        const alphabet = place[0].alph;
        const newalphabet = alphabet.charCodeAt(0) + 1;
        const alph = String.fromCharCode(newalphabet);
        //create new place with place name and generated prefix(alph)
        const newPlace = await Places.create({
          id: randomUUID(),
          placename: placename,
          createdAt: date,
          updatedAt: date,
          alph: alph,
        }).fetch();
        res.status(200).send(newPlace);
      }
    }
  },

  update: async (req, res) => {
    //get placeid from params and new placename from body
    const id = req.params.id;
    const placename = req.body.placename;

    //if placename find from places then that show message that place already exist else update placename
    const placeexist = await Places.findOne({ placename: placename });
    if (placeexist) {
      res.status(208).json({message: "Place is already exist."});;
    } else {
      const newPlace = await Places.updateOne(id, {
        placename: placename,
      });
      res.status(200).send(newPlace);
    }
  },

  delete: async (req, res) => {
    //delete specific place with id
    await Places.destroyOne({ id: req.params.id });
    res.status(200).json({message: "Place is deleted successfully"});;
  },
};
