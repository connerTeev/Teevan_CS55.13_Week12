import fs from 'fs';
import path from 'path';

//Get filepath to data directory
const pathToData = path.join(process.cwd(), 'data');

// A function that returns names and ids from json file and sorts by name
export function getSortedFruitsList() {
  //get filepath to json
  const filePath = path.join(pathToData, 'fruits.json');
  
  //load json's contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  
  //convert returned string into a json object
  const jsonObj = JSON.parse(jsonString);
  
  //sort json by name property
  jsonObj.sort(
    (a,b) => {
      return a.name.localeCompare(b.name);
    }
  );
  
  //use map() to extract id and name to be made into a new json object
  return jsonObj.map(
    (item) => {
      return {
        id: item.id.toString(),
        name: item.name
      }
    }
  )
}

//function to return ids for all json objects
export function getFruitIds() {
  //get filepath to JSON
  const filePath = path.join(pathToData, 'fruits.json');
  
  //load json's contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  
  //convert returned string into a json object
  const jsonObj = JSON.parse(jsonString);

  //use map() to extract id and name to be made into a new json object
  return jsonObj.map(
    (item) => {
      return {
        params: {
          id: item.id.toString()
        }
      };
    }
  );
}

//function to return each of he properties for one single object with a match id prop value
export async function getFruitData(idRequested) {
//get filepath to json
const filePath = path.join(pathToData, 'fruits.json');
  
//load json's contents
const jsonString = fs.readFileSync(filePath, 'utf8');

//convert returned string into a json object
const jsonObj = JSON.parse(jsonString);

//find object value in array that has a matching id
const objMatch = jsonObj.filter(
  (obj) => {
    return obj.id.toString() === idRequested;
  }
);

//extract object value in filtered array if found
let objReturned;
if (objMatch.length > 0) {
  objReturned = objMatch[0];
} else {
  objReturned = {};
}

//return object value found
return objReturned;
}