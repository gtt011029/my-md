var express = require('express')
var graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')

// 使用GraphQL schema language 构建一个schema   这里定义查询的语句和类型
var schema = buildSchema(`
type Query {
  hello: String,
  welcome: String,
  age: Int
}`)

// 根节点为每个API入口端点提供和一个resolver函数  也就是说查询对应的处理器
var root = {
  welcome: () => {
    return 'welcome here'
  },
  hello: () => {
    return "name: 'Tom',age: '12',description: 'hello Tom' "
  },
  age: () => {
    return 12
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true   //设置成true就可以使用GraphiQL工具来手动执行查询
}));
app.listen(4000);
console.log('Running a Graphql API server at http://localhost:4000/graphql')