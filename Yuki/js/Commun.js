const Session = {
    createIfNotExists : (name) => {
        if (localStorage.getItem(name) === null) localStorage.setItem(name, false)
    },
    win : (name) => {
        localStorage.setItem(name, true)
    },
    clear : () => {
        localStorage.clear()
    }
}