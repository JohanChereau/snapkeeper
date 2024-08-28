use std::fs;
use crate::workspace::config::WorkspaceConfig;
use crate::utils::paths::get_workspace_config_file_path;

pub fn save_workspace_config(config: WorkspaceConfig) -> Result<(), String> {
    // Get the path to the configuration file in the .snapkeeper directory within the workspace directory
    let file_path = get_workspace_config_file_path(&config.location, &config.name)?;

    // Serialize the config to JSON format
    let json_data = serde_json::to_string_pretty(&config)
        .map_err(|e| format!("Failed to serialize workspace config: {}", e))?;

    // Write the serialized config to the specified file
    fs::write(&file_path, json_data)
        .map_err(|e| format!("Failed to write workspace config to file: {}", e))?;

    Ok(())
}
