use std::path::PathBuf;
use std::fs;

// Constants for configuration
pub const CONFIG_DIR_NAME: &str = ".snapkeeper";
pub const CONFIG_FILE_NAME: &str = "snapkeeper_config.json";

// Constructs the path for the configuration file inside the workspace
pub fn get_workspace_config_file_path(workspace_location: &str, workspace_name: &str) -> Result<PathBuf, String> {
    // Construct the path to the workspace directory
    let workspace_path = PathBuf::from(workspace_location).join(workspace_name);

    // Construct the full path to the configuration file inside the .snapkeeper directory
    let config_path = workspace_path.join(CONFIG_DIR_NAME).join(CONFIG_FILE_NAME);

    // Ensure the workspace and .snapkeeper directories exist, and create them if they don't
    if let Some(config_dir) = config_path.parent() {
        if !config_dir.exists() {
            fs::create_dir_all(config_dir).map_err(|e| {
                format!(
                    "Failed to create configuration directory {}: {}",
                    config_dir.display(),
                    e
                )
            })?;
        }
    }

    Ok(config_path)
}
