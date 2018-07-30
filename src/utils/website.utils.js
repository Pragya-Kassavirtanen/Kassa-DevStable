export const toggleCollapsePanelShown = (e) => {
  var parent = e.target.parentNode
  parent.classList.toggle('is-open')
}

export const faqFunction = () => {
  var elements = document.getElementsByClassName('collapsepanel')
  for(let i = 0; i < elements.length; i++){
    elements[i].addEventListener('click', toggleCollapsePanelShown, false)
  }
}

