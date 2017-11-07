'use strict';

class listNode {
    constructor(value) {
        this._data = value;
        this._next = null;
    }
}

class LinkedList {
    constructor() {
    	this._length = 0;
    	this._head = null;
    }


    get first() {
    	return this._head._data;
    }


    get last() {
        let current = this._head;

        while(current._next){
            current = current._next;
        }

        return current._data;
    }


    get length() {
    	return this._length;
    }


    append(data) {
    	for(let i = 0; i < arguments.length; i++) {
	        let node = new listNode(arguments[i]),
            	current;

	        if (this._head === null){
	            this._head = node;
	        } else {
	            current = this._head;

	            while(current._next){
	                current = current._next;
	            }

	            current._next = node;
	        }

	        this._length++;
	    }

    	return this;

    }


    prepend(data) {
    	for(let i = arguments.length; 0 < i; i--) {

	        let node = new listNode(arguments[i - 1]),
				next = this._head;

			if (this._head === null) {
	        	this._head = node;
	        	this._head._next = null;
	        } else {
	        	this._head = node;
	        	this._head._next = next;
	        }

	        this._length++;
	    }

    	return this;

    }


    insert(index, ...args) {
        if (index === 0) {
            this.prepend(...args);
        } else {
            let i = 0,
                current = this._head,
                previous;

            while (i++ < index) {
                previous = current;
                current = current._next;
            }

            for (const arg of args) {
                let newNode = new listNode(arg);
                previous._next = newNode;
                newNode._next = current;

                previous = newNode;

                this._length += 1;
            }
        }

        return this;
    }


    at(index, value) {
        if (value !== undefined) {
            this.insert(index, value);
            this.removeAt(index + 1);
        } else {
            if (0 <= index && index < this._length) {
                var current = this._head,
                    i = 0;

                while (i++ < index) {
                    current = current._next;
                }

                return current._data;
            } else {
                return null;
            }
        }
    }


    removeAt(index) {
        if (index > -1 && index < this._length){

            var current = this._head,
                previous,
                i = 0;

            if (index === 0){
                this._head = current._next;
            } else {

                while(i++ < index){
                    previous = current;
                    current = current._next;
                }

                previous._next = current._next;
            }

            this._length--;

            return current._data;            

        } else {

            return null;

        }
    }


    _getElementAt(index) {

        let count = 0,
            currentElement = this._head;

        while (currentElement && count < index) {
            currentElement = currentElement._next;
            count += 1;
        }

        return currentElement;
    }


    toArray() {
            let current = this._head,
            	theArray = [],
                i = 0;

            while(i++ < this.length){
            	theArray.push(current._data)
                current = current._next;
            }

            return theArray;

	}


    toString() {
    	return this.toArray().join(' -> ');
    }


    *[Symbol.iterator]() {
	    let node = this._head;
	 
	    while (node !== null) {
	        yield node._data;
	        node = node._next;
	    }
	}
}



/*const list = new LinkedList().append(6, 7, 8).prepend(1, 2, 3, 4, 5);

for(const value of list) {
    console.log(value);
}*/
module.exports = LinkedList;