fetch("build_number.txt")
    .then(response => response.text())
    .then(buildNumber => {
        document.getElementById("build-number").innerText = buildNumber;
    })
    .catch(err => {
        document.getElementById("build-number").innerText = "Error loading build number";
        console.error(err);
    });