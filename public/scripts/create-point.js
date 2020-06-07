
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") //seleciona um elemento na pagina(documento)

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json()) //função anonima de forma resumida
    .then(states => {

        for (const state of states) { //for de forma resumida
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()


function getCities(event) {

    const citySelect = document.querySelector("[name=city]") 
    const stateInput = document.querySelector("[name=state]") 

    let ufValue = event.target.value //pega o uf selecionado vendo o evento


    const indexOfSelectState = event.target.selectedIndex 
    stateInput.value = event.target.options[indexOfSelectState].text //passa o nome do estado selecionado para uma const

    
    /*limpa o campo de cidade sempre que muda o estado*/
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true 

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(res => res.json()) //função anonima de forma resumida
    .then(cities => {


        for (const city of cities) { //for de forma resumida
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })

}




 document
    .querySelector("select[name=uf]") //seleciona um elemento na pagina(documento)
    .addEventListener("change", getCities) 

/*items de coleta*/
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li"); 
//adiciona todos os elementos presentes nessa parte do documento a essa const



for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem) 
    //executa esse função sempre que há um click em itemsToColete
}



let selectedItens = []

const collectedItems = document.querySelector("input[name=items]")


function handleSelectedItem(event) {

    const itemLi = event.target //pega o elemento que foi clicado
   
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected") //toggle = remove se tiver e adiciona se não tiver

    const itemId = itemLi.dataset.id //passa o id do pra const

    //lógica pra armazenar os items selecionados
    //verifica se tá se tem algum selecionado, se sim armazena
    //findIndex = pega o index do item no array

    const alreadySelected = selectedItens.findIndex( item => { 
        //resumida (item => itemFound = item == itemId)
        const itemFound = item == itemId //boolean
        return itemFound //roda até retornar true
    })

    //se já tiver selecionado, tira da seleção
    if (alreadySelected >= 0) { 
        //0 = true(selecionado), -1 = false
        const filteredItems = selectedItens.filter(item => {  
            const itemIsDifferent = item != itemId  //retorna false (-1)
            return itemIsDifferent 
        })

        selectedItens = filteredItems //adiciona os itens filtrados ao array
    }
    else {
        selectedItens.push(itemId) //adiona o item ao array quando não ta selecionado
    }

    
    collectedItems.value = selectedItens

}
