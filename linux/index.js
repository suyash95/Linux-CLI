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
        let l = path.length
        let arr1 = [...this.root.list]
        if(arr1.length>0){
        if(arr1[0].name == path[l-1]){
            return "ERR: DIRECTORY ALREADY EXISTS"
        }
    }
        this.curDir.mkdir(path);
        return "SUCC: CREATED"
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
        if(path.size ==1 && path[0]==="~"){
            return "Invalid operation"
        }
        const tmp = this.cd(path);
        this.curDir.rm(tmp);
        this.curDir = this.curDir.cd([".."])
        
        
        return "SUCC: DELETED"
    }

    sessionClear(){
        let data = new Dir("~")
        this.curDir = data
        return "SUCC: CLEARED: RESET TO ROOT"

    }

}

module.exports = new Linux();