const {
  house: {
    cordinate: { x, y },
    location: { streetAddress, region },
    room: [{ name, bedCount, type }],
  },
} = req.body;
