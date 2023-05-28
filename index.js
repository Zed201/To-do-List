const Mais = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const Minus = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
// Letras para a criação dos ids dos to-dos

const to_dos = document.getElementById("todos") //Área que os to-dos vão ficar
const txt = document.getElementById("todoTXT") //Input dos textos dos to-dos

var local = [] // Variável local para armazenar os to-dos colocados no localstorage, servindo como intermediário
const initLocal = JSON.parse(String(localStorage.getItem("todos"))) 
initLocal.forEach((item) => local.push(item))// Pegada dos items no localStorage e passagem deles para a variável

function GenerateID() {
    //gerador de id de 5 caracteres para os to-dos; Imagino que não se tenha necessidade de criar alguma coisa que verifique os ids para não gerar um igual, já que o armazenamento é local e o são 4 dígitos com 26 possibilidades cada
    var id = ""
    do {
        let randi = Math.floor((Math.random() * 2))
         if (randi == 1) {
            id += Mais[Math.floor((Math.random() * 26))]
        } else if (randi == 2)  {
            id += Minus[Math.floor((Math.random() * 26))]
        }
    } while (id.length != 5)
    return id
}

function setAttr(el, atts, vals) {
    //Função para auxiliar a adição de atributos aos elementos criados
    for (let x = 0; x < atts.length; x++) {
        el.setAttribute(atts[x], vals[x]);
    }
}

function TrFeito(e) {
    // Função criada para trocar o estado dos to-dos, de feito(true) para não feito(false)
    local.forEach((item) => {
            if (item.id == e.target.id) {
                if (e.target.checked) {
                    item.feito = "true"
                } else {
                    item.feito = "false"
                }
            }
    })
    localStorage.setItem("todos", JSON.stringify(local)) // Basicamente atualização do loaclStorage
}

function ExcluirTd(Iid, e) {
    // FUnção que vai ser atrelada ao botão de excluir cada to-do
    let exclude = document.querySelector(`.p-${Iid}`) // "Selecionar" o "conjunto" a ser excluído
        to_dos.removeChild(exclude)
        local.forEach((lItme, index) => {
            if (e.target.className.includes(lItme.id)) {
                local.splice(index, 1)
            }
        })
        localStorage.setItem("todos", JSON.stringify(local))
}
local.forEach((item) => {
    // Criação e formatação dos elementos que já estavam no LocaStorage
    let p = document.createElement("p") //Elementos pai
    let s = document.createElement("span") // Texto do to-do
    let i = document.createElement("input") // Check-Box
    let x = document.createElement("button")
    x.innerHTML = "X" // Botão de excluir
    x.addEventListener("click", (e) => ExcluirTd(item.id, e)) // Basicamente estruturação da função de exclução dos to-dos, no caso dos já 
    i.addEventListener("click", (e) => TrFeito(e))
    if (item.feito == "true") {
        i.setAttribute("checked", "") // Servindo para manter o estado deles
    }
    setAttr(x, ["class"], [item.id])
    setAttr(i, ["type", "id", "class"], ["checkbox", item.id, "xec"])
    setAttr(p, ["class"], [`p-${item.id}`])
    s.classList.add([item.id, "txt"])
    s.innerHTML = ` ${item.txt}  `
    p.append(i, s, x)
    to_dos.append(p)
})

function novoTd() {
    // Função para a criação de um novo to-do
    let id = GenerateID() // Geração do ID
    let p = document.createElement("p")
    let s = document.createElement("span")
    let i = document.createElement("input")
    let x = document.createElement("button")
    x.innerHTML = "X"
    setAttr(i, ["type", "id", "class"], ["checkbox", id, "xec"])
    setAttr(x, ["class"], [id])
    setAttr(p, ["class"], [`p-${id}`])
    s.classList.add([id, "txt"])
    s.innerHTML = ` ${txt.value}  `
    p.append(i, s, x)
    to_dos.append(p)
    let template = {
        "id": id,
        "feito": "false",
        "txt" : s.innerHTML
    }// Template que serve para salvar as informações de cada to-do
    local.push(template)
    x.addEventListener("click", (e) => ExcluirTd(id, e))
    i.addEventListener("click", (e) => TrFeito(e))
    localStorage.setItem("todos", JSON.stringify(local))
}