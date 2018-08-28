const { question } = require("./lib/input");
const root = require("./linux");

const linuxFunctions = {
    "cd": root.cd,
    "mkdir": root.mkdir,
    "ls": root.ls,
    "pwd": root.pwd,
    "rm": root.rm,
    "clear" : root.sessionClear,
    "default": () => "ERR: CANNOT RECOGNIZE INPUT."
};

const start = async() => {
    try {
    const option = await question(root.curDir.pwd());
    const method = linuxFunctions[option.cmd] || linuxFunctions["default"];
    const res = method(option.args);
    console.log(res)
    } catch (error) {
        console.log(error.message)
    }

    start();
};
start();