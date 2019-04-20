import axios from 'axios'

class HTTP {
  get(param) {
    return new Promise((resolve, reject) => {
      axios.get(`${config.api_base_url}${param.url}`, {
        params: param.data
      }).then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
    })
  }

  post(param) {
    // console.log(param)
    return new Promise((resolve, reject) => {
      axios.post(`${param.url}`, param.data).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}

export {
  HTTP
}
