const Room = require('../models/Room.model');

const createRoom = async (req, res, next) => {
  try {
    const { name } = req.body;
    const room = new Room({ name, createdBy: req.userId });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate('createdBy', 'username');
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = { createRoom, getRooms };