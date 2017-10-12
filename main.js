let rules = [
  {regex: /(\n#{1,6})(.*)/g, replacement: header},
  {regex: /(\*\*|__)(.*?)\1/g, replacement: '<strong>$2</strong>'},
  {regex: /(\*|_)(.*?)\1/g, replacement: '<em>$2</em>'},
  {regex: /"(.*?)"/g, replacement: '<q>$1</q>'},
  {regex: /\n-{5,}/g, replacement: '\n<hr />'},
  {regex: /\[(.*?)\]\((.*?)\)/g, replacement: '<a href=\'$2\'>$1</a>'},
  {regex: /\n\* (.*)/g, replacement: ulList},
  {regex: /\n[0-9]+\. (.*)/g, replacement: olList},
  {regex: /!\[(.*?)\]\((.*?)\)/g, replacement: '<img src=\'$2\' alt=\'$1\'>'},
  {regex: /\n>(.*)/g, replacement: blockquote},
  {regex: /\n([^\n]+)\n/g, replacement: para}
]

function header (match, item1, item2) {
  let headerLevel = item1.length - 1
  return '<h' + headerLevel + '>' + item2 + '</h' + headerLevel + '>'
}

function ulList (match, item1) {
  return '\n<ul>\n\t<li>' + item1.trim() + '</li>\n</ul>'
}

function olList (match, item1) {
  return '\n<ol>\n\t<li>' + item1.trim() + '</li>\n</ol>'
}

function para (match, item1) {
  let item = item1.trim()
  if (/^<\/?(ul|ol|li|h|p|bl|q)/im.test(item)) {
    return '\n' + item1 + '\n'
  }
  return '\n<p>' + item + '</p>\n'
}

function blockquote (match, item1) {
  return '\n<blockquote>' + item1.trim() + '</blockquote>'
}

function render (mdString) {
  mdString = '\n' + mdString + '\n'
  for (let i = 0; i < rules.length; i++) {
    mdString = mdString.replace(rules[i].regex, rules[i].replacement)
  }
  return mdString.trim()
}

// md_string = '#Header1\nText attributes _italic_, **italic**, __bold__, **bold**, ***bold-italic*** \n' +
//   '"Quote" \n A [link](http://example.com)'

let mdString = '# Title\n\nAnd *now* [a link](http://www.google.com) to **follow** and [another](http://yahoo.com/).\n\n* One\n* Two\n* Three\n\n## Subhead\n\nOne **two** three **four** five.\n\nOne __two__ three _four_ five __six__ seven _eight_.\n\n1. One\n2. Two\n3. Three\n\nMore text with `inline($code)` sample.\n\n> A block quote\n> across two lines.\n"More text..."'

console.log(render(mdString))
