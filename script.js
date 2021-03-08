const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let $;
let baseUrl = "https://github.com";

function linkGenerator(error, response, body){

    if(!error && response.statusCode == 200){
        $ = cheerio.load(body);
        let allTopics = $(".no-underline.d-flex.flex-column.flex-justify-center");
        let allTopicNames = $(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
        console.log(allTopics.length);
        for(let a = 0; a < allTopics.length; a++){
            var url = $(allTopics[a]).attr("href");
            var name = $(allTopicNames[a]).text().trim();
            getTopicPage(name, "https://github.com/"+url);
        }
    }
}

function getTopicPage(name, url){
    request(url, (error, response, body) => {

        if(!error && response.statusCode == 200){
        let data = [];

        $ = cheerio.load(body);
        let repos = $(".f3.color-text-secondary.text-normal.lh-condensed>.text-bold");

        if(repos.length > 8){
            repos = repos.slice(0,8);
        }

        for(let a = 0; a < repos.length; a++){
            var u = baseUrl + $(repos[a]).attr("href");
            var n = $(repos[a]).text().trim();
            data.push({"name" : n, "link" : u, "issues" : []});
        }
        getIssuesForRepo(name+"_projects.json", data);
    }    
    });
}

function getIssuesForRepo(fileName, data){

    for(let d in data){
        console.log("Scrapping...  "+data[d].link+"/issues");
        request(data[d].link+"/issues", (error, response, body) => {
            if(!error && response.statusCode == 200){
                $ = cheerio.load(body);
                let issues = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open");
                
                for(let a = 0; a < issues.length; a++){
                    var u = baseUrl + $(issues[a]).attr("href");
                    var n = $(issues[a]).text().trim();
                    data[d].issues.push({"name" : n, "link" : u})
                }  
                
                fs.writeFileSync(fileName, JSON.stringify(data))
            }
        });
    }
}


request(baseUrl+"/topics", linkGenerator);