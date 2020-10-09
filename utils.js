/**
 * stores: Stores registered in the 'database'
 * getDistance: Calculates the distance between two coordinates in km
 */
module.exports = {
  stores: [
    {
      storeId: 2,
      storeName: "Recoger en Tienda Cumbres",
      isOpen: true,
      coordinates: {
        lat: 25.8322,
        lon: -100.2978,
      },
      nextDeliveryTime: 0,
    },
    {
      storeId: 4,
      storeName: "Recoger en tienda Chipinque",
      isOpen: false,
      coordinates: {
        lat: 25.749346,
        lon: -100.259866,
      },
      nextDeliveryTime: 0,
    },
    {
      storeId: 6,
      storeName: "Recoger en tienda Sendero",
      isOpen: true,
      coordinates: {
        lat: 25.871035,
        lon: -100.17329,
      },
      nextDeliveryTime: 0,
    },
    {
      storeId: 8,
      storeName: "Recoger en tienda Contry",
      isOpen: false,
      coordinates: {
        lat: 25.7261055,
        lon: -100.1750157,
      },
      nextDeliveryTime: 0,
    },
  ],
  getDistance: function (coor1, coor2) {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    var radiusEarth = 6371; // Radius earth in km
    var dLat = deg2rad(coor2.lat - coor1.lat);
    var dLon = deg2rad(coor2.lon - coor1.lon);
    var a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coor1.lat)) * Math.cos(deg2rad(coor2.lat)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var dist = radiusEarth * c; // Distance in km
    return dist;
  },
};
