const form = document.getElementById("apiForm");
const responseDiv = document.getElementById("response");
const baseUrl = "https://fordemo-ot4j.onrender.com";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const method = document.getElementById("method").value;
  const endpoint = document.getElementById("endpoint").value.trim();

  let url = baseUrl + endpoint;

  let options = { 
    method, 
    headers: { "Content-Type": "application/json" } 
  };

  if (method !== "GET") {
    options.body = JSON.stringify({ username, password });
  }

  try {
    const res = await fetch(url, options);
    const text = await res.text(); 
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text; 
    }
    responseDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (err) {
    responseDiv.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
  }
});
