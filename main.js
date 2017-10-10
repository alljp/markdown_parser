rules = [
  {regex: /(\#)(.*)/g, replacement: '<h1>$2</h1>'}
]

function render (md_string) {
  for (let i = 0; i < rules.length; i++) {
    md_string = md_string.replace(rules[i].regex, rules[i].replacement)
  }
  return md_string
}

md_string = '#Headers'

console.log(render(md_string))
