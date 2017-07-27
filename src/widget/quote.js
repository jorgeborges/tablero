const path = require('path');
const AbstractWidget = require(path.resolve(__dirname, 'abstract-widget.js'));
const blessed = require('blessed');

class Quote extends AbstractWidget {
  constructor(dataSource) {
    super(blessed.box, {
      label: '.quote',
      align: 'left',
      valign: 'center',
      padding: { top: 2, right: 2, bottom: 2, left: 2 }
    }, dataSource);
  }
}

module.exports = Quote;
