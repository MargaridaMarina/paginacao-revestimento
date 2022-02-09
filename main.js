
  
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('perda-revs:calc')) || {} //pegar
  },
  set(perdas) {
    //perdas é argumento que passa para o set salvar - chave
    localStorage.setItem('perda-revs:calc', JSON.stringify(perdas)) //colocar
  }
}

function adicionaEventos(elementoRecebidoPeloArgumentoDaFuncao) {
  const tdNomeA = elementoRecebidoPeloArgumentoDaFuncao.querySelector('#nome-a')
  const tdCompA = elementoRecebidoPeloArgumentoDaFuncao.querySelector('#comp-a')
  const tdLargA = elementoRecebidoPeloArgumentoDaFuncao.querySelector('#larg-a')
  const tdCompR = elementoRecebidoPeloArgumentoDaFuncao.querySelector('#comp-r')
  const tdLargR = elementoRecebidoPeloArgumentoDaFuncao.querySelector('#larg-r')
  const tdPerda =
    elementoRecebidoPeloArgumentoDaFuncao.querySelector('#perda-extra')
  const button = elementoRecebidoPeloArgumentoDaFuncao.querySelector('.button')

  function atualizarAreaReal(areaReal = 0) {
    elementoRecebidoPeloArgumentoDaFuncao.querySelector(
      '#area-real'
    ).innerHTML = areaReal.toFixed(2)
  }

  function atualizarAreaCompra(areaCompra = 0) {
    elementoRecebidoPeloArgumentoDaFuncao.querySelector(
      '#area-compra'
    ).innerHTML = areaCompra.toFixed(2)
  }

  function atualizarPerdaCalculada(perdaCalculada = 0) {
    elementoRecebidoPeloArgumentoDaFuncao.querySelector(
      '#perda-calculada'
    ).innerHTML = perdaCalculada.toFixed(2)
  }

  button.addEventListener('click', () => {
    const pedrasInteiras =
      Math.floor(tdCompA.value / tdCompR.value) *
      Math.floor(tdLargA.value / tdLargR.value)
    const pedrasCortadas =
      Math.floor(tdCompA.value / tdCompR.value) +
      Math.floor(tdLargA.value / tdLargR.value) +
      1

    const areaReal = tdCompA.value * tdLargA.value

    const areaCompra =
      (pedrasInteiras + pedrasCortadas / 2) *
      (1 + tdPerda.value / 100) *
      tdCompR.value *
      tdLargR.value

    const perdaCalculada = areaCompra / areaReal

    const valores = {
      nomeA: tdNomeA.value,
      compA: Number(tdCompA.value),
      largA: Number(tdLargA.value),
      compR: Number(tdCompR.value),
      largR: Number(tdLargR.value),
      perda: Number(tdPerda.value),
      areaReal,
      areaCompra,
      perdaCalculada
    }

    Storage.set(valores)

    atualizarAreaReal(areaReal)
    atualizarAreaCompra(areaCompra)
    atualizarPerdaCalculada(perdaCalculada)
  })

  function armazenar() {
    const valorSalvoAnteriormente = Storage.get() || {}
    tdNomeA.value = valorSalvoAnteriormente.nomeA || null
    tdCompA.value = valorSalvoAnteriormente.compA || null
    tdCompR.value = valorSalvoAnteriormente.compR || null
    tdLargA.value = valorSalvoAnteriormente.largA || null
    tdLargR.value = valorSalvoAnteriormente.largR || null
    tdPerda.value = valorSalvoAnteriormente.perda || null

    atualizarAreaReal(valorSalvoAnteriormente.areaReal)
    atualizarAreaCompra(valorSalvoAnteriormente.areaCompra)
    atualizarPerdaCalculada(valorSalvoAnteriormente.perdaCalculada)
  }
  armazenar() //escrevendo no input o valor = popular



  elementoRecebidoPeloArgumentoDaFuncao
    .querySelector('.adicionar')
    .addEventListener('click', () => {
      const card = document.querySelector('.card')
      let newCard = card.cloneNode(true)
      card.after(newCard)
      adicionaEventos(newCard)
    })

  
}

adicionaEventos(document)
