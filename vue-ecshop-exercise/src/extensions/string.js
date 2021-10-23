String.prototype.toTimestamp = function () {
    return Math.floor(new Date(this) / 1000);
}