
const username = localStorage.getItem("username") || "caspar621";
const apiKey = localStorage.getItem("key") || "W8r6nDU97jXJfdhEfkxNpdjT"; // Not an actual API key lol
let display = "";
var pageNo = 1;
var lastId = 0;
currenttag = "";
var checkBox = document.getElementById("sfw");
var loginopen = false;
var mainsearch = document.getElementById("tagz")

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
    document.getElementById("display").innerHTML = "";
    document.getElementById("intro").style.display = "block";
    document.getElementById("intro").innerHTML = "No posts to display.";
});

/* function stop() {
    currenttag = 'rating:s+order:score';
    console.log(currenttag);
    load(0,currenttag)
} */

function openup(curl) {
    window.open(curl, '_blank')
}

async function load(page, tag) {
    document.getElementById("intro").style.display = "block";
    document.getElementById("intro").innerHTML = "Loading Posts...";
    let response = "";
    currenttag = tag;
    console.log("Currenttag before loading: " + currenttag);
    console.log("Page before loading: " + page);
    goTo = pageNo.toString();
    let getTags = document.getElementById('tagz').value.replace(/ /g, '+') | "";
    if (username == "caspar621"){
        response = await fetch("https://e621.net/posts.json?page=" + goTo + "&tags=rating:s+" + document.getElementById('tagz').value.replace(/ /g, '+').replace("y$", '_yesteryears_ago').replace("%p", ' ~type:png ~type:jpg') + tag, {
        headers: { "Authorization": "Basic " + btoa(`${username}:${apiKey}`) }
        });
    } else {
        /* response = await fetch("https://e621.net/posts.json?page=" + goTo + "&tags=~type:jpg+~type:png+" + document.getElementById('tagz').value.replace(/ /g, '+') + tag, {
        headers: { "Authorization": "Basic " + btoa(`${username}:${apiKey}`) }
        }); */

        response = await fetch("https://e621.net/posts.json?page=" + goTo + "&tags=" + document.getElementById('tagz').value.replace(/ /g, '+').replace("y$", '_yesteryears_ago').replace("%p", ' ~type:png ~type:jpg') + tag, {
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
            display += "<a onclick='localStorage.setItem(`lastid`," + imgid + ");openup(`/imgload.html`);' target='_blank'><div class='imgcon' style='border-color: #6b2c2c;'><img class='lazyload' src='" + toBeDisplayed + "'/><p><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span></p></div></a>"
            //display += "<a onclick='openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><video controls lazyload><source src=" + toBeDisplayed + " type='video/webm'></video></a>"
        } else if (final.posts[ipp].file.ext == "gif") {
            var downv = final.posts[ipp].score.down;
            var nonhyphen = downv.toString().split('-').join('');
            let toBeDisplayed = final.posts[i++].sample.url;
            display += "<a onclick='localStorage.setItem(`lastid`," + imgid + ");openup(`/imgload.html`);' target='_blank'><div class='imgcon' style='border-color: #372c6b;'><img class='lazyload' src='" + toBeDisplayed + "'/><p><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span></p></div></a>" 
        } else if (final.posts[ipp].file.ext == "swf") {
            var downv = final.posts[ipp].score.down;
            var nonhyphen = downv.toString().split('-').join('');
            let toBeDisplayed = final.posts[i++].sample.url;
            display += "<a onclick='localStorage.setItem(`lastid`," + imgid + ");openup(`/imgload.html`);' target='_blank'><div class='imgcon' style='border-color: #555;'><img class='lazyload' src='/img/flash.png'/><p><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span></p></div></a>" 
        } else {
            var downv = final.posts[ipp].score.down;
            var nonhyphen = downv.toString().split('-').join('');
            let toBeDisplayed = final.posts[i++].sample.url;
            display += "<a onclick='localStorage.setItem(`lastid`," + imgid + ");openup(`/imgload.html`);' target='_blank'><div class='imgcon'><img class='lazyload' src='" + toBeDisplayed + "'/><p><span style='color: #388f3b;'>&uarr; " + final.posts[ipp].score.up + "</span> <span style='color: #bf3939;'>&darr; " + nonhyphen + "</span></p></div></a>"

            //display += "<a onclick='openup(`/imgload.html?id=" + imgid + "`);' target='_blank'><img class='lazyload' src='" + toBeDisplayed + "'/></a>"
        }
        
        // 75 e6 posts per page
        // 131 e6 being loaded for some damn reason

    });

    document.getElementById("display").innerHTML = display;
}};