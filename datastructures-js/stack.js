class Stack {
    constructor() {
        this.stack = new Array();
    }

    push(ele) {
        this.stack.push(ele);
    }

    pop() {
        return this.stack.pop();
    }
}

module.exports = { Stack };