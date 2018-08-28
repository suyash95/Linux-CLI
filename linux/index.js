const { Dir } = require("../datastructures-js/tree");
const { Stack } = require("../datastructures-js/stack");

class Linux {
    constructor() {
        this.root = new Dir("~");
        this.history = new Stack();
        this.curDir = this.root;

        this.cd = this.cd.bind(this);
        this.pwd = this.pwd.bind(this);
        this.ls = this.ls.bind(this);
        this.mkdir = this.mkdir.bind(this);
        this.rm = this.rm.bind(this);
        this.sessionClear = this.sessionClear.bind(this)
    }

    pwd() {
        return this.curDir.pwd();
    }

    ls() {
        return this.curDir.ls();
    }

    mkdir(path) {
        this.curDir.mkdir(path);
        return "SUCC: Created"
    }

    cd(path) {
        if (path[0] === "~"){ 
            this.curDir = this.root;
            path = path.slice(1);
        }
        this.curDir = this.curDir.cd(path);
        return this.curDir;
    }

    rm(path){
        const tmp = this.cd(path);
        this.curDir.rm(tmp);
        return "deleted successfully"
    }

    sessionClear(){
      let data = new Dir("~")
      this.curDir = data
      return "SUCC: CLEARED: RESET TO ROOT"
    }

}

module.exports = new Linux();