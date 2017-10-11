rules = [
  {regex: /(\#{1,6})(.*)/g, replacement: header},
  {regex: /(\*\*|__)(.*?)\1/g, replacement: '<strong>$2</strong>'},
  {regex: /(\*|_)(.*?)\1/g, replacement: '<em>$2</em>'},
  {regex: /\"(.*?)\"/g, replacement: '<q>$1</q>'},
  {regex: /\[(.*?)\]\((.*?)\)/g, replacement: '<a href=\'$2\'>$1</a>'},
  {regex: /\!\[(.*?)\]\((.*?)\)/g, replacement: '<img src=\'$2\' alt=\'$1\'>'},
  {regex: /\n\>(.*)/g, replacement: blockquote}
]

function header (match, item1, item2) {
  let headerLevel = item1.length
  return '<h' + headerLevel + '>' + item2 + '</h' + headerLevel + '>'
}

function blockquote (match, item1) {
  return `\n<blockquote>${item1}</blockquote>`
}

function render (md_string) {
  for (let i = 0; i < rules.length; i++) {
    md_string = md_string.replace(rules[i].regex, rules[i].replacement)
  }
  return md_string
}

// md_string = '#Header1\nText attributes _italic_, **italic**, __bold__, **bold**, ***bold-italic*** \n' +
//   '"Quote" \n A [link](http://example.com)'

md_string = ' # Title\n\nAnd *now* [a link](http://www.google.com) to **follow** and [another](http://yahoo.com/).\n\n* One\n* Two\n* Three\n\n## Subhead\n\nOne **two** three **four** five.\n\nOne __two__ three _four_ five __six__ seven _eight_.\n\n1. One\n2. Two\n3. Three\n\nMore text with `inline($code)` sample.\n\n> A block quote\n> across two lines.\nMore text...'

console.log(render(md_string))
