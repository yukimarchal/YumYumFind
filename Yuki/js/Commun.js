const Session = {
    createIfNotExists : (name) => {
        if (localStorage.getItem(name) === null) localStorage.setItem(name, false)
    },
    get : (name) => {
        return localStorage.getItem(name)
    },
    win : (name) => {
        localStorage.setItem(name, true)
    },
    clear : () => {
        localStorage.clear()
    }
}