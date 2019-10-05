function wait(ms) {
  return {
    timer: null,
    execute() {
      return new Promise(resolve => {
        this.timer = setTimeout(resolve, ms);
      });
    },
    abort() {
      this.timer && clearTimeout(this.timer);
    }
  };
}

export function poll(fn, interval) {
  return {
    wait: wait(interval),
    start() {
      const pollingFunc = fn();

      if (pollingFunc instanceof Promise) {
        pollingFunc.finally(() => {
          this.wait.execute().then(() => {
            this.start();
          });
        });
      } else {
        this.wait.execute().then(() => {
          this.start();
        });
      }
    },
    stop() {
      this.wait.abort();
    }
  };
}
