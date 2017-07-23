/**
 * Provides the data to be displayed by a Widget.
 */
class AbstractDataSource {
  constructor(config) {
    this._config = config;
  }

  /**
   * Returns the latest state of the data source.
   */
  getData() {
    throw new TypeError('Must override method');
  }

  /**
   * Updates the state of the data source.
   *
   * @private
   */
  _setData() {
    throw new TypeError('Must override method');
  }
}

module.exports = AbstractDataSource;
