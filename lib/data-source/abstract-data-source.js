
class AbstractDataSource {
  constructor(config) {
    this._config = config;
  }

  getData() {
    throw new TypeError('Must override method');
  }

  _setData() {
    throw new TypeError('Must override method');
  }
}

module.exports = AbstractDataSource;
