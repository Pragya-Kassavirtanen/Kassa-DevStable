import store from '../store'
import { buffers, eventChannel, END } from 'redux-saga'
import { nestPropertyAsObject } from '../utils/invoice.utils'

/**
 * The request helper which reads the access_token from the redux state
 * and passes it in its HTTP request.
 *
 * @author Pragya Gupta
 */

const getAuthHeaders = () => {
  const headers = new Headers()

  headers.append('Accept', 'application/json')
  headers.append(
    'Authorization',
    `Bearer ${store.getState().oidc.user.access_token}`
  )

  return headers
}

const getManualAuthHeaders = () => {
  const headers = new Headers()

  headers.append('Accept', 'application/json')
  headers.append(
    'Authorization',
    `Bearer ${store.getState().client.user.data[0].access_token}`
  )

  return headers
}

export const apiRequest = (url, method = 'GET') => {
  const headers = getAuthHeaders()
  const options = {
    method,
    headers
  }

  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const apiManualRequest = (url, method = 'GET') => {
  const headers = getManualAuthHeaders()
  const options = {
    method,
    headers
  }

  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const registerPost = (url, body, method = 'POST') => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const registerGet = (url, method = 'GET') => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers
  }
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const apiPost = (url, body, method = 'POST') => {
  const headers = getAuthHeaders()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const apiManualPost = (url, body, method = 'POST') => {
  const headers = getManualAuthHeaders()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }

  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}

export const apiBlobPost = (url, body, method = 'POST') => {
  const headers = getManualAuthHeaders()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }

  return fetch(url, options).then(response => {
    if (response.ok) {
      response.blob().then(blob => {        
        
        let header = response.headers.get('Content-Disposition')        
        let filename = header.match(/filename=(.+)/)[1]
        let a = document.createElement('a')
        a.style = 'display: none'
        document.body.appendChild(a)        
        let url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = filename       
        a.click()        
        window.URL.revokeObjectURL(url)
      })
    } else {
      console.log(
        'Network request failed with response ' +
        response.status +
        ': ' +
        response.statusText
      )
    }
  })
}

export const apiManualDelete = (url, body, method = 'DELETE') => {
  const headers = getManualAuthHeaders()
  headers.append('Content-Type', 'application/json')

  const options = {
    method,
    headers,
    body
  }
  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }))
}


export const createUploadFileChannel = (url, file, opt) => {  
  return eventChannel(emitter => {
    const xhr = new XMLHttpRequest()
    let reader = new FileReader()

    const onProgress = e => {
      if (e.lengthComputable) {
        const progress = e.loaded / e.total
        emitter({ progress })
      }
    }

    const onFailure = () => {
      emitter({ err: new Error('Upload failed') })
      emitter(END)
    }

    xhr.upload.addEventListener('progress', onProgress)
    xhr.upload.addEventListener('error', onFailure)
    xhr.upload.addEventListener('abort', onFailure)

    xhr.onreadystatechange = () => {
      const { readyState, status } = xhr
      if (readyState === 4) {
        if (status === 200) {
          emitter({ success: true })
          emitter(END)
        } else {
          onFailure(null)
        }
      }
    }

    let document_id
    if(store.getState().expense.expenseEdit[0] == undefined){
      document_id = 0
    }else {
      document_id = store.getState().expense.expenseEdit[0].document_id
    }

    reader.onloadend = e => {     

      const body = {
        ...opt,
        uuid: store.getState().client.user.data[2],
        document_id: document_id, 
        filename: file.name,
        filetype: file.type,
        data: e.target.result
      }

      let nestedBody = nestPropertyAsObject(body, 'document', [
        'uuid',
        'document_id',
        'filename',
        'filetype',
        'data'        
      ])      

      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader(
        'Authorization',      
        `Bearer ${store.getState().client.user.data[0].access_token}`
      )
           
      xhr.send(JSON.stringify(nestedBody))
    }

    reader.readAsDataURL(file)

    return () => {
      xhr.upload.removeEventListener('progress', onProgress)
      xhr.upload.removeEventListener('error', onFailure)
      xhr.upload.removeEventListener('abort', onFailure)
      xhr.onreadystatechange = null
      xhr.abort()
    }
  }, buffers.sliding(2))
}