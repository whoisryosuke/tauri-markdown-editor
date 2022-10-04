#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use comrak::{markdown_to_html, ComrakOptions};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(markdown: &str) -> String {
    // format!("Hello, {}! You've been greeted from Rust!", name)

    let parsed_markdown = markdown_to_html(&markdown, &ComrakOptions::default());

    println!("Markdown parsed into HTML \n");
    println!("{parsed_markdown}");

    parsed_markdown
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
