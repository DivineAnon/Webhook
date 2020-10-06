var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
   hosts: [ 'http://elastic:insw2020@10.8.3.49:9200']
});

client.ping({
    requestTimeout: 30000,
}, function(error) {
    if (error) {
        console.error('Elasticsearch cluster is down!');
    } else {
        console.log('Elasticsearch Connected!');
    }
});

module.exports = client;