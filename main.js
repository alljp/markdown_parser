const fs = require('fs')

let mdString = fs.readFileSync('sample.md', 'utf8')

let rules = [
  {regex: /(\n#{1,6})(.*)/g, replacement: header},
  {regex: /(\*\*|__)(.*?)\1/g, replacement: '<strong>$2</strong>'},
  {regex: /(\*|_)(.*?)\1/g, replacement: '<em>$2</em>'},
  {regex: /"(.*?)"/g, replacement: '<q>$1</q>'},
  {regex: /\n-{5,}/g, replacement: '\n<hr />'},
  {regex: /!\[(.*?)\]\((.*?)\)/g, replacement: '<img src=\'$2\' alt=\'$1\'>'},
  {regex: /\[(.*?)\]\((.*?)\)/g, replacement: '<a href=\'$2\'>$1</a>'},
  {regex: /\n\s*\* (.*)/g, replacement: ulList},
  {regex: /\n\s*[0-9]+\. (.*)/g, replacement: olList},
  {regex: /<\/ul>\s?<ul>/g, replacement: ''},
  {regex: /<\/ol>\s?<ol>/g, replacement: ''},
  {regex: /\n>(.*)/g, replacement: blockquote},
  {regex: /<\/blockquote><blockquote>/g, replacement: '\n'},
  {regex: /`(.*?)`/g, replacement: '<code>$1</code>'},
  {regex: /\n {4}(.*)/g, replacement: precode},
  {regex: /<\/code><\/pre>\n<pre><code>/g, replacement: '\n'},
  {regex: /\n([^\n, ]+)\n/g, replacement: para}
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

function precode (match, item1) {
  return '\n<pre><code>' + item1 + '</code></pre>'
}

function render (mdString) {
  mdString = '\n' + mdString + '\n'
  for (let i = 0; i < rules.length; i++) {
    mdString = mdString.replace(rules[i].regex, rules[i].replacement)
  }
  return mdString.trim()
}

console.log(render(mdString))
