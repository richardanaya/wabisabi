const utf8dec = new TextDecoder("utf-8");
const utf8enc = new TextEncoder("utf-8");

function getStringFromMemory(mem, start) {
  const data = new Uint8Array(mem);
  const str = [];
  let i = start;
  while (data[i] !== 0) {
    str.push(data[i]);
    i++;
  }
  return utf8dec.decode(new Uint8Array(str));
}

class KernelModule {
  constructor(kernel, url) {
    this.kernel = kernel;
    this.url = url;
    this.scopes = [];
  }

  init() {
    return new Promise((resolve, reject) => {
      this.module = js_ffi.run({
        path: this.url,
        entry: null,
        imports: {
          register_scope: this.register_scope.bind(this),
          device_error: this.device_error.bind(this)
        },
        onLoad: () => {
          let n = this.module.instance.exports.name();
          this.name = getStringFromMemory(
            this.module.instance.exports.memory.buffer,
            n
          );
          console.log('"' + this.name + '" module loading');
          this.module.instance.exports.init();
          resolve();
        }
      });
    });
  }

  register_scope(scopePtr) {
    let scope = getStringFromMemory(
      this.module.instance.exports.memory.buffer,
      scopePtr
    );
    this.scopes.push(scope);
  }

  device_error(errPtr) {
    let err = getStringFromMemory(
      this.module.instance.exports.memory.buffer,
      errPtr
    );
    console.error(err);
  }

  allocateString(str) {
    let bytes = utf8enc.encode(str + String.fromCharCode(0));
    let len = bytes.length;
    let start = this.module.instance.exports.malloc(len);
    const memory = new Uint8Array(this.module.instance.exports.memory.buffer);
    memory.set(bytes, start);
    return start;
  }

  allocateData( data ) {
    let pos = this.module.instance.exports.malloc(data.length);
    const mem = new Uint8Array(this.module.instance.exports.memory);
    for(let i = 0 ; i < data.length; i++){
      mem[pos+i] = data[i];
    }
    return pos;
  }
}

class Process {
  constructor(kernel, app, input, output) {
    this.kernel = kernel;
    this.app = app;
    this.input = input;
    this.output = output;
  }

  run() {
    let imports = {
      args_get: this.args_get.bind(this),
      args_sizes_get: this.args_sizes_get.bind(this),
      environ_get: this.environ_get.bind(this),
      environ_sizes_get: this.environ_sizes_get.bind(this),
      clock_res_get: this.clock_res_get.bind(this),
      clock_time_get: this.clock_time_get.bind(this),
      fd_advise: this.fd_advise.bind(this),
      fd_allocate: this.fd_allocate.bind(this),
      fd_close: this.fd_close.bind(this),
      fd_datasync: this.fd_datasync.bind(this),
      fd_fdstat_get: this.fd_fdstat_get.bind(this),
      fd_fdstat_set_flags: this.fd_fdstat_set_flags.bind(this),
      fd_fdstat_set_rights: this.fd_fdstat_set_rights.bind(this),
      fd_filestat_get: this.fd_filestat_get.bind(this),
      fd_filestat_set_size: this.fd_filestat_set_size.bind(this),
      fd_filestat_set_times: this.fd_filestat_set_times.bind(this),
      fd_pread: this.fd_pread.bind(this),
      fd_prestat_get: this.fd_prestat_get.bind(this),
      fd_prestat_dir_name: this.fd_prestat_dir_name.bind(this),
      fd_pwrite: this.fd_pwrite.bind(this),
      fd_read: this.fd_read.bind(this),
      fd_readdir: this.fd_readdir.bind(this),
      fd_renumber: this.fd_renumber.bind(this),
      fd_seek: this.fd_seek.bind(this),
      fd_sync: this.fd_sync.bind(this),
      fd_tell: this.fd_tell.bind(this),
      fd_write: this.fd_write.bind(this),
      path_create_directory: this.path_create_directory.bind(this),
      path_filestat_get: this.path_filestat_get.bind(this),
      path_filestat_set_times: this.path_filestat_set_times.bind(this),
      path_link: this.path_link.bind(this),
      path_open: this.path_open.bind(this),
      path_readlink: this.path_readlink.bind(this),
      path_remove_directory: this.path_remove_directory.bind(this),
      path_rename: this.path_rename.bind(this),
      path_symlink: this.path_symlink.bind(this),
      path_unlink_file: this.path_unlink_file.bind(this),
      poll_oneoff: this.poll_oneoff.bind(this),
      proc_exit: this.proc_exit.bind(this),
      proc_raise: this.proc_raise.bind(this),
      sched_yield: this.sched_yield.bind(this),
      random_get: this.random_get.bind(this),
      sock_recv: this.sock_recv.bind(this),
      sock_send: this.sock_send.bind(this),
      sock_shutdown: this.sock_shutdown.bind(this)
    };
    return new Promise((resolve, reject) => {
      this.module = js_ffi.run({
        path: this.app,
        entry: "_start",
        overrides: {
          wasi_snapshot_preview1: imports,
          wasi: imports
        }
      });
    });
  }

  args_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  args_sizes_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  environ_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  environ_sizes_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  clock_res_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  clock_time_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_advise() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_allocate() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_close() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_datasync() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_fdstat_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_fdstat_set_flags() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_fdstat_set_rights() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_filestat_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_filestat_set_size() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_filestat_set_times() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_pread() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_prestat_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_prestat_dir_name() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_pwrite() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_read() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_readdir() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_renumber() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_seek() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_sync() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_tell() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_write(fd, iovsPtr, iovsLen, outNumWritten) {
    let data = this.extractData(dataSpec);
    this.kernel.sendDataToFile(fd, data);
  }

  path_create_directory() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_filestat_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_filestat_set_times() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_link() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_open() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_readlink() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_remove_directory() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_rename() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_symlink() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_unlink_file() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  poll_oneoff() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  proc_exit() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  proc_raise() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  sched_yield() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  random_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  sock_recv() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  sock_send() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  sock_shutdown() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  extractData(iovsPtr, iovsLen) {
    return new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
  }
}

class WabiSabiKernel extends HTMLElement {
  constructor() {
    super();
    this.modules = [];
  }

  connectedCallback() {
    this.init().then();
  }

  async init() {
    this.shadow = this.attachShadow({ mode: "open" });
    let modules = this.querySelectorAll("kernel-module");
    for (let m = 0; m < modules.length; m++) {
      await this.loadModule(modules[m].getAttribute("src"));
    }
    let startupProcess = this.getAttribute("run");
    if (startupProcess) {
      await this.runProcess(startupProcess, 0, 1);
    }
  }

  async loadModule(modUrl) {
    self.wabisabi = this;
    let mod = new KernelModule(this, modUrl);
    this.modules.push(mod);
    await mod.init();
  }

  async runProcess(app, input, output) {
    let proc = new Process(this, app, input, output);
    await proc.run();
  }

  sendDataToFile(fd, data) {
    let path = this.getPath(fd);
    let mod = this.getModuleWithScope(path);
    this.writeToModule(path, mod, data);
  }

  getPath(fd, data) {
    // todo: get path from open files
    return "/kernel/stdout";
  }

  getModuleWithScope(path, data) {
    // todo: look through modules to find which one handles path
    return this.modules[0];
  }

  writeToModule(path, mod, data) {
    let dataPtr = mod.allocateData(data);
    let pathPtr = mod.allocateString(path);
    mod.module.instance.exports.write(pathPtr, dataPtr, data.length);
  }
}
window.customElements.define("wabisabi-kernel", WabiSabiKernel);
