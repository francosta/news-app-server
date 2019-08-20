const fetch = require("node-fetch");
const apiKey = process.env.NEWS_API_KEY;

const getHeadlines = () => {
  return fetch(
    `https://newsapi.org/v2/top-headlines?country=pt&apiKey=${apiKey}`
  )
    .then(resp => resp.json())
    .then(resp => console.log(resp));
};

getHeadlines();
