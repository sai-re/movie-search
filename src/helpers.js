/**
* @function truncateString cuts off string after provided value
* @param {string} str
* @param {number} num
* @returns {string} string
*/
export function truncateString(str, num) {
    //if description smaller than cut off, return string
    if (str.length <= num) {
        return str
    }

    return str.slice(0, num) + '...'
}