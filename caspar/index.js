const username = localStorage.getItem("username") || "caspar621";
const apiKey = localStorage.getItem("key") || "W8r6nDU97jXJfdhEfkxNpdjT"; // Not an actual API key lol
let display = "";
var pageNo = 1;
var lastId = 0;
currenttag = "";
var checkBox = document.getElementById("sfw");
var loginopen = false;
var mainsearch = document.getElementById("tagz")
var blacklist = localStorage.getItem("bblacklist") || "+-scat+-feces+-urine+-watersports";
var nextURL = '';
document.getElementById("blackinput").value = blacklist;
console.log(blacklist);

function parseURL(url) {
    // Create a URL object to easily extract query parameters
    const parsedURL = new URL(url);
    
    // Extract the values of 'search' and 'nsfw' parameters
    const searchQuery = parsedURL.searchParams.get('search');
    const nsfwQuery = parsedURL.searchParams.get('nsfw');
    
    // Decode URL-encoded strings (including '+' to spaces)
    const decodedSearchQuery = searchQuery ? decodeURIComponent(searchQuery.replace(/\+/g, ' ')) : null;
    const decodedNsfwQuery = nsfwQuery ? decodeURIComponent(nsfwQuery.replace(/\+/g, ' ')) : null;
    // Create an object to store the results
    const result = {
        search: decodedSearchQuery,
        nsfw: decodedNsfwQuery
    };
    
    return result;
}

// Example usage:
const url = window.location.href;
const parsedResult = parseURL(url);
console.log(parsedResult);  // { search: 'example Query', nsfw: 'true' }

if (parsedResult) {
    if (parsedResult.nsfw == "yes") {
        if (username == "caspar621") {
            console.log('URL is NSFW. User is SFW.');
            alert("The URL you clicked on has a search query that is NSFW. You do not have access to this as a visitor. Please log in to your e621 to view the NSFW or continue to view SFW.");
            load(0,parsedResult.search)
            document.getElementById("tagz").value = parsedResult.search;
        } else {
            console.log('URL is NSFW. User is NSFW.');
            load(0,parsedResult.search)
            document.getElementById("tagz").value = parsedResult.search;
        }
    }
    if (parsedResult.nsfw == "no") {
        console.log('URL is SFW.');
        const sfws = parsedResult.search + " rating:s"
        load(0,sfws)
        document.getElementById("tagz").value = parsedResult.search;
    }
    } else {
        console.log('url empty')
    }

mainsearch.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("s").click();
    }
});

if (username == "caspar621") {
    document.getElementById("perks").innerHTML = "If you want access to favorites, NSFW, <br> and post interactions, sign in below.";
    document.getElementById("nsfw").style.display = "none";
    document.getElementById("safet").innerHTML = "Default Presets";
    document.getElementById("userid").innerHTML = "Logged out";
} else {
    document.getElementById("userid").innerHTML = "Logged into " + username;
    document.getElementById("perks").innerHTML = "You are successfully using <br> your own account!";
}

function openlogin() {
    if (loginopen) {
        document.getElementById("loginc").style.display = "none";
        document.getElementById("login").style.display = "none";
        loginopen = false;
    } else {
        document.getElementById("loginc").style.display = "flex";
        document.getElementById("login").style.display = "block";
        document.getElementById("intro").style.display = "none";

        loginopen = true;
    }
}

function openblack() {
    if (loginopen) {
        document.getElementById("loginc").style.display = "none";
        document.getElementById("blacklist").style.display = "none";
        loginopen = false;
    } else {
        document.getElementById("loginc").style.display = "flex";
        document.getElementById("blacklist").style.display = "block";
        document.getElementById("intro").style.display = "none";

        loginopen = true;
    }
}

document.getElementById("save").addEventListener("click", () => {
    var newblack = document.getElementById("blackinput").value;
    console.log(newblack)
    localStorage.setItem("blacklist", newblack);
    location.reload();
});

document.getElementById("loginbutton").addEventListener("click", () => {
    var newkey = document.getElementById("apikey").value;
    console.log(newkey)
    localStorage.setItem("key", newkey);
    var newuser = document.getElementById("user").value;
    console.log(newuser)
    localStorage.setItem("username", newuser);
    location.reload();
});

