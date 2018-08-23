const overwatch = require('overwatch-api');

const platform = 'pc';
const region = 'eu';

//const tag = 'Ghoul-2550';
overwatch.getProfile(platform, region, message, (err, json) => {
  if (err) console.error(err);
  else console.log(json);
});
