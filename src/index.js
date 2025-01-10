"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMap = void 0;
var HashMap = /** @class */ (function () {
    function HashMap() {
        this.buckets = [];
        this.loadfactor = 0.75;
        this.capacity = 16;
    }
    HashMap.prototype.hash = function (key) {
        var hashCode = 0;
        var primeNumber = 3;
        for (var i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    };
    HashMap.prototype.set = function (key, value) {
        if (this.length() / this.capacity > this.loadfactor) {
            this.expand();
        }
        console.log(this.length() / this.capacity);
        var index = this.hash(key);
        var bucketNode = new LinkedNode(key, value);
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[index]) {
            if (this.buckets[index].key === key &&
                this.buckets[index].nextNode === null) {
                this.buckets[index] = bucketNode;
                return;
            }
            if (this.buckets[index].key === key &&
                this.buckets[index].nextNode !== null) {
                bucketNode.nextNode = this.buckets[index].nextNode;
                this.buckets[index] = bucketNode;
                return;
            }
            var currentNode = this.buckets[index];
            while (currentNode.nextNode !== null) {
                if (currentNode.nextNode.key === key) {
                    bucketNode.nextNode = currentNode.nextNode.nextNode;
                    currentNode.nextNode = bucketNode;
                    return;
                }
                currentNode = currentNode.nextNode;
            }
            currentNode.nextNode = bucketNode;
            return;
        }
        else {
            this.buckets[index] = bucketNode;
            return;
        }
    };
    HashMap.prototype.get = function (key) {
        var index = this.hash(key);
        if (!this.buckets[index]) {
            return null;
        }
        if (this.buckets[index].key === key) {
            return this.buckets[index].value;
        }
        if (this.buckets[index].key !== key) {
            var currentNode = this.buckets[index];
            while (currentNode.key !== key) {
                if (currentNode.nextNode == null) {
                    return null;
                }
                currentNode = this.buckets[index].nextNode;
            }
            return currentNode.value;
        }
    };
    HashMap.prototype.has = function (key) {
        var index = this.hash(key);
        if (!this.buckets[index]) {
            return false;
        }
        if (this.buckets[index] && this.buckets[index].key == key) {
            return true;
        }
        if (this.buckets[index].key !== key) {
            var currentNode = this.buckets[index];
            while (currentNode.key !== key) {
                if (currentNode.nextNode == null) {
                    return false;
                }
                currentNode = this.buckets[index].nextNode;
            }
            return true;
        }
    };
    HashMap.prototype.remove = function (key) {
        var index = this.hash(key);
        if (this.buckets[index] && this.buckets[index].nextNode === null) {
            this.buckets[index] === "";
            return true;
        }
        if (this.buckets[index] && this.buckets[index].nextNode !== null) {
            var currentNode = this.buckets[index];
            if (currentNode.key === key) {
                this.buckets[index] = currentNode.nextNode;
                return true;
            }
            while (currentNode.nextNode !== null) {
                if (currentNode.nextNode.key === key) {
                    currentNode.nextNode = currentNode.nextNode.nextNode;
                    return true;
                }
                currentNode = currentNode.nextNode;
            }
            return false;
        }
    };
    HashMap.prototype.length = function () {
        var counter = 0;
        for (var i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                var currentNode = this.buckets[i];
                while (currentNode.nextNode !== null) {
                    counter += 1;
                    currentNode = currentNode.nextNode;
                }
                counter += 1;
            }
        }
        return counter;
    };
    HashMap.prototype.clear = function () {
        this.buckets = [];
    };
    HashMap.prototype.keys = function () {
        var keysArray = [];
        for (var i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                if (this.buckets[i].nextNode === null) {
                    keysArray.push(this.buckets[i].key);
                }
                if (this.buckets[i].nextNode !== null) {
                    var currentNode = this.buckets[i];
                    while (currentNode !== null) {
                        keysArray.push(currentNode.key);
                        currentNode = currentNode.nextNode;
                    }
                }
            }
        }
        return keysArray;
    };
    HashMap.prototype.values = function () {
        var valueArray = [];
        for (var i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                if (this.buckets[i].nextNode === null) {
                    valueArray.push(this.buckets[i].value);
                }
                if (this.buckets[i].nextNode !== null) {
                    var currentNode = this.buckets[i];
                    while (currentNode !== null) {
                        valueArray.push(currentNode.value);
                        currentNode = currentNode.nextNode;
                    }
                }
            }
        }
        return valueArray;
    };
    HashMap.prototype.entries = function () {
        var entriesArray = [];
        for (var i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                if (this.buckets[i].nextNode === null) {
                    var pairs = [this.buckets[i].key, this.buckets[i].value];
                    entriesArray.push(pairs);
                }
                if (this.buckets[i].nextNode !== null) {
                    var currentNode = this.buckets[i];
                    while (currentNode !== null) {
                        var pairs = [currentNode.key, currentNode.value];
                        entriesArray.push(pairs);
                        currentNode = currentNode.nextNode;
                    }
                }
            }
        }
        return entriesArray;
    };
    HashMap.prototype.expand = function () {
        var _this = this;
        var oldHashArray = this.entries();
        this.clear();
        this.capacity = this.capacity * 2;
        oldHashArray.forEach(function (pairs) {
            _this.set(pairs[0], pairs[1]);
        });
    };
    return HashMap;
}());
exports.HashMap = HashMap;
var LinkedNode = /** @class */ (function () {
    function LinkedNode(key, value) {
        this.value = null;
        this.key = null;
        this.nextNode = null;
        this.value = value;
        this.key = key;
    }
    return LinkedNode;
}());
