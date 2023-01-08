/**
 * Capitalizes the first letter of a String
 * @param {string} str string to capitalise
 * @returns  String with first letter capitalised
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if the string is empty
 * @param {string} str String to check if empty
 * @returns  bool
 */
export function isEmptyString(str) {
  return str === "" || str === null;
}

/**
 * Deletes Item from array at Index
 * @param {array} array
 * @param {number} index of item to be deleted
 * @returns array with item removed
 */
export function deleteItemFromIndex(array, index) {
  var tempArray = array;
  if (index > -1) {
    tempArray.splice(index, 1);
  }
  return tempArray;
}

/**
 *  Swaps from higherIndex to lowerIndex
 * @param {array} array - to be swapped
 * @param {number} index - of item to be swapped
 * @returns
 */
export function swapWithPrevious(array, index) {
  var tempArray = array;
  if (index > 0) {
    var temp = tempArray[index];
    tempArray[index] = tempArray[index - 1];
    tempArray[index - 1] = temp;
  }
  return tempArray;
}

/**
 *  Swaps from lowerIndex to higherIndex
 * @param {array} array - to be swapped
 * @param {number} index - of item to be swapped
 * @returns
 */
export function swapWithNext(array, index) {
  var tempArray = array;

  //check if boundary exceeded
  if (index < array.length - 1) {
    var temp = tempArray[index];
    tempArray[index] = tempArray[index + 1];
    tempArray[index + 1] = temp;
  }
  return tempArray;
}

/**
 * Modifies uploaded Workshop schema to suit local use, by adding visibility element
 * @param {JSON} workshopObj
 * @param {boolean} isItemAllocated sets whether the default item should be true/false
 * @returns updated json with visibility element
 */
export function addVisibilityToWorkshop(workshopObjData, isItemAllocated) {
  //TODO - Change this
  var workshopObj = { ...workshopObjData };
  var updatedNodeList = [];

  workshopObj.nodes.forEach((node, nodeIndex) => {
    var nodeName = node.nodeName;
    var updatedSubnodeList = [];

    node.subnodes.forEach((subnode, subnodeIndex) => {
      var subnodeName = subnode.subnodeName;
      var updatedItemList = []; //adds to the item list of a subnode

      subnode.items.forEach((item, itemIndex) => {
        updatedItemList.push(addVisibilityElement(item, isItemAllocated));
      });

      const updatedSubnode = {
        subnodeName: subnodeName,
        items: updatedItemList,
      };
      updatedSubnodeList.push(updatedSubnode);
    });

    const updatedNode = {
      nodeName: nodeName,
      subnodes: updatedSubnodeList,
    };

    updatedNodeList.push(updatedNode);
  });

  workshopObj.nodes = updatedNodeList;
  console.log("Data after being transformed: ", workshopObj);
  return workshopObj;
}

//TODO - Refactor this thing erghjhh - Whos calling this
/**
 * Adds visiblity to an object
 * @param {json} hazard Obj
 * @returns item obj with all elements with visibility parameter
 */
export function addVisibilityElement(obj, isItemAllocated) {
  var jsonData = { ...obj };

  var detail1 = [...jsonData.detail1];
  var detail2 = [...jsonData.detail2];
  var detail3 = [...jsonData.detail3];
  var detail4 = [...jsonData.detail4];

  jsonData["itemAllocated"] = isItemAllocated;

  var updatedDetail1List = [];
  detail1.forEach((detail) => {
    var tempObj = { name: detail, visible: false };
    updatedDetail1List.push(tempObj);
  });
  jsonData.detail1 = updatedDetail1List;

  var updatedDetail2List = [];
  detail2.forEach((detail) => {
    var tempObj = { name: detail, visible: false };
    updatedDetail2List.push(tempObj);
  });
  jsonData.detail2 = updatedDetail2List;

  var updatedDetail3List = [];
  detail3.forEach((detail) => {
    var tempObj = { name: detail, visible: false };
    updatedDetail3List.push(tempObj);
  });
  jsonData.detail3 = updatedDetail3List;

  var updatedDetail4List = [];
  detail4.forEach((detail) => {
    var tempObj = { name: detail, visible: false };
    updatedDetail4List.push(tempObj);
  });

  jsonData.mitigatingSafeguards = updatedDetail4List;
  console.log("Updated visible element: ", jsonData);
  return jsonData;
}

/**
 *  Takes in a name and returns an object with visible element
 * @param {String} name name of field
 * @param {boolean} defaultVisibility default state of object visibility
 * @returns obj with visible parameter expressed
 */
export function addVisibilityToField(name, defaultVisibility) {
  var obj = { name: name, visible: defaultVisibility };
  return obj;
}

//Not used for now
/**
 * Check if the filetype is an excel
 * @param {object} file
 * @returns
 */
export function checkFileTypeExcel(file) {
  let errorMessage = "";
  if (!file || !file[0]) {
    return;
  }
  const isExcel =
    file[0].type === "application/vnd.ms-excel" ||
    file[0].type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isExcel) {
    errorMessage = "You can only upload an excel file";
  }
  console.log("file", file[0].type);
  const isLt2m = file[0].size / 1024 / 1024 < 2;
  if (!isLt2m) {
    errorMessage = "File must be smaller than 2MB!";
  }
  console.log("errorMessage", errorMessage);
  return errorMessage;
}

/**
 * Checks if the jsonObject is in the correct format
 * @param {object} jsonObj to be evaluated
 * @returns
 */
export function checkFileFormat(jsonObj) {
  return true;
}
