rules = [
  {regex: /(\#)(.*)/g, replacement: '<h1>$2</h1>'},
  {regex: /(\*\*|__)(.*?)\1/g, replacement: '<strong>$2</strong>'},
  {regex: /(\*|_)(.*?)\1/g, replacement: '<em>$2</em>'},
  {regex: /\"(.*?)\"/g, replacement: '<q>$1</q>'}
]

function render (md_string) {
  for (let i = 0; i < rules.length; i++) {
    md_string = md_string.replace(rules[i].regex, rules[i].replacement)
  }
  return md_string
}

md_string = '#Header1\nText attributes _italic_, **italic**, __bold__, **bold**, ***bold-italic*** \n' +
  '"Quote"'

console.log(render(md_string))
