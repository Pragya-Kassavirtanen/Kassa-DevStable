export const toggleCollapsePanelShown = e => {
  var parent = e.target.parentNode
  parent.classList.toggle('is-open')
}

export const faqFunction = () => {
  var elements = document.getElementsByClassName('collapsepanel')
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', toggleCollapsePanelShown, false)
  }
}

export const hideLink = () => {
  window.location =
    'https://kvtapi.blob.core.windows.net/kassavirtanendocs/kassavirtanen_k%C3%A4ytt%C3%B6ohje.docx'
}