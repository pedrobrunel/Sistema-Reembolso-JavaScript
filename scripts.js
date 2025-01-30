const formulario = document.querySelector("form")
const valorDaDespesa = document.getElementById("valorDespesa")
const nomeDaDespesa = document.getElementById("nomeDespesa")
const categoriaDaDespesa = document.getElementById("categoriaDespesa")

const listaDespesa = document.querySelector("ul")

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
        mostraCategoriaDespesa.textContent = novaDespesa.categoriaDaDespesa

        //adiciona nome e categoria na div
        infoDespesa.append(mostraNomeDespesa, mostraCategoriaDespesa)
        itemDespesa.append(iconeDespesa, infoDespesa)

        listaDespesa.append(itemDespesa)


    } catch (error){
        alert("Não foi possível enviar")
        console.log(error)
    }
}
