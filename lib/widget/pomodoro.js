const path = require('path');
const AbstractWidget = require(path.resolve(__dirname, 'abstract-widget.js'));
const contrib = require('blessed-contrib');

class Pomodoro extends AbstractWidget {
  constructor(dataSource) {
    super(contrib.donut, {
      label: '.pomodoro',
      radius: 24,
      arcWidth: 6,
      remainColor: 'black',
      yPadding: 2,
      data: [
        { percent: 0, label: 'work!', color: 'red' }
      ]
    }, dataSource);
  }
}

module.exports = Pomodoro;
