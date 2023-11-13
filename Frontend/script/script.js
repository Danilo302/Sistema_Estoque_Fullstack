const modal = document.querySelector('.modalContainer')
const modalDel = document.querySelector('.modalDelete')
const modalAlterar = document.querySelector('.modalAlterar')
const tbody = document.querySelector('tbody')

const AlProd = document.querySelector('#Aprod')
const AlQtd = document.querySelector('#Aqtd')
const AlPreco = document.querySelector('#Apreco')

const btSalvar = document.querySelector('#btsalvar')

const fetchProd = async () => {
    const res = await (await fetch("http://localhost:3000/")).json()
    console.log(res)
    return res

};

//Tela de modal para adicionar produto
function openModal(edit = false, index = 0) {
    modal.classList.add('ativo')


}
//Conexao com API e Criando novo produto
async function salvar() {
    const sProd = document.querySelector('#prod').value
    const sQtd = document.querySelector('#qtd').value
    const sPreco = document.querySelector('#preco').value

    const newDate = { nome_produto: sProd, quantidade: sQtd, preco: sPreco }

    console.log(JSON.stringify(newDate))

    if (sProd == undefined || sQtd == 0 || sPreco == 0) {
        alert('Algum campo inválido!')
    } else {
        await fetch('http://localhost:3000/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDate)



        })

        alert('registrado com sucesso')
        modal.classList.remove('ativo')


    }
}

//Tela de confirmação para Delete
function openDelete(id) {
    modalDel.classList.add('ativo')

    const btConfirmeDel = document.querySelector('#btdelete')
    btConfirmeDel.onclick = () => {
        deletarPro(id)
    }


}

//Conexão com API e Deletando
async function deletarPro(id) {
    await fetch(`http://localhost:3000/${id}`, {
        method: 'delete',


    })
    alert('Produto deletado com sucesso!')
    FecharModal(modalDel)
}

// função para fechar a tela de delete
function FecharModal(modal) {
    modal.classList.remove('ativo')
}

//Tela de Alterar produto
function openAlterar(id, nome, quantidade, preco) {
    modalAlterar.classList.add('ativo')
    AlProd.value = nome
    AlQtd.value = quantidade
    AlPreco.value = preco

    const btalterar = document.querySelector('#btalterar')
    btalterar.onclick = () => {
        Alterar(id)
    }

}

//Conexao com API e ALterar dado
async function Alterar(id) {

    const newProd = document.querySelector('#Aprod').value
    const newQtd = document.querySelector('#Aqtd').value
    const newPreco = document.querySelector('#Apreco').value

    const newDate = {id: id, nome_produto: newProd, quantidade: newQtd, preco: newPreco }
    
    if (newProd == undefined || newQtd == 0 || newPreco == 0) {
        alert('Algum campo inválido!')
    } else {
        await fetch(`http://localhost:3000/${id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDate)



        })

        alert('Alterado com sucesso')
        modalAlterar.classList.remove('ativo')


    }
}





function criarTag(tag, innerText = '', innerHTML = '') {
    const element = document.createElement(tag)

    if (innerText) {
        element.innerText = innerText;

    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element
}

function criarLinhas(produto) {

    const { id, nome_produto, quantidade, preco } = produto

    const tr = criarTag('tr');
    const tdId = criarTag('td', id)
    const tdNome = criarTag('td', nome_produto);
    const tdQtd = criarTag('td', quantidade);
    const tdPreco = criarTag('td', preco);

    const b_excluir = criarTag('button', '', '<i class="gg-trash"></i>')
    const b_edit = criarTag('button', '', '<i class="gg-pen"></i>')
    const b_venda = criarTag('button', '', '<i class="gg-dollar"></i>')
    const div_b = criarTag('div', '', '')

    b_excluir.id = 'del'
    b_excluir.onclick = () => {
        openDelete(id)
    }

    b_edit.id = 'edi'
    b_edit.onclick = () => {
        openAlterar(id, nome_produto, quantidade, preco)
    }
    b_venda.id = 'venda'

    div_b.appendChild(b_venda)
    div_b.appendChild(b_edit)
    div_b.appendChild(b_excluir)
    div_b.id = 'buttonAcao'


    tr.appendChild(tdId)
    tr.appendChild(tdNome);
    tr.appendChild(tdQtd);
    tr.appendChild(tdPreco);
    tr.appendChild(div_b);
    //tr.appendChild(b_edit);
    //tr.appendChild(b_excluir)

    tbody.appendChild(tr)


}



function readPro() {
    (async () => {
        const produtos = await fetchProd();
        produtos.forEach(produto => criarLinhas(produto));
    })()
};
readPro()
