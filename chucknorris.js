module.exports = function (Doorman) {
    return {
        commands: [
            'chucknorris'
        ],
        chucknorris: {
            description: 'Gives a Random Chuck Norris Joke',
            process: (msg, suffix, isEdit, cb) => {
              request('http://api.icndb.com/jokes/random',
                function (err, res, body) {
                  try {
                    if (err) throw err;
                    var data = JSON.parse(body);
                    if (data && data.value && data.value.joke) {
                      cb({
                        embed: {
                          color: Doorman.Config.discord.defaultEmbedColor,
                          title: 'Math Fact',
                          description: data.value.joke
                        }
                      }, msg);
                    }
                  } catch (err) {
                    var msgTxt = `command chucknorris failed :disappointed_relieved:`;
                    if (Doorman.Config.debug) {
                      msgTxt += `\n${err.stack}`;
                      
                      Doorman.logError(err);
                    }
                    cb(msgTxt, msg);
                  }
                });
            }
        }
    }
}
