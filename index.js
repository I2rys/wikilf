"use strict";

// Dependencies
const request = require("request-async")
const { JSDOM } = require("jsdom")

// Functions
async function scrape(query, page){
    const response = await request(`https://search.wikileaks.org/advanced?any_of=&page=${page}&exact_phrase=&query=${query}&released_date_end=&document_date_start=&order_by=most_relevant&released_date_start=&new_search=True&exclude_words=&document_date_end=`, {
        headers: {
            "user-agent": `Chrome RAN-${Math.floor(Math.random() * 9999)}`
        }
    })
    const dom = new JSDOM(response.body)
    const results = []
    const titles = Array.from(dom.window.document.querySelectorAll("#results > div > div.results > div > div.info > h4 > a"))
    const createdDates = Array.from(dom.window.document.querySelectorAll("#results > div > div.results > div > div.other-info > div.dates > div:nth-child(1) > span"))
    const releasedDates = Array.from(dom.window.document.querySelectorAll("#results > div > div.results > div > div.other-info > div.dates > div:nth-child(2) > span"))

    for( const i in titles ) results.push({
        title: titles[i].textContent.trim(),
        link: titles[i].getAttribute("href"),
        createdDate: createdDates[i].textContent,
        releasedDate: releasedDates[i].textContent
    })

    return results
} 

// Main
module.exports = scrape