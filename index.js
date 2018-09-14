const fs = require('fs');
let exifParse = require('jpeg-exif');

//----------Config-------------
const directory = './NMMI_200_Test2_Rjpeg/';
const coordsPref = "dms"; //Options include: "dec" for decimals, and "dms" for degrees, minutes, and seconds.

//----------Classes and Supporting Functions-------------
class droneSet{
  constructor(dir){
    this.imageArray = imFileConst(dir);
    this.data = {};
    this.imageArray.forEach((c,i,a) => {
      let temp = exifParse.parseSync(`${dir}${c}`);
      this.data[c] = {
        "gps":temp.GPSInfo,
        "csv":`${c.split(".")[0]}.csv`
      }
    });
  }
  latLongReadout(img){
    let lat = this.data[img].gps.GPSLatitude;
    let dirNS = this.data[img].gps.GPSLatitudeRef;
    let dirWE = this.data[img].gps.GPSLongitudeRef;
    let long = this.data[img].gps.GPSLongitude;
    let dmsLat = `${lat[0]}º ${lat[1]}' ${lat[2]}" ${dirNS}`;
    let dmsLong = `${long[0]}º ${long[1]}' ${long[2]}" ${dirWE}`;
    let decLat = `${lat[0] + (lat[1]/60) + (lat[2]/3600)}º ${dirNS}`;
    let decLong = `${long[0] + (long[1]/60) + (long[2]/3600)}º ${dirWE}`;
    return (coordsPref == "dms") ? `${dmsLat}, ${dmsLong}`: `${decLat}, ${decLong}`;
  }
}
function imFileConst(dir){
  let outObj = [];
  let files = fs.readdirSync(dir,{encoding:'utf8'});
  files.forEach(file => {
    outObj.push(file);
  });
  return outObj;
}

//----------Main Program-------------
let tedData = new droneSet(directory);
tedData.imageArray.forEach((c,i,a) => {
  console.log(`${c}:\n  (${tedData.latLongReadout(c)})`);
});
