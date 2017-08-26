const path = require('path');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const DataSourceFactory = require(path.resolve(__dirname, 'data-source/data-source-factory.js'));
const Tasks = require(path.resolve(__dirname, 'widget/tasks.js'));
const Cryptocurrency = require(path.resolve(__dirname, 'widget/cryptocurrency.js'));
const Quote = require(path.resolve(__dirname, 'widget/quote.js'));
const Pomodoro = require(path.resolve(__dirname, 'widget/pomodoro.js'));
const TimeFor = require(path.resolve(__dirname, 'widget/time-for.js'));

// Create Layout and place widget panels
const screen = blessed.screen({
  smartCSR: true
});
const grid = new contrib.grid({ rows: 6, cols: 8, screen });

// Tasks
const tasks = new Tasks(DataSourceFactory.create('todoist'));
const tasksWidget = grid.set(0, 0, 3, 3, tasks.getWidgetType(), tasks.getWidgetOptions());

// THE ICONIC GA Real Time
grid.set(0, 3, 1, 1, blessed.box, {label: '.the iconic status'});

// Github
grid.set(0, 4, 1, 1, blessed.box, {label: '.github'});

// Alarms
grid.set(1, 3, 2, 2, blessed.box, {label: '.alarms'});

// Picolog
grid.set(0, 5, 3, 3, contrib.map, {label: '.picolog status'});

// Blockchain Assets
const crypto = new Cryptocurrency(DataSourceFactory.create('poloniex'));
const cryptoWidget = grid.set(3, 0, 3, 3, crypto.getWidgetType(), crypto.getWidgetOptions());

// Email
grid.set(3, 3, 1, 2, blessed.box, {label: '.email'});

// Calendar
grid.set(4, 3, 2, 2, blessed.box, {label: '.calendar'});

// Quote
const quote = new Quote(DataSourceFactory.create('twitter'));
const quoteWidget = grid.set(3, 5, 1, 3, quote.getWidgetType(), quote.getWidgetOptions());

// Pomodoro
const pomodoro = new Pomodoro(DataSourceFactory.create('pomodoro-timer'));
const pomodoroWidget = grid.set(4, 5, 2, 2, pomodoro.getWidgetType(), pomodoro.getWidgetOptions());

// Time For
const timeFor = new TimeFor(DataSourceFactory.create('schedule'));
const timeForWidget = grid.set(4, 7, 1, 1, timeFor.getWidgetType(), timeFor.getWidgetOptions());

// Mode
const modeWidget = grid.set(5, 7, 1, 1, blessed.box, {label: '.mode', align: 'center',
  valign: 'center',
  padding: {top: 5},
  content: '[Mode]'});

// refresh dashboard
setInterval(() => {
  tasksWidget.setData(tasks.tick());
  cryptoWidget.setData(crypto.tick());
  quoteWidget.setText(quote.tick());
  pomodoroWidget.setData(pomodoro.tick());
  timeForWidget.setText(timeFor.tick());
  screen.render();
}, 1000);

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.render();
