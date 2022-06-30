export class UserInfo {
    constructor({ selectorName , selectorJob }) {
        this._nameElement = document.querySelector(selectorName)
        this._jobElement = document.querySelector(selectorJob)

    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        }
    }

    setUserInfo(name , job) {
        this._nameElement.textContent =  name
        this._jobElement.textContent =  job
    }
}