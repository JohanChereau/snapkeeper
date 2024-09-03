#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod workspace;
mod utils;

use tauri::Builder;
use tauri::Manager;
use commands::save_workspace;

fn main() {
    Builder::default()
    .setup(|app| {
        #[cfg(debug_assertions)] // only include this code on debug builds
        {
          let window = app.get_window("main").unwrap();
          window.open_devtools();
          window.close_devtools();
        }
        Ok(())
      })
        .invoke_handler(tauri::generate_handler![save_workspace])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
