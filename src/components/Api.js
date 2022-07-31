export class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl
      this._headers = options.headers
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
        .then(res => {
            if(res.ok){
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
  
    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(res => {
              if(res.ok){
                  return res.json()
              }

              return Promise.reject(`Ошибка: ${res.status}`)
             })  
    }

    patchProfileInfo(name, job){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name.textContent,
                about: job.textContent,
              })
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                }

               return Promise.reject(`Ошибка: ${res.status}`)
            })
    }
    
    newCard(dataTitle, dataSubtitle) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: dataTitle,
                link: dataSubtitle,
              })
        })           
        .then(res => {
                if(res.ok){
                    return res.json()
                }

               return Promise.reject(`Ошибка: ${res.status}`)
            })
  }

    newAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar `, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
              })
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                }

               return Promise.reject(`Ошибка: ${res.status}`)
            })
    }
    
    deliteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })           
        .then(res => {
                if(res.ok){
                    return res.json()
                }

               return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }

           return Promise.reject(`Ошибка: ${res.status}`)
        }) 
    }

    likeOffCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }

           return Promise.reject(`Ошибка: ${res.status}`)
        }) 
    }

} 