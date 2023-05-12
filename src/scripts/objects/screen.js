const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {

        this.userProfile.innerHTML = `
                        <div class="info">
                            <img src='${user.avatarUrl}' alt='foto de perfil user' />
                            <div class='data'>
                                <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                <p>Seguidores : ${user.followers}</p>
                                <p>Seguindo : ${user.following}</p>
                            </div>
                        </div>`
        let reposItens = ''
        user.repos.forEach(repo => reposItens +=
            `<a href='${repo.html_url}' target='_blank'>${repo.name}
                        <li href='${repo.html_url}' target='_blank'>
                        <div class='info-repo'>
                            <span class='info-repos-square'>🍴 ${repo.stargazers_count}</span>
                            <span class='info-repos-square'>⭐ ${repo.stargazers_count}</span>
                            <span class='info-repos-square'>👀 ${repo.watchers_count}</span>
                            <span class='info-repos-square'>👨‍💻 ${repo.language ?? ':/'}</span>
                        </div>
                        </li>
                    </a>`)
        let eventsItens = []

        user.events.forEach(event => {
            if (event.type === 'PushEvent') {
                eventsItens +=
                    `<li class='eventos'>
                                    <a href='https://github.com/${event.repo.name}' target='_blank'>${event.repo.name}</a>
                                    <span> - ${event.payload.commits[0].message ?? ''} </span>
                                </li>`
            } else {
                eventsItens +=
                    `<li class='eventos'>
                                <a href='https://github.com/${event.repo.name}' target='_blank'>${event.repo.name}</a>
                                <span> - ${event.payload.description ?? event.type} </span>
                            </li>`
            }

        })

        // user.events.forEach(event => {
        //     if(event.type === 'PushEvent' ){
        //         eventsItens += 
        //         `<li class='eventos'>
        //             <a href='https://github.com/${event.repo.name}' target='_blank'>${event.repo.name}</a>
        //             <span> - ${event.payload.commits[0].message ?? ''} </span>
        //         </li>`
        //     }else{
        //         if(event.type === 'CreateEvent'){
        //             eventsItens += 
        //             `<li class='eventos'>
        //                 <a href='https://github.com/${event.repo.name}' target='_blank'>${event.repo.name}</a>
        //                 <span> - ${event.payload.description ??  event.type} </span>
        //             </li>`
        //         }
        //     }
        // } )

        if (user.repos.length > 0) {
            this.userProfile.innerHTML +=
                `<div class='repositories section'>
                        <h2>Repositórios</h2>
                        <ul>${reposItens}</ul>
                    </div>`
        }

        if (user.events.length > 0) {
            this.userProfile.innerHTML +=
                `<div class='events section'>
                        <h2>Eventos Recentes</h2>
                        <ul>${eventsItens}</ul>
                    </div>`
        }
        console.log(user);
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não foi encontrado </h3>"
    }
}

export { screen } 