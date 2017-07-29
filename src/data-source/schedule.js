const path = require('path');
const AbstractDataSource = require(path.resolve(__dirname, 'abstract-data-source.js'));

class Schedule extends AbstractDataSource {
  constructor(config) {
    super(config);

    this._schedule = this._initSchedule(config.time_for.schedule);
  }

  getData() {
    this._updateTimeFor();
    return this._data;
  }

  _setData(data) {
    let msg = 'Bed Time...';
    if (data !== undefined) {
      msg = data.activity;
    }

    this._data = msg;
  }

  _updateTimeFor() {
    const currentDate = new Date();
    const currentSchedule = this._schedule.find(
      scheduleData => currentDate >= scheduleData.start_time && currentDate < scheduleData.end_time
    );
    this._setData(currentSchedule);
  }

  /**
   * Creates and array of objects schedules in order to make comparison with current Date easier.
   *
   * @param {Array} schedule
   * @private
   */
  _initSchedule(schedule) {
    return schedule.map(scheduleData => ({
      start_time: (new Date()).setHours(scheduleData[0], scheduleData[1]),
      end_time: (new Date()).setHours(scheduleData[2], scheduleData[3]),
      time_of_the_day: scheduleData[4],
      activity: scheduleData[5]
    }));
  }
}

module.exports = Schedule;
