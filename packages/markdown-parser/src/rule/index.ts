// Heading  # 或者 下划线 或者 等号
const isHeading = /^{0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/


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
