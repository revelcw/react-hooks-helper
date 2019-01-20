export const getChildData = (obj, key) => obj[key];

// Limited to only JSON supported types.
export const cloneDeepLimited = obj => JSON.parse(JSON.stringify(obj));
