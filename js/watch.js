class TCircuit { // our data-node
    constructor(h, m, s, ms, laps)
    {
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
        this.milliSec = ms;
        this.curentLaps = laps;
    };
};
function LinkedList() {
    // initVariables
    var length = 0;
    var head  = null;
    var nodes = [];// THIS IS WHERE WE CAN VIEW THE NODES FOR HANDLING SPLITS
    // establishing the genNode
    var Node = function(element) {
        this.element = element;
        this.next = null;
    };
    // just returns the length
    this.size = function() { return length; };
    // gets the head node
    this.head = function() { return head; };
    // add new element to the list in order
    this.add = function(element) {
        var node = new Node(element);
        if (head === null) {
            head = node;
        } else {
            var currentNode = head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
        length++;
        nodes.push(node);
    };
    // display the list
    this.showList= function()
    { return nodes; };
    // remove element from the list
    this.remove = function(element) {
        var currentNode = head;
        var previousNode;
        if (currentNode.element === element) {
            head = currentNode.next;
        } else {
            while (currentNode.element !== element) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = currentNode.next;
        }
        length--;
    };
    // check if empty or not
    this.isEmpty = function() { return length === 0; };
    // index of a node element in the list
    this.indexOf = function(element) {
        var currentNode = head;
        var idx = -1;
        while (currentNode) {
            idx++;
            if (currentNode.element === element) { return idx; };
            currentNode = currentNode.next;
        }
        return -1;
    };
    // returns the node@specified index
    this.elementAt = function(idx) {
        var currentNode = head;
        var count = 0;
        while (count < idx) {
            count++;
            currentNode = currentNode.next;
        }
        return currentNode.element;
    };
    // insert node at a specific index
    this.addAt = function(idx, element) {
        var node = new Node(element);
        var currentNode = head;
        var previousNode;
        var currentIndex = 0;
        if (idx > length) { return false; };
        if (idx === 0) {
            node.next = currentNode;
            head = node;
        } else {
            while (currentIndex < idx) {
                currentIndex++;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            node.next = currentNode;
            previousNode.next = node;
        }
        length++;
    };
    // to remove a node at a specific index
    this.removeAt = function(idx) {
        var currentNode = head;
        var previousNode;
        var currentIndex = 0;
        if (idx === 0) {
            head = currentNode.next;
        } else {
            while (currentIndex < idx) {
                currentIndex++;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = currentNode.next;
        }
        length--;
        return currentNode.element;
    };
};


