export class CQueue<T> {

    public vernierStart: number = 0;
    public vernierEnd: number = 0;
    public body: T[] = [];

    constructor(public maxSize: number = 1000, public readonly overflow: boolean = false) {
    }
    public get preferHead() {
        return (this.full ? this.vernierEnd - this.maxSize : this.vernierStart);
    }

    public get preferTail() {
        return this.vernierEnd - 1;
    }

    public get head() {
        return this.preferHead % this.maxSize;
    }

    public get tail() {
        return this.preferTail % this.maxSize;
    }

    public get length() {
        return this.vernierEnd - this.vernierStart;
    }

    public get full() {
        return this.length >= this.maxSize;
    }

    public get empty() {
        return this.length <= 0;
    }

    public push(element) {
        if (this.full && !this.overflow) {
            return false;
        }
        this.vernierEnd ++;
        this.body[this.tail] = element;
        return true;
    }

    public shift() {
        if (this.empty) {
            return false;
        }
        if (this.full) {
            this.vernierStart = this.preferHead;
        }
        this.vernierStart ++;
        return true;
    }

    public front(): T | undefined {
        if (this.empty) {
            return this.body[this.head];
        }
    }

    public rear(): T | undefined {
        if (this.empty) {
            return this.body[this.tail];
        }
    }

    public toArray() {
        const head = this.head;
        const tail = this.tail;
        if (head <= tail) {
            return this.body.slice(head, tail + 1);
        } else if (head > tail) {
            return [... this.body.slice(head, this.body.length), ... this.body.slice(0, tail + 1)];
        }
    }

}
