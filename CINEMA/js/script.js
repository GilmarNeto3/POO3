// =============================================
// CINESYSTEM - script.js
// Arquivo único com todo o JavaScript do sistema
// =============================================


// =============================================
// CADASTRO DE FILMES
// =============================================

function salvarFilme() {
  var titulo = document.getElementById('titulo').value.trim();
  var genero = document.getElementById('genero').value;
  var descricao = document.getElementById('descricao').value.trim();
  var classificacao = document.getElementById('classificacao').value;
  var duracao = document.getElementById('duracao').value;
  var estreia = document.getElementById('estreia').value;

  if (!titulo || !genero || !classificacao || !duracao || !estreia) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  var filme = {
    id: Date.now(),
    titulo: titulo,
    genero: genero,
    descricao: descricao,
    classificacao: classificacao,
    duracao: duracao,
    estreia: estreia
  };

  var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
  filmes.push(filme);
  localStorage.setItem('filmes', JSON.stringify(filmes));

  document.getElementById('msgSucesso').classList.remove('d-none');
  setTimeout(function () {
    document.getElementById('msgSucesso').classList.add('d-none');
  }, 3000);

  document.getElementById('titulo').value = '';
  document.getElementById('genero').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('classificacao').value = '';
  document.getElementById('duracao').value = '';
  document.getElementById('estreia').value = '';

  exibirFilmes();
}

function exibirFilmes() {
  var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
  var tbody = document.getElementById('tabelaFilmes');
  tbody.innerHTML = '';

  if (filmes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-secondary">Nenhum filme cadastrado ainda.</td></tr>';
    return;
  }

  for (var i = 0; i < filmes.length; i++) {
    var f = filmes[i];
    var dataFormatada = f.estreia ? f.estreia.split('-').reverse().join('/') : '-';
    var linha = '<tr>';
    linha += '<td>' + (i + 1) + '</td>';
    linha += '<td>' + f.titulo + '</td>';
    linha += '<td>' + f.genero + '</td>';
    linha += '<td>' + f.classificacao + '</td>';
    linha += '<td>' + f.duracao + ' min</td>';
    linha += '<td>' + dataFormatada + '</td>';
    linha += '<td><button class="btn btn-outline-danger btn-sm" onclick="excluirFilme(' + f.id + ')"><i class="bi bi-trash"></i></button></td>';
    linha += '</tr>';
    tbody.innerHTML += linha;
  }
}

function excluirFilme(id) {
  if (!confirm('Tem certeza que deseja excluir este filme?')) return;
  var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
  filmes = filmes.filter(function (f) { return f.id !== id; });
  localStorage.setItem('filmes', JSON.stringify(filmes));
  exibirFilmes();
}


// =============================================
// CADASTRO DE SALAS
// =============================================

function salvarSala() {
  var nome = document.getElementById('nome').value.trim();
  var capacidade = document.getElementById('capacidade').value;
  var tipo = document.getElementById('tipo').value;

  if (!nome || !capacidade || !tipo) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  var sala = {
    id: Date.now(),
    nome: nome,
    capacidade: capacidade,
    tipo: tipo
  };

  var salas = JSON.parse(localStorage.getItem('salas')) || [];
  salas.push(sala);
  localStorage.setItem('salas', JSON.stringify(salas));

  document.getElementById('msgSucesso').classList.remove('d-none');
  setTimeout(function () {
    document.getElementById('msgSucesso').classList.add('d-none');
  }, 3000);

  document.getElementById('nome').value = '';
  document.getElementById('capacidade').value = '';
  document.getElementById('tipo').value = '';

  exibirSalas();
}

function exibirSalas() {
  var salas = JSON.parse(localStorage.getItem('salas')) || [];
  var tbody = document.getElementById('tabelaSalas');
  tbody.innerHTML = '';

  if (salas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-secondary">Nenhuma sala cadastrada ainda.</td></tr>';
    return;
  }

  for (var i = 0; i < salas.length; i++) {
    var s = salas[i];
    var linha = '<tr>';
    linha += '<td>' + (i + 1) + '</td>';
    linha += '<td>' + s.nome + '</td>';
    linha += '<td>' + s.capacidade + ' lugares</td>';
    linha += '<td>' + s.tipo + '</td>';
    linha += '<td><button class="btn btn-outline-danger btn-sm" onclick="excluirSala(' + s.id + ')"><i class="bi bi-trash"></i></button></td>';
    linha += '</tr>';
    tbody.innerHTML += linha;
  }
}

function excluirSala(id) {
  if (!confirm('Tem certeza que deseja excluir esta sala?')) return;
  var salas = JSON.parse(localStorage.getItem('salas')) || [];
  salas = salas.filter(function (s) { return s.id !== id; });
  localStorage.setItem('salas', JSON.stringify(salas));
  exibirSalas();
}


// =============================================
// CADASTRO DE SESSÕES
// =============================================

