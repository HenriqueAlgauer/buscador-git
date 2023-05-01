// Sempre que eu clicar no botão, eu quero que ele traga a informação do usuário 
// Colocar número de seguidores do usuário, e o número de pessoas seguindo 
    // Adicionar novas props no objeto user 
    // Adiconar props na setInfo ( metodo user )
    // Adicionar novo texto no objeto screen   


import {getUser}from './services/user.js'
import {getRepos} from './services/repos.js'
import {getEvents} from './services/events.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', ()=>{
    const userName =  document.getElementById('input-search').value
    if(validateIput(userName)) return
    getUserData(userName) 
})

document.getElementById('input-search').addEventListener('keyup', (e)=>{
    const userName = e.target.value 
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    
    if(isEnterKeyPressed){
        if(validateIput(userName)) return
        getUserData(userName)
    }
})

function validateIput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário GitHub')
        return true
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName)

    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }
    const reposResponse = await getRepos(userName)
    const eventsResponse = await getEvents(userName)
    
    user.setInfo(userResponse) 
    user.setRepos (reposResponse) 
    user.setEvents(eventsResponse)
    // user.setEvents (eventsResponse)

    screen.renderUser(user)
}
