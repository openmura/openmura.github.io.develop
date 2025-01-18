import subprocess

def get_commit_sha():
    try:
        result = subprocess.run(["git", "rev-parse", "--short", "HEAD"], stdout=subprocess.PIPE, check=True)
        return result.stdout.decode("utf-8").strip()
    except subprocess.CalledProcessError:
        return "unknown"

html_file = "index.html"
with open(html_file, "r") as file:
    content = file.read()

commit_sha = get_commit_sha()
updated_content = content.replace("Loading...", commit_sha)

with open(html_file, "w") as file:
    file.write(updated_content)

print(f"Updated HTML with commit SHA: {commit_sha}")