function favorites() {
    load(1,'fav:' + username)
}

document.getElementById("reset").addEventListener("click", () => {
    localStorage.setItem("key", "");
    localStorage.setItem("username", "");
    location.reload();
});

document.getElementById("close").addEventListener("click", () => {
    document.getElementById("loginc").style.display = "none";
    document.getElementById("login").style.display = "none";
    loginopen = false;
});

document.getElementById("b").addEventListener("click", () => {
    pageNo += 1;
    load(pageNo, "");
});

document.getElementById("s").addEventListener("click", () => {
    display = "";
    pageNo = 1
    load(pageNo, "");
});

document.getElementById("n").addEventListener("click", () => {
    
    pageNo += 1;
    display = "";
    console.log("Current tags are: " + currenttag);
    load(pageNo, currenttag);
});

document.getElementById("p").addEventListener("click", () => {
    pageNo -= 1;
    display = "";
    console.log("Current tags are: " + currenttag);
    load(pageNo, currenttag);
});

document.getElementById("u").addEventListener("click", () => {
    display = "";
    pageNo = 1;
    document.getElementById("display").innerHTML = "";
    document.getElementById("intro").style.display = "block";
    document.getElementById("intro").innerHTML = "No posts to display.";
    document.getElementById("pagenumber").innerHTML = 0;
});

/* function stop() {
    currenttag = 'rating:s+order:score';
    console.log(currenttag);
    load(0,currenttag)
} */

function openup(curl) {
    console.log("https://caspar621.com" + curl);
    //window.open("https://caspar621.com" + curl, '_blank').focus();
    window.open(curl, '_blank').focus();
    //window.location.href = "https://caspar621.com" + curl;
}