function carregarFilmes() {
  var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
  var select = document.getElementById('filmeId');

  if (filmes.length === 0) {
    document.getElementById('msgAviso').classList.remove('d-none');
    return;
  }

  for (var i = 0; i < filmes.length; i++) {
    var option = document.createElement('option');
    option.value = filmes[i].id;
    option.textContent = filmes[i].titulo;
    select.appendChild(option);
  }
}

function carregarSalas() {
  var salas = JSON.parse(localStorage.getItem('salas')) || [];
  var select = document.getElementById('salaId');

  for (var i = 0; i < salas.length; i++) {
    var option = document.createElement('option');
    option.value = salas[i].id;
    option.textContent = salas[i].nome + ' (' + salas[i].tipo + ')';
    select.appendChild(option);
  }
}

function salvarSessao() {
  var filmeId = document.getElementById('filmeId').value;
  var salaId = document.getElementById('salaId').value;
  var dataHora = document.getElementById('dataHora').value;
  var preco = document.getElementById('preco').value;
  var idioma = document.getElementById('idioma').value;
  var formato = document.getElementById('formato').value;

  if (!filmeId || !salaId || !dataHora || !preco || !idioma || !formato) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
  var salas = JSON.parse(localStorage.getItem('salas')) || [];
  var filme = filmes.find(function (f) { return f.id == filmeId; });
  var sala = salas.find(function (s) { return s.id == salaId; });

  var sessao = {
    id: Date.now(),
    filmeId: filmeId,
    filmeTitulo: filme ? filme.titulo : 'Desconhecido',
    salaId: salaId,
    salaNome: sala ? sala.nome : 'Desconhecida',
    dataHora: dataHora,
    preco: preco,
    idioma: idioma,
    formato: formato
  };

  var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
  sessoes.push(sessao);
  localStorage.setItem('sessoes', JSON.stringify(sessoes));

  document.getElementById('msgSucesso').classList.remove('d-none');
  setTimeout(function () {
    document.getElementById('msgSucesso').classList.add('d-none');
  }, 3000);

  document.getElementById('filmeId').value = '';
  document.getElementById('salaId').value = '';
  document.getElementById('dataHora').value = '';
  document.getElementById('preco').value = '';
  document.getElementById('idioma').value = '';
  document.getElementById('formato').value = '';

  exibirSessoes();
}

function exibirSessoes() {
  var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
  var tbody = document.getElementById('tabelaSessoes');
  tbody.innerHTML = '';

  if (sessoes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center text-secondary">Nenhuma sessão cadastrada ainda.</td></tr>';
    return;
  }

  for (var i = 0; i < sessoes.length; i++) {
    var s = sessoes[i];
    var dt = s.dataHora ? s.dataHora.replace('T', ' ') : '-';
    var linha = '<tr>';
    linha += '<td>' + (i + 1) + '</td>';
    linha += '<td>' + s.filmeTitulo + '</td>';
    linha += '<td>' + s.salaNome + '</td>';
    linha += '<td>' + dt + '</td>';
    linha += '<td>R$ ' + parseFloat(s.preco).toFixed(2) + '</td>';
    linha += '<td>' + s.idioma + '</td>';
    linha += '<td>' + s.formato + '</td>';
    linha += '<td><button class="btn btn-outline-danger btn-sm" onclick="excluirSessao(' + s.id + ')"><i class="bi bi-trash"></i></button></td>';
    linha += '</tr>';
    tbody.innerHTML += linha;
  }
}

function excluirSessao(id) {
  if (!confirm('Tem certeza que deseja excluir esta sessão?')) return;
  var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
  sessoes = sessoes.filter(function (s) { return s.id !== id; });
  localStorage.setItem('sessoes', JSON.stringify(sessoes));
  exibirSessoes();
}


// =============================================
// LISTAGEM DE SESSÕES DISPONÍVEIS (sessoes.html)
// =============================================

function exibirCardsSessoes() {
  var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
  var container = document.getElementById('listaSessoes');
  container.innerHTML = '';

  if (sessoes.length === 0) {
    document.getElementById('semSessoes').classList.remove('d-none');
    return;
  }

  for (var i = 0; i < sessoes.length; i++) {
    var s = sessoes[i];
    var dt = s.dataHora ? s.dataHora.replace('T', ' ') : '-';

    var col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6';
    col.innerHTML =
      '<div class="card h-100 p-3">' +
        '<div class="d-flex justify-content-between align-items-start mb-2">' +
          '<h5 class="mb-0" style="color:#e94560;">' + s.filmeTitulo + '</h5>' +
          '<span class="badge badge-custom">' + s.formato + '</span>' +
        '</div>' +
        '<div class="mb-1"><span class="info-label"><i class="bi bi-building"></i> Sala:</span> <span class="info-value">' + s.salaNome + '</span></div>' +
        '<div class="mb-1"><span class="info-label"><i class="bi bi-clock"></i> Data/Hora:</span> <span class="info-value">' + dt + '</span></div>' +
        '<div class="mb-1"><span class="info-label"><i class="bi bi-translate"></i> Idioma:</span> <span class="info-value">' + s.idioma + '</span></div>' +
        '<div class="mt-2 mb-3"><span class="preco">R$ ' + parseFloat(s.preco).toFixed(2) + '</span></div>' +
        '<a href="venda-ingressos.html" class="btn btn-custom" onclick="selecionarSessao(' + s.id + ')">' +
          '<i class="bi bi-ticket-perforated"></i> Comprar Ingresso' +
        '</a>' +
      '</div>';

    container.appendChild(col);
  }
}

