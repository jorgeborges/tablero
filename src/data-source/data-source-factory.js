const path = require('path');
const yamlConfig = require('node-yaml-config');
const Todoist = require(path.resolve(__dirname, 'todoist.js'));
const Poloniex = require(path.resolve(__dirname, 'poloniex.js'));
const Twitter = require(path.resolve(__dirname, 'twitter.js'));
const PomodoroTimer = require(path.resolve(__dirname, 'pomodoro-timer.js'));

class DataSourceFactory {

  /**
   *
   * @param {string} dataSourceName
   */
  static create(dataSourceName) {
    let dataSource;

    const config = yamlConfig.load(path.resolve(__dirname, '../../config/config.yaml'));

    switch (dataSourceName) {
      case 'todoist':
        dataSource = new Todoist(config);
        break;
      case 'poloniex':
        dataSource = new Poloniex(config);
        break;
      case 'twitter':
        dataSource = new Twitter(config);
        break;
      case 'pomodoro-timer':
        dataSource = new PomodoroTimer(config);
        break;
      default:
        throw new TypeError('Invalid Data Source name');
    }

    return dataSource;
  }
}

module.exports = DataSourceFactory;
