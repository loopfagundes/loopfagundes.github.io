'use strict';

const botoes = document.querySelectorAll('nav button');
const paineis = document.querySelectorAll('.panel');

function mostrar(id) {
  if (!document.getElementById(id)) id = 'sobre';

  paineis.forEach((painel) => {
    const ativo = painel.id === id;
    painel.classList.toggle('active', ativo);
    if (ativo) painel.scrollTop = 0;
  });

  botoes.forEach((botao) => {
    if (botao.dataset.target === id) botao.setAttribute('aria-current', 'page');
    else botao.removeAttribute('aria-current');
  });
}

botoes.forEach((botao) => {
  botao.addEventListener('click', () => {
    mostrar(botao.dataset.target);
    history.replaceState(null, '', '#' + botao.dataset.target);
  });
});

window.addEventListener('hashchange', () => mostrar(location.hash.slice(1)));
mostrar(location.hash.slice(1) || 'sobre');
