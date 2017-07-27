const path = require('path');
const AbstractWidget = require(path.resolve(__dirname, 'abstract-widget.js'));
const contrib = require('blessed-contrib');

class Tasks extends AbstractWidget {
  constructor(dataSource) {
    super(contrib.table, {
      keys: false,
      interactive: false,
      label: '.tasks for today',
      width: '40%',
      height: '40%',
      border: { type: 'line', fg: 'cyan' },
      columnSpacing: 6, // in chars
      columnWidth: [45, 17], // in chars
    }, dataSource);
  }
}

module.exports = Tasks;
