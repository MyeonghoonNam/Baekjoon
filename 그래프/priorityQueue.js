class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    let isContain = false;

    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].priority < newNode.priority) {
        this.queue.splice(i, 0, newNode);
        isContain = true;
        break;
      }
    }

    if (!isContain) {
      this.queue.push(newNode);
    }
  }

  dequeue() {
    if (this.queue.length === 0) {
      return new Error('큐에 데이터가 비었습니다.');
    }

    return this.queue.shift().value;
  }
}

const q = new PriorityQueue();

q.enqueue(5, 2);
q.enqueue(1, 5);

console.log('---------------');
console.log(q.queue);

q.dequeue();
console.log('---------------');
console.log(q.queue);
