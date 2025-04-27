// h1-h6
const isHead = /^#{1,6}\s/;

// paragraph
const isParagraph = /^[^\s#].+/;

// br
const isBr = /^ {2,}\n/;

// bold
const isBold = /\*\*.*\*\*/;

// quote
const isQuote = /^>\s/;

// code
const isCode = /^```/;

// link
const isLink = /^\[.*\]\(.*\)/;
