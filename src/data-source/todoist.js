const path = require('path');
const request = require('request');
const NodeCache = require('node-cache');
const AbstractDataSource = require(path.resolve(__dirname, 'abstract-data-source.js'));

/**
 * Todoist widget, todoist is a task organization service.
 */
class Todoist extends AbstractDataSource {
  constructor(config) {
    super(config);

    this._cacheKey = 'todoist';
    this._cache = new NodeCache({ stdTTL: this._config.todoist.cache_in_seconds, checkperiod: 120 });

    this._headers = ['Description', 'Labels'];
    this._setData([['Awaiting data...', '']]);
  }

  /**
   * Gets the Todoist data from either cache or the API.
   *
   */
  getData() {
    const todoistData = this._cache.get(this._cacheKey);

    if (todoistData === undefined) {
      const formData = {
        token: this._config.todoist.api_token,
        sync_token: '*',
        resource_types: '["items", "labels", "projects"]',
      };

      request
        .post({ url: 'https://todoist.com/API/v7/sync', formData }, (err, httpResponse, body) => {
          if (err) {
            this._setData([['ERROR!', '']]);

            return;
          }

          if (httpResponse.statusCode === 200) {
            this._cache.set(this._cacheKey, JSON.parse(body));
          }
        });
    } else {
      const items = this._parseTodoistData(todoistData);
      this._setData(items);
    }

    return this._data;
  }

  /**
   * Arranges the Todoist data in items to be displayed.
   *
   * @param data
   * @returns {Array|*}
   * @private
   */
  _parseTodoistData(data) {
    const labels = new Map();
    data.labels.forEach(label => labels.set(label.id, label.name));

    const projects = new Map();
    data.projects.forEach(project => projects.set(project.id, project.name));

    let items = data.items
      .filter(item => Todoist._isTodayOrPastdue(item.due_date_utc))
      .map(item =>
        [
          `◘ ${projects.get(item.project_id)}: ${item.content}`,
          item.labels.sort().reduce((allLabels, labelId) => `${allLabels} ${labels.get(labelId)}`, ''),
        ]
      );

    if (items.length === 0) {
      items = [['No more items for today!', '']];
    }

    return items;
  }

  /**
   * Indicates if the due date is today or its past due.
   *
   * @param dueDateUtc
   * @returns {boolean}
   * @private
   */
  static _isTodayOrPastdue(dueDateUtc) {
    return Date.parse(dueDateUtc) <= (new Date()).setHours(23, 59, 59, 999);
  }

  /**
   * Updates the data to be displayed by the widget.
   *
   * @param items
   * @private
   */
  _setData(items) {
    this._data = {
      headers: this._headers,
      data: items,
    };
  }
}

module.exports = Todoist;
