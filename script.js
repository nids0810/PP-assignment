
var mainDiv = document.getElementById("main-feed");

// Module one output
var moduleOneOutput = ["Obama visited Facebook headquarters: http://bit.ly/xyz @elversatile",
                        "Paypal celebrate #SmallBusinessMonth by giving the gift of opportunity. http://bit.ly/2vuMfiT @PayPal",
                        "Paypal released Global Impact Report today. http://bit.ly/2IQBIrk @PayPal"];

// Module two function
function moduleTwoFunction(crawlFeed) {
    var feedArr = crawlFeed.split(" ");
    var feedObjectArr = [];
    for(var item of feedArr) {
        if(item === "") { // //check if there is any extra empty spaces
            //do nothing
        } else if (item.includes('http://') || item.includes('https://')) { //check if item is a link
            feedObjectArr.push( {type:"link", data:item} ); 
        } else if(item.includes('@')) { //check if item is a twitter username
            feedObjectArr.push( {type:"username", data:item.slice(1)} ); 
        } else if(item[0] === item[0].toUpperCase() && item[0].match(/[^a-zA-Z0-9]/g) === null) { //check if item is an entity
            feedObjectArr.push( {type:"entity", data:item} );
        } else {
            feedObjectArr.push( {type:"general", data:item} );
        }
    }
    return feedObjectArr;
}

// Module two output
var moduleTwoOutput = moduleOneOutput.map(moduleTwoFunction);

// Module three function
function moduleThreeFunction(objectArr) {
    var objectDiv = document.createElement('div');
    objectDiv.setAttribute("class", "feed-object");
    for(var obj of objectArr) {
        if(obj.type === "link") { // create a link anchor element
            var a = document.createElement('a');
            a.setAttribute("href", obj.data);
            a.textContent = obj.data;
            objectDiv.innerHTML += " ";
            objectDiv.appendChild(a);
        } else if(obj.type === "username") { // create a username anchor element
            var a = document.createElement('a');
            a.setAttribute("href", "http://twitter.com/" + obj.data);
            a.textContent = obj.data;
            a.setAttribute("class", "user-name")
            objectDiv.innerHTML += " @ "; 
            objectDiv.appendChild(a);
        } else if(obj.type === "entity") { // create an entity strong element
            var strong = document.createElement('strong');
            strong.textContent = obj.data;
            objectDiv.innerHTML += " ";
            objectDiv.appendChild(strong);
        } else {
            objectDiv.innerHTML += " " + obj.data;
        }
    }
    mainDiv.appendChild(objectDiv);
}
// Module three output
moduleTwoOutput.map(moduleThreeFunction);