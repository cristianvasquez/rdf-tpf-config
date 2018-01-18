var _ = require('lodash');
var fs = require('fs-extra')

let availability = JSON.parse(fs.readFileSync('available.json'));
let config = JSON.parse(fs.readFileSync('config-example.json'));

function getConfigEntry(entry){
    return entry.datasets.map( x => {
        return {
            title: x.label,type: "SparqlDatasource",
            description:x.label,
            settings:{
                endpoint:entry.uri,
                defaultGraph:x.uri
            }
        }
    });
};
config['datasources']=_.flatMap(_.filter(availability,x=>x.upNow).map(x=>x.endpoint),x=>getConfigEntry(x));
fs.outputFile('config.json',JSON.stringify(config,null,2));