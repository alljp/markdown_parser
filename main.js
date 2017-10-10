rules = [
{}
]

function render (md_string) {
  for (let i = 0; i < rules.length; i++) {
    md_string = md_string.replace(rules[i].regex, rules[i].replacement)
  }
  return md_string
}
