const Point = require('../models/point');

const point = () => {

  const PointType = async (pointType) => {
    const type = await Point.findOne({where: { type: pointType }});
    return type;
  };
  return {
    PointType
  }
};

module.exports = point;