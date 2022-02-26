require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
    const readmeTemplate = (
        await fs.readFile(__dirname + "/README.template.md")
    ).toString("utf-8");
    
    var url = "https://type.fit/api/quotes";
    let all_quotes = await (await fetch(url)).json();
    let current_quote = all_quotes[Math.floor(Math.random()*all_quotes.length)];

    const readme = readmeTemplate
        .replace("{inspirational_quote}", current_quote.text)
        .replace("{inspirational_author}", `- ${current_quote.author}`)

    await fs.writeFile("README.md", readme);
    console.log(current_quote.text);
}
main();