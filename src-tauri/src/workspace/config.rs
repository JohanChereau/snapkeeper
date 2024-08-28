use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct WorkspaceConfig {
    pub name: String,
    pub description: Option<String>,
    pub location: String,
    #[serde(rename = "yearFormat")]
    pub year_format: String,
    #[serde(rename = "monthFormat")]
    pub month_format: String,
    pub language: String,
    #[serde(rename = "excludeExtensions")]
    pub exclude_extensions: Option<String>,
}