function selecionarSessao(id) {
  localStorage.setItem('sessaoSelecionada', id);
}


// =============================================
// VENDA DE INGRESSOS
// =============================================

function carregarSessoes() {
  var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
  var select = document.getElementById('sessaoId');

  for (var i = 0; i < sessoes.length; i++) {
    var s = sessoes[i];
    var dt = s.dataHora ? s.dataHora.replace('T', ' ') : '';
    var option = document.createElement('option');
    option.value = s.id;
    option.textContent = s.filmeTitulo + ' | ' + s.salaNome + ' | ' + dt;
    select.appendChild(option);
  }
}

function confirmarVenda() {
  var sessaoId = document.getElementById('sessaoId').value;
  var nomeCliente = document.getElementById('nomeCliente').value.trim();
  var cpf = document.getElementById('cpf').value.trim();
  var assento = document.getElementById('assento').value.trim();
  var pagamento = document.getElementById('pagamento').value;

  if (!sessaoId || !nomeCliente || !cpf || !assento || !pagamento) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  var selectSessao = document.getElementById('sessaoId');
  var sessaoTexto = selectSessao.options[selectSessao.selectedIndex].text;

  var ingresso = {
    id: Date.now(),
    sessaoId: sessaoId,
    sessaoTexto: sessaoTexto,
    nomeCliente: nomeCliente,
    cpf: cpf,
    assento: assento,
    pagamento: pagamento
  };

  var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
  ingressos.push(ingresso);
  localStorage.setItem('ingressos', JSON.stringify(ingressos));

  document.getElementById('msgSucesso').classList.remove('d-none');
  setTimeout(function () {
    document.getElementById('msgSucesso').classList.add('d-none');
  }, 3000);

  document.getElementById('sessaoId').value = '';
  document.getElementById('nomeCliente').value = '';
  document.getElementById('cpf').value = '';
  document.getElementById('assento').value = '';
  document.getElementById('pagamento').value = '';

  exibirIngressos();
}

function exibirIngressos() {
  var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
  var tbody = document.getElementById('tabelaIngressos');
  tbody.innerHTML = '';

  if (ingressos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-secondary">Nenhum ingresso vendido ainda.</td></tr>';
    return;
  }

  for (var i = 0; i < ingressos.length; i++) {
    var ing = ingressos[i];
    var linha = '<tr>';
    linha += '<td>' + (i + 1) + '</td>';
    linha += '<td>' + ing.sessaoTexto + '</td>';
    linha += '<td>' + ing.nomeCliente + '</td>';
    linha += '<td>' + ing.cpf + '</td>';
    linha += '<td>' + ing.assento + '</td>';
    linha += '<td>' + ing.pagamento + '</td>';
    linha += '<td><button class="btn btn-outline-danger btn-sm" onclick="excluirIngresso(' + ing.id + ')"><i class="bi bi-trash"></i></button></td>';
    linha += '</tr>';
    tbody.innerHTML += linha;
  }
}

function excluirIngresso(id) {
  if (!confirm('Tem certeza que deseja cancelar este ingresso?')) return;
  var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
  ingressos = ingressos.filter(function (ing) { return ing.id !== id; });
  localStorage.setItem('ingressos', JSON.stringify(ingressos));
  exibirIngressos();
}


// =============================================
// INICIALIZAÇÃO — detecta qual página está aberta
// e chama as funções certas
// =============================================

window.onload = function () {

  // Página: cadastro-filmes.html
  if (document.getElementById('tabelaFilmes')) {
    exibirFilmes();
  }

  // Página: cadastro-salas.html
  if (document.getElementById('tabelaSalas')) {
    exibirSalas();
  }

  // Página: cadastro-sessoes.html
  if (document.getElementById('tabelaSessoes')) {
    carregarFilmes();
    carregarSalas();
    exibirSessoes();
  }

  // Página: sessoes.html
  if (document.getElementById('listaSessoes')) {
    exibirCardsSessoes();
  }

  // Página: venda-ingressos.html
  if (document.getElementById('tabelaIngressos')) {
    carregarSessoes();
    exibirIngressos();

    // Se veio da página de Programação com sessão já escolhida, pré-seleciona
    var sessaoPreSelecionada = localStorage.getItem('sessaoSelecionada');
    if (sessaoPreSelecionada) {
      document.getElementById('sessaoId').value = sessaoPreSelecionada;
      localStorage.removeItem('sessaoSelecionada');
    }
  }

};