async function load(page, tag) {
    if (tag != '') {
        document.getElementById('tagz').value = '';
    }
    if (window.location.href.includes("localhost")) {
        if (username == 'caspar621') {
            var nextURL = 'http://localhost:5173/caspar/?search=' + document.getElementById('tagz').value.replace(/ /g, '+') + "&nsfw=no";
        } else {
            var nextURL = 'http://localhost:5173/caspar/?search=' + document.getElementById('tagz').value.replace(/ /g, '+') + "&nsfw=yes";
        }
    } else {
        if (username == 'caspar621') {
            var nextURL = 'https://caspar621.com/caspar/?search=' + document.getElementById('tagz').value.replace(/ /g, '+') + "&nsfw=no";
        } else {
            var nextURL = 'https://caspar621.com/caspar/?search=' + document.getElementById('tagz').value.replace(/ /g, '+') + "&nsfw=yes";
        }
    }
    const nextTitle = tag + " | Caspar621";
    const nextState = { additionalInformation: 'Updated the URL with JS' };

    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);

    // This will replace the current entry in the browser's history, without reloading
    window.history.replaceState(nextState, nextTitle, nextURL);

    document.getElementById("intro").style.display = "block";
    document.getElementById("intro").innerHTML = "Loading Posts...";
    document.getElementById("pagenumber").innerHTML = page;
    let response = "";
    currenttag = tag;
    console.log("Currenttag before loading: " + currenttag);
    console.log("Page before loading: " + page);
    goTo = pageNo.toString();
    let getTags = document.getElementById('tagz').value.replace(/ /g, '+') | "";
    if (username == "caspar621"){
        response = await fetch("https://e621.net/posts.json?page=" + goTo + "&tags=rating:s+" + document.getElementById('tagz').value.replace(/ /g, '+').replace("y$", '_yesteryears_ago').replace("%p", ' ~type:png ~type:jpg') + tag + blacklist, {
        headers: { "Authorization": "Basic " + btoa(`${username}:${apiKey}`) }
        });
    } else {
        /* response = await fetch("https://e621.net/posts.json?page=" + goTo + "&tags=~type:jpg+~type:png+" + document.getElementById('tagz').value.replace(/ /g, '+') + tag, {
        headers: { "Authorization": "Basic " + btoa(`${username}:${apiKey}`) }
        }); */

        response = await fetch("https://e621.net/posts.json?page=" + goTo + "&tags=" + document.getElementById('tagz').value.replace(/ /g, '+').replace("y$", '_yesteryears_ago').replace("%p", ' ~type:png ~type:jpg') + tag + blacklist, {
        headers: { "Authorization": "Basic " + btoa(`${username}:${apiKey}`) }
        });
    }
    const final = await response.json();
    console.log(final);
    for (let i = 0; i < 20; i++) {
    final.posts.map(() => {
        document.getElementById("intro").style.display = "none";
        ipp = i
        let imgid = final.posts[ipp].id;
        let lastId = final.posts[19].id;
        console.log(lastId);
        // display += "<a href=" + toBeDisplayed + " target='_blank'><img class='lazyload' src='" + toBeDisplayed + "'/></a>"
        // display += "<a href='/imgload.html?id=" + imgid + "' target='_blank'><img class='lazyload' src='" + toBeDisplayed + "'/></a>"
        // display += "<a onclick='openup(`imgload.html?id=" + imgid + "`);' target='_blank'><img class='lazyload' src='" + toBeDisplayed + "'/></a>"
        
        if (final.posts[ipp].file.ext == "webm") {
            //let toBeDisplayed = final.posts[i++].file.url;
            //display += "<a onclick='localStorage.setItem(`lastid`," + imgid + ");openup(`/imgload.html`);' target='_blank'><video controls lazyload><source src=" + toBeDisplayed + " type='video/webm'></video></a>"
            let toBeDisplayed = final.posts[i++].sample.url;
            var downv = final.posts[ipp].score.down;
            var nonhyphen = downv.toString().split('-').join('');
            if (final.posts[ipp].tags.artist.includes('sound_warning') || final.posts[ipp].tags.meta.includes('sound')) {
                display += "<a onclick='localStorage.setItem(`lid`," + imgid + ");openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><div class='imgcon' style='border-color: #6b2c2c;'><img class='lazyload' src='" + toBeDisplayed + "'/><p><span style='color: #555;'>Animated | </span><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span><span style='color: #555;'> | Sound</span></p></div></a>"
            } else {
                display += "<a onclick='localStorage.setItem(`lid`," + imgid + ");openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><div class='imgcon' style='border-color: #6b2c2c;'><img class='lazyload' src='" + toBeDisplayed + "'/><p><span style='color: #555;'>Animated | </span><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span></p></div></a>"
            };
            
            //display += "<a onclick='openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><video controls lazyload><source src=" + toBeDisplayed + " type='video/webm'></video></a>"
        } else if (final.posts[ipp].file.ext == "gif") {
            var downv = final.posts[ipp].score.down;
            var nonhyphen = downv.toString().split('-').join('');
            let toBeDisplayed = final.posts[i++].sample.url;
            display += "<a onclick='localStorage.setItem(`lid`," + imgid + ");openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><div class='imgcon' style='border-color: #372c6b;'><img class='lazyload' src='" + toBeDisplayed + "'/><p><span style='color: #555;'>Animated | </span><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span></p></div></a>" 
        } else if (final.posts[ipp].file.ext == "swf") {
            var downv = final.posts[ipp].score.down;
            var nonhyphen = downv.toString().split('-').join('');
            let toBeDisplayed = final.posts[i++].sample.url;
            display += "<a onclick='localStorage.setItem(`lid`," + imgid + ");openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><div class='imgcon' style='border-color: #555;'><img class='lazyload' src='/img/flash.png'/><p><span style='color: #555;'>Flash | </span><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span></p></div></a>" 
        } else {
            var downv = final.posts[ipp].score.down;
            var nonhyphen = downv.toString().split('-').join('');
            let toBeDisplayed = final.posts[i++].sample.url;
            display += "<a onclick='localStorage.setItem(`lid`," + imgid + ");openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><div class='imgcon'><img class='lazyload' src='" + toBeDisplayed + "'/><p><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span></p></div></a>"

            //display += "<a onclick='openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><img class='lazyload' src='" + toBeDisplayed + "'/></a>"
        }
        
        // 75 e6 posts per page
        // 131 e6 being loaded for some damn reason

    });

    document.getElementById("display").innerHTML = display;
}};

