class HashMap {
  buckets: Array<any> = [];
  loadfactor: number = 0.75;
  capacity: number = 16;

  hash(key: string) {
    let hashCode = 0;
    const primeNumber = 3;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key: string, value: any) {
    if (this.length() / this.capacity >= this.loadfactor) {
      this.expand();
    }
    const index: number = this.hash(key);
    const bucketNode = new LinkedNode(key, value);

    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index]) {
      if (
        this.buckets[index].key === key &&
        this.buckets[index].nextNode === null
      ) {
        this.buckets[index] = bucketNode;
        return;
      }
      if (
        this.buckets[index].key === key &&
        this.buckets[index].nextNode !== null
      ) {
        bucketNode.nextNode = this.buckets[index].nextNode;
        this.buckets[index] = bucketNode;
        return;
      }
      let currentNode = this.buckets[index];
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
    } else {
      this.buckets[index] = bucketNode;
      return;
    }
  }

  get(key: string) {
    const index: number = this.hash(key);

    if (!this.buckets[index]) {
      return null;
    }
    if (this.buckets[index].key === key) {
      return this.buckets[index].value;
    }
    if (this.buckets[index].key !== key) {
      let currentNode: LinkedNode = this.buckets[index];

      while (currentNode.key !== key) {
        if (currentNode.nextNode == null) {
          return null;
        }
        currentNode = this.buckets[index].nextNode;
      }
      return currentNode.value;
    }
  }

  has(key: string) {
    const index: number = this.hash(key);
    if (!this.buckets[index]) {
      return false;
    }
    if (this.buckets[index] && this.buckets[index].key == key) {
      return true;
    }
    if (this.buckets[index].key !== key) {
      let currentNode: LinkedNode = this.buckets[index];

      while (currentNode.key !== key) {
        if (currentNode.nextNode == null) {
          return false;
        }
        currentNode = this.buckets[index].nextNode;
      }
      return true;
    }
  }

  remove(key: string) {
    const index: number = this.hash(key);
    if (this.buckets[index] && this.buckets[index].nextNode === null) {
      this.buckets[index] === "";
      return true;
    }
    if (this.buckets[index] && this.buckets[index].nextNode !== null) {
      let currentNode: any = this.buckets[index];
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
  }

  length() {
    let counter: number = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        let currentNode = this.buckets[i];
        while (currentNode !== null) {
          counter += 1;
          currentNode = currentNode.nextNode;
        }
      }
    }
    return counter;
  }

  clear() {
    this.buckets = [];
  }

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        if (this.buckets[i].nextNode === null) {
          keysArray.push(this.buckets[i].key);
        }
        if (this.buckets[i].nextNode !== null) {
          let currentNode: any = this.buckets[i];
          while (currentNode !== null) {
            keysArray.push(currentNode.key);
            currentNode = currentNode.nextNode;
          }
        }
      }
    }
    return keysArray;
  }

  values() {
    const valueArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        if (this.buckets[i].nextNode === null) {
          valueArray.push(this.buckets[i].value);
        }
        if (this.buckets[i].nextNode !== null) {
          let currentNode: any = this.buckets[i];
          while (currentNode !== null) {
            valueArray.push(currentNode.value);
            currentNode = currentNode.nextNode;
          }
        }
      }
    }
    return valueArray;
  }

  entries() {
    const entriesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        if (this.buckets[i].nextNode === null) {
          const pairs = [this.buckets[i].key, this.buckets[i].value];
          entriesArray.push(pairs);
        }
        if (this.buckets[i].nextNode !== null) {
          let currentNode: any = this.buckets[i];
          while (currentNode !== null) {
            const pairs = [currentNode.key, currentNode.value];
            entriesArray.push(pairs);
            currentNode = currentNode.nextNode;
          }
        }
      }
    }
    return entriesArray;
  }

  expand() {
    const oldHashArray = this.entries();
    this.clear();
    this.capacity = this.capacity * 2;
    oldHashArray.forEach((pairs) => {
      this.set(pairs[0], pairs[1]);
    });
  }
}

class LinkedNode {
  value: any = null;
  key: string | null = null;
  nextNode: LinkedNode | null = null;

  constructor(key: string, value: any) {
    this.value = value;
    this.key = key;
  }
}

export { HashMap };
