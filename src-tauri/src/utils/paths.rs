use std::path::PathBuf;
use std::fs;

pub fn get_workspace_file_path(workspace_dir: &PathBuf) -> Result<PathBuf, String> {
    let path = workspace_dir.join("snapkeeper_config.json");

    // Check if the directory exists and create it if it doesn't
    if !workspace_dir.exists() {
        fs::create_dir_all(workspace_dir)
            .map_err(|e| format!("Failed to create directory {}: {}", workspace_dir.display(), e))?;
    }

    Ok(path)
}
