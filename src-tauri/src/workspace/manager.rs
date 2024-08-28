use std::fs;
use std::path::PathBuf;
use crate::workspace::config::WorkspaceConfig;
use crate::utils::paths::get_workspace_file_path;

pub fn save_workspace_config(config: WorkspaceConfig) -> Result<(), String> {
    // Get the path for the workspace directory and create it if it doesn't exist
    let workspace_dir = PathBuf::from(&config.location).join(&config.name);
    if !workspace_dir.exists() {
        fs::create_dir_all(&workspace_dir)
            .map_err(|e| format!("Failed to create workspace directory: {}", e))?;
    }

    // Get the full path for the config file inside the workspace directory
    let file_path = get_workspace_file_path(&workspace_dir)?;

    // Serialize the configuration to JSON format
    let json_data = serde_json::to_string_pretty(&config)
        .map_err(|e| format!("Failed to serialize workspace config: {}", e))?;

    // Write the serialized JSON to the config file
    fs::write(&file_path, json_data)
        .map_err(|e| format!("Failed to write workspace config to file: {}", e))?;

    Ok(())
}
