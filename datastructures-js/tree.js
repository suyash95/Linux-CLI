class Dir {
    /**
     * @typedef {Object} parent
     * @property {Dir} node
     * @property {Number} index
     * 
     * @param {String} name name of the directory
     * @param {parent} parent 
     */
    constructor(name, parent = null) {

        /**
         * @type {String}
         */
        this.name = name;

        /**
         * @type {Set<Dir>}
         */
        this.list = new Set();
        this.parent = parent || {
            node: null,
            index: null
        };
    }

    ls() {
        try{
        return [...this.list].map(dir => dir.name);
        }
        catch(error){
            return []
        }
    }

    /**
     * 
     * @param {Array<String>} paths 
     * @returns {Dir}
     */
    cd(paths) {
        /**
         * @type {Dir}
         */
        let curDir = this;
        
        paths.forEach(path => {
            if (path === "..") {
                curDir = curDir.parent.node;
            } else {
                const nd = [...curDir.list].reduce((acc, ele) => {
                    if (!acc) {
                        return ele.name === path ? ele : null;
                    } else return acc;
                }, null);
                if (nd) {
                    curDir = nd;
                } else {
                    throw new Error();
                }
            }
        });

        return curDir;
    }

    /**
     * 
     * @param {Array<String>} paths 
     */
    mkdir(paths) {
        /**
         * @type {Dir}
         */
        let curDir = this;
        paths.forEach(path => {
            try {
                curDir = curDir.cd([path]);
            } catch (error) {
                const tmp = new Dir(path);
                tmp.parent.node = curDir;
                const index = curDir.list.add(tmp);
                tmp.parent.index = curDir.list.size;
                curDir = curDir.cd([path]);
            }
        });

        return this;
    }

    /**
     * @returns {String}
     */
    pwd() {
        /**
         * @type {Array<String>}
         */
        let dirs = []

        /**
         * @type {Dir}
         */
        let curDir = this;

        while (curDir) {
            dirs.unshift(curDir.name);
            curDir = curDir.parent.node;
        }

        return dirs.join("/");
    }

    rm(tmp) {
        if(tmp){
        for(var i=0;i<tmp.size;i++){
            this.rm(tmp[i])
        }
        delete tmp.name
        delete tmp.list
    }
    }

    toString() {
        return this.pwd();
    }
}

module.exports = {
    Dir
};