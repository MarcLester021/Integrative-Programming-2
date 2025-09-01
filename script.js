const form = document.getElementById("apiForm"); 
const responseDiv = document.getElementById("response");
const baseUrl = "https://fordemo-ot4j.onrender.com";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const method = document.getElementById("method").value;
  const endpoint = document.getElementById("endpoint").value.trim();

  let url = baseUrl + endpoint;

  // Default fetch options
  let options = { 
    method,
    headers: { "Content-Type": "application/json" }
  };

  // Decide when to attach a request body
  if (method === "POST") {
    options.body = JSON.stringify({ username, password });
  } else if (method === "PATCH") {
    options.body = JSON.stringify({ username, password }); 
    // 👆 adjust fields depending on what your API expects to be updated
  }
  // For DELETE: many APIs don’t need a body, so skip it
  // For GET: body is not allowed (your code already handles this)

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
