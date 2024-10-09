"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDTOToSearchQuery = convertDTOToSearchQuery;
exports.transformToArray = transformToArray;
exports.transformToBoolean = transformToBoolean;
exports.transformToNumber = transformToNumber;
const ARRAY_SEPARATOR = ',';
function convertDTOToSearchQuery(dto) {
    const query = [];
    for (const _key in dto) {
        const typecast = _key;
        if (!dto[typecast])
            continue;
        let converted;
        if (Array.isArray(dto[typecast]))
            converted = dto[typecast].join(ARRAY_SEPARATOR);
        else
            converted = String(dto[typecast]);
        query.push(`${String(_key)}=${converted}`);
    }
    if (query.length === 0)
        return '';
    return '?' + query.join('&');
}
function transformToArray({ value }) {
    return value.split(ARRAY_SEPARATOR);
}
function transformToBoolean({ value }) {
    value = value.trim();
    return value === '1' || value === 'true';
}
function transformToNumber({ value }) {
    return +value.trim();
}
//# sourceMappingURL=query.js.map