async function loadFiles() {
  const res = await fetch("/files");
  const files = await res.json();
  const list = document.getElementById("fileList");
  list.innerHTML = "";

  if (files.length === 0) {
    list.innerHTML = "<li>No files uploaded yet.</li>";
    return;
  }

  files.forEach(file => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="/download/${file}">${file}</a>`;
    list.appendChild(li);
  });
}

loadFiles();