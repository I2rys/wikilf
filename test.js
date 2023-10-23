(async()=>{
    "use strict";

    // Dependencies
    const wikiLF = require("./index")

    // Main
    const response = await wikiLF("nsa", 1)
    console.log(JSON.stringify(response, null, 2))
})()