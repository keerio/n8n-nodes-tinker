"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterValidProperties = exports.flattenObject = void 0;
function flattenObject(obj, prefix = "") {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            Object.assign(result, flattenObject(obj[key], `${prefix}${key}.`));
        }
        else {
            result[`${prefix}${key}`] = obj[key];
        }
    }
    return result;
}
exports.flattenObject = flattenObject;
function filterValidProperties(obj) {
    const result = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
            const lastPartOfKey = key.substring(key.lastIndexOf(".") + 1);
            result[lastPartOfKey] = obj[key];
        }
    }
    console.log("Catch binary value", result);
    if (result.image_data_url !== null &&
        result.image_data_url !== undefined &&
        result.image_data_url !== "") {
        console.log("data exists");
    }
    else {
        console.log("data not exist");
    }
    return result;
}
exports.filterValidProperties = filterValidProperties;
//# sourceMappingURL=GenericFunctions.js.map