const path = require('path');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const DataSourceFactory = require(path.resolve(__dirname, 'lib/data-source/data-source-factory.js'));
const Tasks = require(path.resolve(__dirname, 'lib/widget/tasks.js'));
const Cryptocurrency = require(path.resolve(__dirname, 'lib/widget/cryptocurrency.js'));

// Create Layout and place widget panels
const screen = blessed.screen();
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

// World Map
grid.set(0, 5, 3, 3, contrib.map, {label: '.picolog status'});

// Blockchain Assets
const crypto = new Cryptocurrency(DataSourceFactory.create('poloniex'));
const cryptoWidget = grid.set(3, 0, 3, 3, crypto.getWidgetType(), crypto.getWidgetOptions());

// Email
grid.set(3, 3, 1, 2, blessed.box, {label: '.email'});

// Calendar
grid.set(4, 3, 2, 2, blessed.box, {label: '.calendar'});

// Quote
grid.set(3, 5, 1, 3, blessed.box, {label: '.info'});

// Pomodoro
const pomodoro = grid.set(4, 5, 2, 2, contrib.donut, {
  label: '.pomodoro',
  radius: 24,
  arcWidth: 6,
  remainColor: 'black',
  yPadding: 2,
  data: [
    {percent: 0, label: 'work!', color: 'red'}
  ]
});

let pct = 0.00;

function updateDonut(){
  if (pct > 0.99) pct = 0.00;
  let color = "green";
  if (pct >= 0.25) color = "cyan";
  if (pct >= 0.5) color = "yellow";
  if (pct >= 0.75) color = "red";
  pomodoro.setData([
    {percent: parseFloat((pct+0.00) % 1).toFixed(2), label: 'work!', 'color': color}
  ]);
  pct += 0.01;
}

// Time For
grid.set(4, 7, 2, 1, blessed.box, {label: '.time_for'});

// refresh dashboard
setInterval(() => {
  tasksWidget.setData(tasks.tick());
  cryptoWidget.setData(crypto.tick());
  updateDonut();
  screen.render();
}, 1000);

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.render();
