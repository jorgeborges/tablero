const path = require('path');
const AbstractWidget = require(path.resolve(__dirname, 'abstract-widget.js'));
const contrib = require('blessed-contrib');

class Cryptocurrency extends AbstractWidget {
  constructor(dataSource) {
    super(contrib.table, {
      keys: false,
      interactive: false,
      fg: 'gray90',
      label: '.crypto-currencies',
      width: '40%',
      height: '40%',
      border: { type: 'line', fg: 'cyan' },
      columnSpacing: 6, // in chars
      columnWidth: [5, 15, 6], // in chars
    }, dataSource);
  }
}

module.exports = Cryptocurrency;
