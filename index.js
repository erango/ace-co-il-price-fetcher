import fs from "fs";
import yargs from "yargs/yargs";
import got from "got";
import cheerio from "cheerio";
import chalk from 'chalk';

const url = 'https://www.ace.co.il/6093523';
const threshold = 1600;
const interval = 1000 * 60 * 60 * 2;

const checkPrice = () => {
    got(url).then(response => {
        const $ = cheerio.load(response.body);
        const title = ($('title').text());
        const price = ($('meta[property="product:price:amount"]')[0].attribs.content);
        console.log(chalk.cyan(title), "\t", chalk.bgYellow.black(price), "\t");
        if (price <= threshold) {
            console.log(chalk.red(' << Threshold met!'));
        }
    }).catch(err => {
        console.log(err);
    });
}

checkPrice();
setInterval(checkPrice, interval);