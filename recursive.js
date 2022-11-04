const exampleObject = {
  FIRST: {
    SECOND: "result_second_level",
    SECOND_PLUS: "result_second_level_plus",
    SECOND_FORWARD: {
      THIRD: "result_third_level",
    },
  },
};

const flattenInternalTranslation = (currentNode, target, flattenedKey) => {
  for (var key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      var newKey;
      if (flattenedKey === undefined) {
        newKey = key;
      } else {
        newKey = flattenedKey + "." + key;
      }

      var value = currentNode[key];
      if (typeof value === "object") {
        flattenInternalTranslation(value, target, newKey);
      } else {
        target[newKey] = value;
      }
    }
  }
};

const flatten = (obj) => {
  var flattenedObject = {};
  flattenInternalTranslation(obj, flattenedObject);
  return flattenedObject;
};

const flattened = flatten(exampleObject);

console.log(flattened);

// EXPECTED OUTPUT //
// {
//     FIRST.SECOND: 'result_second_level',
//     FIRST.SECOND_PLUS: 'result_second_level_plus',
//     FIRST.SECOND_FORWARD.THIRD : 'result_third_level'
// }
