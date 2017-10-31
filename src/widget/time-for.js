const path = require('path');
const AbstractWidget = require(path.resolve(__dirname, 'abstract-widget.js'));
const blessed = require('blessed');

class TimeFor extends AbstractWidget {
  constructor(dataSource) {
    super(blessed.box, {
      label: '.time_for',
      align: 'center',
      valign: 'center',
      padding: { top: 2 },
      content: '> LOADING',
    }, dataSource);
  }
}

module.exports = TimeFor;
