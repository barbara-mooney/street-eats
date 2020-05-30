module.exports = function(app) {
    app.on('started', function() {
      app.io = require('socket.io').listen(app.server)
  
      let locations = [];

      app.io.on('connection', socket => {
          console.log('user is connected')
      
          socket.on('position', (location, businessId, selected, businessName, priceRange, foodStyle) => {
            const ownerData = {...location, ...businessId, ...selected, ...businessName, ...priceRange, ...foodStyle}
            locations.push(ownerData);
            socket.emit('position');
          })

          socket.on('checkPosition', businessId => {
            for(let i = 0; i < businessId.length; i++){
              const liveTruck = locations.filter(a => a.businessIds == businessId[i])
              if(liveTruck.length >= 1){
                socket.emit('checkPosition', liveTruck)
                return;
            }
          }
          })

          socket.on('updateLocation', location => {
            const updatedLocation = locations.filter(a => a.businessIds == location.businessIds);
            if(updatedLocation.length > 0) {
              locations = locations.filter(a => a.businessIds !== location.businessIds);
              locations.push(location);
            }
          })

          socket.on('checkPosition', businessId => {
            const liveTruck = locations.filter(a => a.businessIds == businessId)
            if(liveTruck.length >= 1){
              socket.emit('checkPosition', liveTruck)
            }
          })

          socket.emit('mapPositions', locations.map(a => {
             return {
                 latitude: a.latitude,
                 longitude: a.longitude,
                 businessId: a.businessIds,
                 businessName: a.businessName,
                 priceRange: a.priceRange,
                 foodStyle: a.foodStyle
             }
          }));
          
          socket.on('disconnectUser', (businessId) => {
            locations = locations.filter(a => a.businessIds !== businessId) || [];
            socket.emit('disconnectUser');
            console.log('user is disconnected');
          });
      });
    });
  }
