//correct key names
const templateKeys = [
  "workshopName",
  "tags",
  "nodes",
  "nodeName",
  "subnodes",
  "subnodeName",
  "items",
  "itemName",
  "detail1",
  "detail2",
  "detail3",
  "detail4",
];

//recursively obtain all keys used and puts them into an array
const GetAllKeys = (obj, results = []) => {
  const result = results;
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && typeof obj[key][0] !== "string") {
      if (typeof obj[key][0] === "object") result.push(key);
      GetAllKeys(obj[key], result);
    } else result.push(key);
  });

  return result;
}; //returns array of keys used in whole object

//recursively go through all keys and their values
var checkVal = 0; //global var for checking data types
const CheckAllValues = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") CheckAllValues(obj[key]);
    else if (typeof obj[key] !== "string") checkVal -= 1;
  });

  return checkVal;
}; //returns 0 if all data types correct

//compare keys against the key template and check key value data types
//only need to import this function
export function CompareObjects(testObj) {
  //remove duplicates in array
  var testKeyArray = [...new Set(GetAllKeys(testObj))];
  //compare string versions of key array
  if (JSON.stringify(testKeyArray) === JSON.stringify(templateKeys)) {
    checkVal = 0;
    //check data type of key values
    if (CheckAllValues(testObj) === 0) return true;
  }

  return false;
}

//Ensures that repeated instances of the object are removed from the array //TODO - Double check this code - seems a bit wonky
/**
 *
 * @param {array of objects} array
 * @param {string} item to be removed
 */
export function filterMoreThanOneInstanceItem(array, item) {
  var oneInstanceFound = false;
  var filteredArray = [];
  array.forEach((itemIter) => {
    if (itemIter.hazardName !== item) {
      filteredArray.push(itemIter);
    } else if (!oneInstanceFound && itemIter.itemName === item) {
      filteredArray.push(itemIter);
    }

    if (item.hazardName === item) {
      oneInstanceFound = true;
    }
  });
  console.log("Filtered Item List:", filteredArray);
}

// //Ensures that repeated instances of the object are removed from the array //TODO - Replace this
// /**
//  *
//  * @param {array of objects} array
//  * @param {string} item to be removed
//  */
// export function filterMoreThanOneInstanceHazard(array, hazard) {
//   var oneInstanceFound = false;
//   // var hazardtoNotBeRepeated = hazard;
//   var filteredArray = [];
//   array.forEach((hazardIter) => {
//     if (hazardIter.hazardName !== hazard) {
//       filteredArray.push(hazardIter);
//     } else if (!oneInstanceFound && hazardIter.hazardName === hazard) {
//       filteredArray.push(hazardIter);
//     }

//     if (hazard.hazardName === hazard) {
//       oneInstanceFound = true;
//     }
//   });
//   console.log("Filtered Hazard List:", filteredArray);
// }

/**
 * PrintJSON to console
 * @param {Object} jsonObj to be console logged
 */
export function printJSON(jsonObj) {
  console.log(JSON.stringify(jsonObj));
}

/**
 * Returns a unique Subnode ID
 * @param {string} nodeName
 * @param {string} subnodeName
 * @returns  unique subnode id
 */
export function getUniqueNodeID(nodeName, subnodeName) {
  console.log("GETTING NODE NAME");
  console.log(nodeName.concat(subnodeName));
  return nodeName.concat(subnodeName);
}

/**
 *  Returns a Node with proper format
 * @param {String} name
 * @param {Number} noSubnodes
 * @returns Node with template of n no Subnodes
 */
export function getNodeTemplate(name, noSubnodes) {
  var nodeObj = {
    nodeName: name,
    subnodes: [],
  };

  for (var i = 0; i < noSubnodes; i++) {
    nodeObj.subnodes.push(subnodeTemplate);
  }
  return nodeObj;
}

export function getSubNodeTemplate(name) {
  var subnodeObj = { ...subnodeTemplate };
  subnodeObj.subnodeName = name;
  return subnodeObj;
}

/**
 *  Subnode JSON Template
 */
export const subnodeTemplate = {
  subnodeName: "Default subnode",
  items: [
    {
      itemName: "Default Item",
      itemAllocated: false,
      detail1: [{ name: "Detail 1", visible: true }],
      detail2: [{ name: "Detail 2", visible: true }],
      detail3: [{ name: "Detail 3", visible: true }],
      detail4: [{ name: "Detail 4", visible: true }],
    },
  ],
};
/*
 * Item JSON Template
 */
export const itemTemplate = {
  itemName: "Default Hazard",
  itemAllocated: false,
  detail1: ["Detail 1"],
  detail2: ["Detail 2"],
  detail3: ["Detail 3"],
  detail4: ["Detail 4"],
};
