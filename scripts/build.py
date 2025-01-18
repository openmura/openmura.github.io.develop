import subprocess
import os

def get_commit_sha():
    return subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD']).decode('utf-8').strip()

def update_html(file_path, sha):
    try:
        with open(file_path, 'r') as file:
            content = file.read()
        content = content.replace('{{commit_sha}}', sha)
        with open(file_path, 'w') as file:
            file.write(content)
        print(f"Updated {file_path} with commit SHA.")
    except Exception as e:
        print(f"Error updating {file_path}: {e}")

def update_all_html_files(directory, sha):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            file_path = os.path.join(directory, filename)
            update_html(file_path, sha)

if __name__ == "__main__":
    sha = get_commit_sha()
    directory = '.'
    update_all_html_files(directory, sha)