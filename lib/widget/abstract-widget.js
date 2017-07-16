const path = require('path');
const AbstractDataSource = require(path.resolve(__dirname, '../data-source/abstract-data-source.js'));

/**
 * An abstract widget, exposes the interface for a widget.
 */
class AbstractWidget {

  /**
   *
   * @param widgetType
   * @param widgetOptions
   * @param {AbstractDataSource} dataSource
   */
  constructor(widgetType, widgetOptions, dataSource) {
    this._widgetType = widgetType;
    this._widgetOptions = widgetOptions;

    if (dataSource instanceof AbstractDataSource === false) {
      throw new TypeError('dataSource object must be an instance of AbstractDataSource');
    }

    this._dataSource = dataSource;
  }

  getWidgetType() {
    return this._widgetType;
  }

  getWidgetOptions() {
    return this._widgetOptions;
  }

  /**
   * Triggers an update for the widget displayed data.
   *
   * @returns {*}
   */
  tick() {
    return this._dataSource.getData();
  }
}

module.exports = AbstractWidget;
