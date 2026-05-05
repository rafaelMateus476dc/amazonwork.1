function login() {
  const user = document.getElementById("username").value.trim();

  if (!user) {
    document.getElementById("erro").innerText = "Digite um nome";
    return;
  }

  // login livre
  localStorage.setItem("logado", "true");
  localStorage.setItem("usuario", user);

  window.location.href = "index.html";
}