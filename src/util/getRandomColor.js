module.exports = function () {
    const randomNum = Math.floor(Math.random() * 6); // 0~5
    var res = "red";
    switch (randomNum) {
        case 0:
            res = "red";
            break;
        case 1:
            res = "orange";
            break;
        case 2:
            res = "yellow";
            break;
        case 3:
            res = "green";
            break;
        case 4:
            res = "blue";
            break;
        case 5:
            res = "purple";
            break;
        default:
            res = "purple";
            break;
    }
    return res
};