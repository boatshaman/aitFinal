const https = require('https');

class apiCallbacks {
    constructor(db) {
        this.calls = [];
        this.db = db;
    }
    addCall(call){
      this.calls.push(call);
    }

    checkCalls(){
      this.calls = this.calls.filter((call) =>{
        if(call.checkDone()){
          this.addToDb(call);
          return 0;
        }
        return 1;
      });

    }


    addToDb(call){
      this.db.findOneAndUpdate({latlng:call.latlng , cookie:call.cookie}, {$set: {address: call.address}}, (err, coord, count) => {
        if(err){
          console.log("error adding memory");
        }else{
          // console.log("success!");
      }
    });
    }

  }

class apiCall {
    constructor(latlng, cookie) {
        this.latlng = latlng;
        this.cookie = cookie;
        this.address = null;
    }

    run(){
      const latlon = JSON.parse(this.latlng);
      const appId = 'kSqfuMo08OFSMTD6yfnO';
      const appCode = 'w9zrmya4v1m8EAUnbVrqXA';
      const lat = latlon['lat'];
      const lon = latlon['lng'];

      const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json'
      const finUrl = encodeURI(`${url}?prox=${lat},${lon},500&mode=retrieveAddresses&maxresults=1&gen=9&app_id=${appId}&app_code=${appCode}`);


      https.get(finUrl, (resp) => {
        let data = '';


        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {

          const addy = JSON.parse(data).Response.View[0].Result[0].Location.Address.Label;

          this.address = addy;
          // return addy;
        });

      }).on("error", (err) => {
        this.address = `Lat - ${lat}, Long - ${lon}`;
        console.log(err, ret);

        // return ret;
      });
    }

    checkDone(){
      return this.address !== null;
    }

}

module.exports = {
  apiCallbacks,
  apiCall
}
