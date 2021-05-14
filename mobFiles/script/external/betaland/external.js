/*
	LANDING MOBILE = 6;
	SPORT MOBILE = 1;
	CASINO MOBILE = 2;
	SPORT DESKTOP = 3;
	CASINO DESKTOP = 4;
	LANDING DESKTOP = 5;
*/

var vers = "1.14";

var pageInitialized = false;
var isMobile = false;

jQuery(document).ready(function () {

    if (pageInitialized) return;
    pageInitialized = true;

    if (isInIframe()) {
        loadSportbook();
    } else {

        console.log("Codice Prodotto: ", cg_CODICE_PRODOTTO)

        loadZenDesk();

        if (cg_CODICE_PRODOTTO == 1 || cg_CODICE_PRODOTTO == 6 || cg_CODICE_PRODOTTO == 8) {
            console.log("dg: yes mobile");
            loadMobile();
            isMobile = true;
        }

        // sometimes it's num, sometimes string
        if (cg_CODICE_PRODOTTO == 5 || cg_CODICE_PRODOTTO == '3') {
            console.log("dg: yes desktop");
            isMobile = false;
            //setTimeout("loadZenDesk()", 1500);
        }

        if (cg_CODICE_PRODOTTO == 5) {
            loadHome();
        }

        if (cg_CODICE_PRODOTTO == 6) {
            loadHomeMobile();
        }

        if (cg_USER == null || typeof cg_USER === 'undefined') {
            console.log("dg: no login");
        } else {
            console.log("dg: yes login");

            if (cg_USER.pvr === true) {
                if (!isMobile) {
                    console.log("dg: yes pvr");
                    loadAccountDropdownPVR();
                }
            }

            if (cg_USER.pvr === false) {
                if (!isMobile) {
                    console.log("dg: no pvr");
                    setTimeout("loadCSSUser()", 10);
                    loadAccountDropdownUser();
                }
            }
        }
        //console.log("1");
        //console.log(cg_CODICE_PRODOTTO);

        //console.log("2");
        //console.log(cg_USER);
    }
});

function loadCSSUser() {
    console.log("ready css by dg! user");
    loadjscssfile("https://resources2.betaland.it/script/external/betaland/user.css?v=" + vers, "css", "head");
}

function loadZenDesk() {
    console.log("ready zendesk by dg! ");

    loadjscssfile("https://resources2.betaland.it/script/external/betaland/zendeskheader.js?v=" + vers, "js", "head");

    setTimeout(function () {
		loadjscssfile("https://resources2.betaland.it/script/external/betaland/zendeskbody.js?v=" + vers, "js", "body");
    }, 3000);
}

function loadAccountDropdownUser() {
    console.log("loadAccountDropdownUserJs")
    loadjscssfile("https://resources2.betaland.it/script/external/betaland/account-dropdown-user.js?v=" + vers, "js", "body");
}

function loadAccountDropdownPVR() {
    console.log("loadAccountDropdownUserJs")
    loadjscssfile("https://resources2.betaland.it/script/external/betaland/account-dropdown-pvr.js?v=" + vers, "js", "body");
}

function loadSportbook() {
    console.log("loadSportbooksJs")
    loadjscssfile("https://resources2.betaland.it/script/external/betaland/sportbooks.js?v=" + vers, "js", "head");
}

function loadMobile() {
    console.log("loadMobileJs")
	setTimeout(function () {
		loadjscssfile("https://resources2.betaland.it/script/external/betaland/mobile.js?v=" + vers, "js", "head");
	}, 1500);
}

function loadHome() {
    console.log("loadHomeJs")
	setTimeout(function () {
		loadjscssfile("https://resources2.betaland.it/script/external/betaland/home.js?v=" + vers, "js", "head");
	}, 1500);
}

function loadHomeMobile() {
    console.log("loadHomeMobileJs")
	setTimeout(function () {
        loadjscssfile("https://resources2.betaland.it/script/external/betaland/home-mobile.js?v=" + vers, "js", "head");
    }, 1500);
}

function loadCSSPVR() {
    console.log("ready css by dg! pvr");
    // TODO: loadjscssfile("myscript.js", "js")
}

function loadjscssfile(filename, filetype, placement_tag) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName(placement_tag)[0].appendChild(fileref)
}

function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}