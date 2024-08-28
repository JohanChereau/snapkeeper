use tauri::command;
use crate::workspace::manager::save_workspace_config;
use crate::workspace::config::WorkspaceConfig;

#[command]
pub fn save_workspace(config: WorkspaceConfig) -> Result<(), String> {
    save_workspace_config(config)
}
