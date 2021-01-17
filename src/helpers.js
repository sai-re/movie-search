/**
* @function truncateString cuts off string after provided value
* @param {string} str
* @param {number} num
* @returns {string} string
*/
export const truncateString = (str, num) => {
    //if description smaller than cut off, return string
    if (str.length <= num) {
        return str
    }

    return str.slice(0, num) + '...'
}

/**
* @function sortRatings sorts ratings options
* @param {array} rating
* @returns {array} sorted array
*/
export const sortRatings = (ratings) => {
    const sortedRatings = [...ratings];

    return sortedRatings.sort((a, b) => a.name - b.name);
}