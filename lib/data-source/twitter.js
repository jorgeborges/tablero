const path = require('path');
const AbstractDataSource = require(path.resolve(__dirname, 'abstract-data-source.js'));
const Twit = require('twit');

class Twitter extends AbstractDataSource {
  constructor(config) {
    super(config);

    this.twitter = new Twit({
      consumer_key: config.quote.twitter.consumer_key,
      consumer_secret: config.quote.twitter.consumer_secret,
      access_token: config.quote.twitter.access_token,
      access_token_secret: config.quote.twitter.access_token_secret,
      timeout_ms: 60 * 1000,
    });

    this.twitter.get(
      'statuses/user_timeline',
      { screen_name: 'CodeWisdom', exclude_replies: true, count: 10, include_rts: false },
      (err, data, response) => this._data = data.map(tweet => tweet.text)
    );

    this._setData(['Retrieving some wisdom...']);
  }

  getData() {
    return this._data[0];
  }

  _setData(content) {
    this._data = content;
  }
}

module.exports = Twitter;
