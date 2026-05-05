// proteção da página
if (localStorage.getItem("logado") !== "true") {
  window.location.href = "login.html";
}

// mostrar nome do usuário
const nome = localStorage.getItem("usuario");
if (nome) {
  document.getElementById("nomeUsuario").innerText = nome;
}

// criar post
function criarPost() {
  const input = document.getElementById("postTexto");
  const texto = input.value.trim();

  if (!texto) return;

  const usuario = localStorage.getItem("usuario");

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({
    user: usuario,
    texto: texto,
    likes: 0,
    likedBy: []
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  input.value = "";

  mostrarPosts();
}

// mostrar posts
function mostrarPosts() {
  const lista = document.getElementById("posts");
  lista.innerHTML = "";

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const usuario = localStorage.getItem("usuario");

  posts.reverse().forEach((p, index) => {
    const realIndex = posts.length - 1 - index;

    const jaCurtiu = p.likedBy.includes(usuario);

    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <strong>${p.user}:</strong> ${p.texto}
      <br>
      <button onclick="curtirPost(${realIndex})" 
        ${jaCurtiu ? "disabled" : ""}>
        ❤️ ${p.likes} ${jaCurtiu ? "(curtido)" : ""}
      </button>
    `;

    lista.appendChild(div);
  });
}

mostrarPosts();

// logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// vagas
const vagas = [
  { titulo: "Dev Front-end", empresa: "Inclusiva Tech" },
  { titulo: "Analista de RH Inclusivo", empresa: "Diversidade S.A." },
  { titulo: "UX Designer", empresa: "Acessibilidade Digital" }
];

const vagasDiv = document.getElementById("listaVagas");

vagas.forEach(v => {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `<strong>${v.titulo}</strong><p>${v.empresa}</p>`;
  vagasDiv.appendChild(div);
});

function curtirPost(index) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const usuario = localStorage.getItem("usuario");

  const post = posts[index];

  // impede curtir novamente
  if (post.likedBy.includes(usuario)) {
    alert("Você já curtiu esse post!");
    return;
  }

  post.likes++;
  post.likedBy.push(usuario);

  localStorage.setItem("posts", JSON.stringify(posts));

  mostrarPosts();
}