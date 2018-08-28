const { question } = require("./lib/input");
const root = require("./linux");

const linuxFunctions = {
    "cd": root.cd,
    "mkdir": root.mkdir,
    "ls": root.ls,
    "pwd": root.pwd,
    "rm": root.rm,
    "clear" : root.sessionClear,
    "default": () => "Invalid Command"
};

const start = async() => {
    const option = await question(root.curDir.pwd());
    const method = linuxFunctions[option.cmd] || linuxFunctions["default"];
    const res = method(option.args);
    console.log(res)

    start();
};
start();