const formulario = document.querySelector("form")
const valorDaDespesa = document.getElementById("valorDespesa")
const nomeDaDespesa = document.getElementById("nomeDespesa")
const categoriaDaDespesa = document.getElementById("categoriaDespesa")

const listaDespesa = document.querySelector("ul")

const quantidadeDeDespesa = document.querySelector("aside header p span")
const valorTotalHeader = document.querySelector("aside header h2")

//oninput observa sempre que alguém digitar algo e dispara o evento
valorDaDespesa.oninput = () => {
    //remover a letra no campo de número utilizando regex
    let valor = valorDaDespesa.value.replace(/\D/g, "")
    // transformar em centavos (150/100 = 1.50)
    valor = Number(valor) / 100

    valorDaDespesa.value = formatarValorDaDespesaBRL(valor)
}

function formatarValorDaDespesaBRL (valor) {
    valor = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    //retorna o valor formatado
    return valor

}

formulario.onsubmit = (evento) => {
    evento.preventDefault() //não atualiza a página quando clica no submit (botão)

    const novaDespesa = {
        id: new Date().getTime(),
        nome: nomeDaDespesa.value,
        idCategoria: categoriaDaDespesa.value,
        nomeCategoria: categoriaDaDespesa.options[categoriaDaDespesa.selectedIndex].text,
        custo: valorDaDespesa.value,
        data: new Date(),
    }

    //chama a função que adiciona na lista
    adicionarDespesa(novaDespesa)
}


function adicionarDespesa (novaDespesa){
    try{

        const itemDespesa = document.createElement("li")
        itemDespesa.classList.add("expense")
        

        //info icone
        const iconeDespesa = document.createElement("img")
        iconeDespesa.setAttribute("src", `img/${novaDespesa.idCategoria}.svg`)
        iconeDespesa.setAttribute("Alt", novaDespesa.nomeCategoria)

        

        //info despesa
        const infoDespesa = document.createElement("div")
        infoDespesa.classList.add("expense-info")

        const mostraNomeDespesa = document.createElement("strong")
        mostraNomeDespesa.textContent = novaDespesa.nome
        const mostraCategoriaDespesa = document.createElement("span")
        mostraCategoriaDespesa.textContent = novaDespesa.nomeCategoria


        const mostrarValorDespesa = document.createElement("span")
        mostrarValorDespesa.classList.add("expense-amount")
        mostrarValorDespesa.innerHTML = `<small>R$</small>${novaDespesa.custo.toUpperCase().replace("R$", "")}`


        const removerIcone = document.createElement("img")
        removerIcone.classList.add("remove-icon")
        removerIcone.setAttribute("src", "img/remove.svg")
        removerIcone.setAttribute("alt", "remover")

        //adiciona nome e categoria na div
        infoDespesa.append(mostraNomeDespesa, mostraCategoriaDespesa, )
        
        itemDespesa.append(iconeDespesa, infoDespesa, mostrarValorDespesa, removerIcone)

        listaDespesa.append(itemDespesa)

        contagemLista()

    } catch (error){
        alert("Não foi possível enviar")
        console.log(error)
    }
    limpaInput()
}

function contagemLista (){
    try{
        const contarLista = listaDespesa.children
        quantidadeDeDespesa.textContent = `${contarLista.length} ${contarLista.length > 1 ? "despesas" : "despesa"}`


        let valorTotalSomado = 0

        for(let aux = 0; aux < contarLista.length; aux++){
            const auxDespesa = contarLista[aux].querySelector(".expense-amount")
            //limpa e deixa só caracteres numéricos e troca , por .
            let valorAux = auxDespesa.textContent.replace(/[^\d,]/g, "").replace(",",".")

            valorAux = parseFloat(valorAux)

            if(isNaN(valorAux)){
                return alert("Não foi possível calcular o total, valor não é um número")
            }
            valorTotalSomado += valorAux

        }
        const simboloBRL = document.createElement("small")
        simboloBRL.textContent = "R$"

        valorTotalSomado = formatarValorDaDespesaBRL(valorTotalSomado).toUpperCase().replace("R$", "")
        valorTotalHeader.innerHTML = ""
        valorTotalHeader.append(simboloBRL, valorTotalSomado)
        

    }catch{
        alert("não foi possível atualizar a contagem da lista")
    }
}

//captura o clique na lista

listaDespesa.addEventListener("click", function (evento2){

    if(evento2.target.classList.contains("remove-icon")){
        //pegar a LI pai do clicado
        const itemClicado = evento2.target.closest(".expense")
        itemClicado.remove()
    }

    contagemLista()

})

//limpa o formulário
function limpaInput (){
    valorDaDespesa.value = ""
    nomeDaDespesa.value = ""
    categoriaDaDespesa.value = ""
}