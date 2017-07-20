function HttpException(status, statusText) {
  this.status = status;
  this.statusText = statusText;
}

module.exports = HttpException;
