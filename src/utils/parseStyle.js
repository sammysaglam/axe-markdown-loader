const camelCase = string => {
	return string
	.replace(/([A-Z])([A-Z])/g, '$1 $2')
	.replace(/([a-z])([A-Z])/g, '$1 $2')
	.replace(/[^a-zA-Z\u00C0-\u00ff]/g, ' ')
	.toLowerCase()
	.split(' ')
	.filter(value => value)
	.map((s, i) => (i > 0 ? s[0].toUpperCase() + s.slice(1) : s))
	.join('')
};

const parseStyle = style => {
  switch (typeof style) {
    case 'string':
      return style.split(';').filter(r => r)
        .reduce((map, rule) => {
          const name = rule.slice(0, rule.indexOf(':')).trim()
          const value = rule.slice(rule.indexOf(':') + 1).trim()

          return {
            ...map,
            [camelCase(name)]: value,
          }
        }, {})
    case 'object':
      return style

    default:
      return undefined
  }
};