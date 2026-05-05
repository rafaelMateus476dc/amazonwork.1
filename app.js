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
  const texto = document.getElementById("postTexto").value.trim();
  const fileInput = document.getElementById("imagem");
  const file = fileInput.files[0];

  if (!texto && !file) return;

  const usuario = localStorage.getItem("usuario");

  const reader = new FileReader();

  reader.onload = function () {
    const imagemBase64 = reader.result;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.push({
      user: usuario,
      texto: texto,
      imagem: imagemBase64
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("postTexto").value = "";
    fileInput.value = "";

    mostrarPosts();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onload(); // post só texto
  }
}

// mostrar posts
function mostrarPosts() {
  const feed = document.getElementById("posts");
  feed.innerHTML = "";

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const usuario = localStorage.getItem("usuario");

  posts.reverse().forEach((p, index) => {
    const realIndex = posts.length - 1 - index;

    const jaCurtiu = p.likedBy?.includes(usuario);

    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <strong>${p.user}</strong>
      <p>${p.texto}</p>

      ${p.imagem ? `<img src="${p.imagem}" class="post-img">` : ""}

      <br>
      <button onclick="curtirPost(${realIndex})"
        ${jaCurtiu ? "disabled" : ""}>
        ❤️ ${p.likes || 0}
      </button>
    `;

    feed.appendChild(div);
  });
}

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
