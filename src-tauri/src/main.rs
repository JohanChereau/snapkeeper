#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod workspace;
mod utils;

use tauri::Builder;
use commands::save_workspace;

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![save_workspace])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
