const express = require('express');
const request = require('request');

const app = express();
const coolqlQuery = {
  query: `{
  arriendos: site(url : "https://www.yapo.cl/magallanes_antartica/arrendar?ca=14_s&l=0&w=1&cmn=&cmn=290&ret=2") {
    count: count(elem: ".listing_thumbs")
    avisos: selectAll(elem: "tr.listing_thumbs") {
      title : select(elem:".title") {
        text
        href
      }
      price : select(elem:".price") {
        text
      }
      image : select(elem:".image") {
        src
      }
    }
  }
}`,
};

// SERVER
app.get('/', (req, res) => {
  var options = {
    method: 'POST',
    url: 'https://coolql.cool/graphql',
    headers:
     {
       'cache-control': 'no-cache',
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
    body: coolqlQuery,
    json: true,
  };
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});

app.listen(8080, () => {
  console.log('Server Running on 8080!');
});
