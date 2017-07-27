const path = require('path');
const AbstractDataSource = require(path.resolve(__dirname, 'abstract-data-source.js'));

class PomodoroTimer extends AbstractDataSource {
  constructor(config) {
    super(config);

    this.pct = 0.00;
  }

  getData() {
    this.updateDonut();
    return this._data;
  }

  _setData(content) {
    this._data = content;
  }

  updateDonut() {
    if (this.pct === 1) this.pct = 0.00;
    let color = "green";
    if (this.pct >= 0.25) color = "cyan";
    if (this.pct >= 0.5) color = "yellow";
    if (this.pct >= 0.75) color = "red";
    this._setData([
      {percent: parseFloat((this.pct + 0.00) % 1).toFixed(2), label: 'work!', color }
    ]);
    this.pct += 0.01;
  }
}

module.exports = PomodoroTimer;
