// Babel plugin to convert 'hello' to "h" + "e" + "l" + "l" + "o"

export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      StringLiteral(path) {
        const val = path.node.value
        const newNode = val.split('').map((str) => (t.StringLiteral(str))).reduce((prev, curr) => t.binaryExpression('+', prev, curr))
        path.replaceWith(newNode)
        path.skip()
      }
    }
  };
