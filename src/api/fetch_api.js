import axios from 'axios'

export function myFetch(url, method, params, headers) {
    return new Promise((resolve, reject) => {
        axios({
            method: method || 'GET',
            url: url,
            data: params || '',
            headers: Object.assign({}, headers || {}),
        })
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function myJsonp(url, next) {
    window.jsonpCallback = next
    let temp = document.createElement('script')
    temp.id = 'myJsonp'
    temp.src = url
    temp.type = 'text/javascript'
    document.body.appendChild(temp)
}
