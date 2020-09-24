const axios = require('axios');
const randomInt = require('random-int');
var plotly = require('plotly')("ishan1104", "zbwMPXEsJNIUckNfUszO"); 
const mongoose = require('mongoose'); 
setInterval(makePostRequest, 15000);
var data = {
  x:[],
  y:[],
  type: "scatter"
}

var datas = {
  x:[],
  y:[],
  type: "bar"
}

var datass = {
  x:[],
  y:[],
  type: "lines"
}

async function makePostRequest() {
  startTime = Date.now();
  mongoose.connect("mongodb+srv://ivij:Ish%40nvij11@task.c7clx.mongodb.net", {useNewUrlParser:true, useUnifiedTopology: true });


  const NurseName = "Ishan";
  const MedicareNumber = "123265";
  const PatientName = "Kevin Lee";
  const RoomNumber = "32165";
  const ts = Date.now();
  const light_intensity = randomInt(0,500);
  const temp = randomInt(20,40);
  const motion_detected = randomInt(0,1);
  console.log(ts);
  console.log(light_intensity);
  console.log(temp);
  console.log(motion_detected);

  const body = {
    NurseName,
    MedicareNumber,
    PatientName,
    RoomNumber,
    ts,
    light_intensity,
    temp,
    motion_detected
  };
  data.x.push((new Date()).toISOString());
  data.y.push(light_intensity);
  endTime = Date.now();
  time = endTime-startTime;
  var graphOptions = {
    filename: "ishan", fileopt:"overwrite"
};

plotly.plot(data, graphOptions, function (err, msg) {
  if (err) return console.log(err);
  console.log(msg);
});

datas.x.push((new Date()).toISOString());
  datas.y.push(motion_detected);
  var graphOption = {
    filename: "motion", fileopt:"overwrite"
};

plotly.plot(datas, graphOption, function (err, msg) {
  if (err) return console.log(err);
  console.log(msg);
});

datass.x.push((new Date()).toISOString());
  datass.y.push(temp);
  var graphOptionss = {
    filename: "temp", fileopt:"overwrite"
};

plotly.plot(datass, graphOptionss, function (err, msg) {
  if (err) return console.log(err);
  console.log(msg);
});

  let res = await axios.post('http://localhost:5000/api/patients/RoomData', body);    
  mongoose.connection.close();
}
makePostRequest();