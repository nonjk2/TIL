class cal {
  constructor() {
    this.value = 0;
  }

  set(num) {
    this.value = num;
  }

  clear() {
    this.value = 0;
  }
  add(num) {
    this.value += num;
  }
}

module.exports = cal;
