var express = require('express')
var graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')

// 使用GraphQL schema language 构建一个schema   这里定义查询的语句和类型
var schema = buildSchema(`
type Account {
  name: String,
  age: Int,
  sex: String,
  department: String,
  salary(city: String): Int
},
type Query {
  hello: String,
  welcome: String,
  age: Int,
  getClassMates(classNo: Int!): [String],
  account(userName: String): Account,
  ip: String 
}`)
// 要服务器记录每个请求的IP地址
const loggingMiddleware = (req, res, next) => {
  next()
}

// 根节点为每个API入口端点提供和一个resolver函数  也就是说查询对应的处理器
var root = {
  ip: (args, request) => {
    // console.log(args, request)
    return request.ip
  },
  welcome: () => {
    return 'welcome here'
  },
  hello: () => {
    return "name: 'Tom',age: '12',description: 'hello Tom' "
  },
  age: () => {
    return 12
  },
  getClassMates({ classNo }) {
    // 这边的obj就相当于模拟假的数据库
    const obj = {
      31: ['张三', '李四', '王五'],
      32: ['赵三', '胡四', '孙五'],
      33: ['刘三', '李四', '王五'],
    }
    return obj[classNo]
  },
  account({ userName }) {
    const name = userName
    const age = 18
    const sex = '男'
    const department = '研发'
    const salary = ({ city }) => {
      const obj = {
        'bj': 1111,
        'sh': 2222
      }
      return obj[city] ? obj[city] : 3000
    }
    return {
      name,
      age,
      sex,
      department,
      salary
    }
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true   //设置成true就可以使用GraphiQL工具来手动执行查询
}));
// 公开文件夹，供外部用户使用
app.use(express.static('public'))
app.use(loggingMiddleware)
app.listen(4000);
console.log('Running a Graphql API server at http://localhost:4000/graphql')