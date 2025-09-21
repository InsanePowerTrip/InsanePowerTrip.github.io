Prism.languages.cmd = {
  'comment': {
    pattern: /(^|\s)(?:REM.*|::.*)/i,
    lookbehind: true
  },
  'label': {
    pattern: /^:\w+/m,
    alias: 'function'
  },
  'keyword': /\b(?:ECHO|SET|IF|ELSE|GOTO|CALL|FOR|IN|DO|EXIT|PAUSE|TITLE|SHIFT|CD|MD|RD|DEL|COPY|MOVE|TYPE|START|PING|CLS|COLOR)\b/i,
  'variable': /%[a-zA-Z0-9_]+%/,
  'string': /"(?:\\.|[^"\\])*"/,
  'number': /\b\d+\b/,
  'operator': /==|<=|>=|<|>|\|\||&&|&|\|/,
  'punctuation': /[(),]/
};