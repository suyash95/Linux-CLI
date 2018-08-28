const readline = require("readline");
const cl = readline.createInterface(process.stdin, process.stdout);

/**
 * @typedef {Object} CMD
 * @property {String} cmd
 * @property {Array<String>} args
 */

/**
 * 
 * @param {String} path 
 * @returns {Promise<CMD>}
 */
const question = (path) => {
    return new Promise((res, rej) => {
        cl.question(`${path} `, input => {
            const inputArr = input.trim().split(" ").filter(i => i !== "");
            res({
                cmd: inputArr[0],
                args: inputArr[1] ? inputArr[1].split("/") : []
            });
        });
    });
};

module.exports = { question };