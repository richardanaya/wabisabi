use wadi::{cstr, CString, register_scope};
use js_ffi::*;

#[no_mangle]
pub fn init() {
    register_scope("/kernel/stdout");
    register_scope("/kernel/stdin");
    register_scope("/kernel/stderr");
}

#[no_mangle]
pub fn write(path:CString, pos:usize, length: usize) {
    js!(console.log).invoke_1("Hello world!");
}

#[no_mangle]
pub fn name() -> CString {
    cstr("terminal")
}
