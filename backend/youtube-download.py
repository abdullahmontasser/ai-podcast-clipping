import subprocess
import os

# Configuration
url = "https://www.youtube.com/watch?v=pJ0auP7dbcY"
output_name = "yasser_alhazimi_20min.mp4"
start_time = "00:00:00"
end_time = "00:20:00"

# The command
# --download-sections: Tell yt-dlp to only grab a specific part
# -f: select best video (up to 1080p) and best audio
command = [
    "yt-dlp",
    "--download-sections", f"*{start_time}-{end_time}",
    "-f", "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
    "--merge-output-format", "mp4",
    "--force-keyframes-at-cuts", # Ensures the cut starts exactly at 00:00:00
    url,
    "-o", output_name
]

try:
    print(f"Starting partial download: {start_time} to {end_time}...")
    subprocess.run(command, check=True)
    print(f"\nSuccess! File saved as: {os.path.abspath(output_name)}")
except subprocess.CalledProcessError as e:
    print(f"\nAn error occurred: {e}")
except FileNotFoundError:
    print("\nError: yt-dlp or ffmpeg not found. Make sure both are installed and in your PATH.")
