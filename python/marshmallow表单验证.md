
marshmallow是一个用来将复杂的orm对象与python原生数据类型之间相互转换的库，简而言之，就是实现`object -> dict`，  `objects -> list`,  `string -> dict`  和  `string -> list`。

要用到marshmallow， 首先需要一个用于序列化和反序列化的类：

```python
import datetime as dt

class User(object):
	def __init__(self, name, email):
		self.name = name
		self.eamil = eamil
		self.careated_at = dt.datetime.now()
	
	def __repr__(self):
		return '<User(name={self.name!r})>'.format(self=self)

```

##Schema  
要对一个类或者一个json数据实现相互转换(即序列化和反序列化, 序列化的意思是将数据转化为可存储或可传输的数据类型), 需要一个中间载体, 这个载体就是Schema.  
除了转换以外, Schema还可以用来做数据校验. 每个需要转化的类, 都需要一个对应的Schema:

```python
from marshmallow import Schema, fields

class UserSchema(Schema):
	name = fields.Str()
	eamil = fields.Email()
	created_at = fields.DataTime()

```

##Serializing(序列化)  
序列化使用schema中的`dump()`或`dumps()`方法, 其中,`dump()`  方法实现`obj -> dict`,  `dumps()`方法实现`obj -> string`, 由于Flask能直接序列化dict(使用jsonify), 而且你肯定还会对dict进下一步的处理, 没必要现在转化成string, 所以通常Flask与Marshmallow配合序列化时, 用`dump()`方法即可:

```python
from marshmallow import pprint

user = User(name="Monty", email="monty@python.org")
schema = UserSchema()
result = schema.dump(user)
pprint(result.data)
# {"name": "Monty",
#  "email": "monty@python.org",
#  "created_at": "2014-08-17T14:54:16.049594+00:00"}

```

##过滤输出  
当然那你不需要每次都输出对象中所有字段, 可以使用`only`参数来指定你需要输出的字段, 这个在实际场景中很常见.

```python
summary_schema = UserSchema(only=('name', 'email'))
summary_schema.dump(user).data
# {"name": "Monty Python", "email": "monty@python.org"}

```

你也可以使用`exclude`字段来排除你不想输出的字段.  
##Deserializing(反序列化)  
相对`dump()`的方法就是`load()`了, 可以将字典等类型转换成应用层的数据结构, 即orm对象:

```python
from pprint import pprint

user_data = {
	'created_at':'2014-08-11T05:26:03.869245',
	'email': u'ken@yahoo.com',
	'name': u'Ken'
	}
schema = UserSchema()
result = schema.load(user_data)
pprint(result.data)
# {'name': 'Ken',
#  'email': 'ken@yahoo.com',
#  'created_at': datetime.datetime(2014, 8, 11, 5, 26, 3, 869245)},

```

对反序列化而言, 将传入的`dict`变成`object`更加有意义. 在Marshmallow中,  `dict -> object`的方法需要自己实现, 然后在该方法前面加上一个decoration:  `post_load`即可,  
即:

```python
from marshmallow import Schema, fields, post_load

class UserSchema(Schema):
	name = fields.Str()
	email = fields.Email()
	created_at = fields.Datetime()
	
	@post_load
	def make_user(self, data):
		return User(**data)

```

这样每次调用`load()`方法时, 会按照make_user的逻辑, 返回一个`User`类对象:

```python
user_data = {
	'name': 'Ronnie',
	'email': 'ronnie@stones.com'
}
schema = UserSchema()
result = schema.load(user_data)
result.data  # => <User(name='Ronnie')>

```

tips: 相对于`dumps()`, 也存在`loads()`方法, 用于`string -> object`, 有些简单场景可以用.

##Objects <-> List  
上面的序列化和反序列化, 是针对一个object而言的, 对于objects的处理, 只需在schema中增加一个参数:  `many=True`, 即:

```python
user1 = User(name="Mick", email="mick@stones.com")
user2 = User(name="Keith", email="keith@stones.com")
users = [user1, user2]

# option 1:
schema = UserSchema(many=True)
result = schema.dump(users)

# Option 2:
schema = UserSchema()
result = schema.dump(users, many=True)
result.data

# [{'name': u'Mick',
#   'email': u'mick@stones.com',
#   'created_at': '2014-08-17T14:58:57.600623+00:00'}
#  {'name': u'Keith',
#   'email': u'keith@stones.com',
#   'created_at': '2014-08-17T14:58:57.600623+00:00'}]

```

##Validation  
`Schema.load()`和`loads()`方法会在返回值中加入验证错误的`dictionary`, 例如`email`和`URL`都有内建的验证群.

```python
result = UserSchema().load({'email': 'foo'})
result.errors  # => {'email': ['"foo" is not a valid email address.']}

```

当验证一个集合时, 返回的错误`dictionary`会以错误序号对应错误信息的key:value形式保存:

```python
class BandMemberSchema(Schema):
    name = fields.String(required=True)
    email = fields.Email()

user_data = [
    {'email': 'mick@stones.com', 'name': 'Mick'},
    {'email': 'invalid', 'name': 'Invalid'},  # invalid email
    {'email': 'keith@stones.com', 'name': 'Keith'},
    {'email': 'charlie@stones.com'},  # missing "name"
]

result = BandMemberSchema(many=True).load(user_data)
result.errors
# {1: {'email': ['"invalid" is not a valid email address.']},
#  3: {'name': ['Missing data for required field.']}}

```

你可以向内建的`field`中传入`validate`参数来定制验证的逻辑,  `validate`的值可以是函数, 匿名函数`lambda`, 或者是定义了`__call__`的对象:

```python
class ValidatedUserSchema(UserSchema):
    # NOTE: This is a contrived example.
    # You could use marshmallow.validate.Range instead of an anonymous function here
    age = fields.Number(validate=lambda n: 18 <= n <= 40)

in_data = {'name': 'Mick', 'email': 'mick@stones.com', 'age': 71}
result = ValidatedUserSchema().load(in_data)
result.errors  # => {'age': ['Validator <lambda>(71.0) is False']}

```

如果你传入的函数中定义了`ValidationError`, 当它触发时, 错误信息会得到保存:

```python
from marshmallow import Schema, fields, ValidationError

def validate_quantity(n):
    if n < 0:
        raise ValidationError('Quantity must be greater than 0.')
    if n > 30:
        raise ValidationError('Quantity must not be greater than 30.')

class ItemSchema(Schema):
    quantity = fields.Integer(validate=validate_quantity)

in_data = {'quantity': 31}
result, errors = ItemSchema().load(in_data)
errors  # => {'quantity': ['Quantity must not be greater than 30.']}

```

注意1:  
如果你需要执行多个验证, 你应该传入可调用的验证器的集合(list, tuple, generator)

注意2:  
`Schema.dump()`也会返回错误信息`dictionary`, 也会包含序列化时的所有`ValidationErrors`. 但是`required`,  `allow_none`,  `validate`,  `@validates`, 和`@validates_schema`只用于反序列化, 即`Schema.load()`.

##Field Validators as Methods  
把生成器写成方法可以提供极大的便利. 使用`validates`装饰器就可以注册一个验证方法:

```python
from marshmallow import fields, Schema, validates, ValidationError
class ItemSchema(Schema):
    quantity = fields.Integer()

    @validates('quantity')
    def validate_quantity(self, value):
        if value < 0:
            raise ValidationError('Quantity must be greater than 0.')
        if value > 30:
            raise ValidationError('Quantity must not be greater than 30.')

```

##strict Mode  
如果将`strict=True`传入`Schema`构造器或者`class`的`Meta`参数里, 则仅会在传入无效数据时报错. 可以使用`ValidationError.messages`变量来获取验证错误的`dictionary`.

```python
from marshmallow import fields, Schema, ValidationError, validates_schema

class ItemSchema(Schema):
    quantity = fields.Integer()
    class Meta:
        strict = True

    @validates_schema()
    def validate_quantity(self, data):
        if data['quantity'] < 0:
            raise ValidationError('Quantity must be greater than 0.')
        if data['quantity'] > 30:
            raise ValidationError('Quantity must not be greater than 30.')

schema = ItemSchema()
d = {'quantity': 31}
loaded = schema.load(d)
print loaded
# 直接报错:marshmallow.exceptions.ValidationError: {u'_schema': ['Quantity must not be greater than 30.']}

```

##Required Fields  
你可以在`field`中传入`required=True`. 当`Schema.load()`的输入缺少某个字段时错误会记录下来.  
如果需要定制`required fields`的错误信息, 可以传入一个`error_messages`参数, 参数的值为以`required`为键的键值对.

```python
from marshmallow import fields, Schema

#option1
fields.Field.default_error_messages = {
    'required': u'缺少必填数据.',
    'type': u'数据类型不合法.',
    'null': u'数据不能为空.',
    'validator_failed': u'非法数据.'
}
fields.Str.default_error_messages = {
    'invalid': '不是合法文本.'
}
fields.Int.default_error_messages = {
    'invalid': u'不是合法整数.'
}
fields.Number.default_error_messages = {
    'invalid': u'不是合法数字.'
}
fields.Boolean.default_error_messages = {
    'invalid': u'不是合法布尔值.'
}
# option2
class ItemSchema(Schema):
    quantity = fields.Int(required=True, error_messages={'required':'quantity is required.'})
schema = ItemSchema()
d = {'quantity': '12a'}
loaded = schema.load(d)
print loaded
#option1: UnmarshalResult(data={}, errors={'quantity': [u'不是合法数字']})
#option2: UnmarshalResult(data={}, errors={'quantity':[r'quantity is required']

```

##Partial Loading  
按照RESTful架构风格的要求, 更新数据使用HTPP方法中的`PUT`或`PATCH`方法, 使用PUT方法时, 需要把完整的数据全部传给服务器, 使用`PATCH`方法时, 只需要改动的部分数据传给服务器即可. 因此, 当使用`PATCH`方法时, 由于之前设定的`required`, 传入数据存在无法通过`Marshmallow`数据校验的风险, 为了避免这种情况, 需要借助`Partial Loading`功能.

实现`Partial Loading`只要在`schema`构造器中增加一个`partial`参数即可:

```python
class UserSchema(Schema):
	name = fields.String(required=True)
	age = fields.Integer(required=True)

data, errors = UserSchema().load({'age':12}, partial=('name',))
# OR UserSchema(partial=('name',)).load({'age': 12})
data, erros # => ({'age':12},{})

```

##Schema.validate  
如果你只是想用`Schema`去验证数据, 而不生成对象, 可以使用`Schema.validate()`  
可以看到, 通过schema.validate()会自动对数据进行校验, 如果有错误, 则会返回回来, 通过返回的数据, 我们就可以确认验证是否通过.

```python
class ItemSchema(Schema):
    name = fields.Str(required=True)
    country = fields.Str()
    quantity = fields.Int()
    @validates('country')
    def validate_country(self, country):
        if country != 'china':
            raise ValidationError('Country only is china')

schema = ItemSchema()
d = {'country': 'china1', 'quantity': '12a'}
loaded = schema.load(d)
print loaded
errors = ItemSchema().validate(d)
print errors
#UnmarshalResult(data={}, errors={'country': ['Country only is china'], 'name': [u'不是合法文本'], 'quantity': [u'不是合法数字']})
# {'country': ['Country only is china'], 'name': [u'不是合法文本'], 'quantity': [u'不是合法数字']}

```

##Specifying Attribute Names  
`Schema`默认会序列化**传入对象**和自身定义的`fields`相同的属性, 然而你也会有需求使用不同的`fields`和属性名. 在这种情况下, 你需要明确定义这个`fields`将从什么属性名取值:

```python
class UserSchema(Schema):
    name = fields.String()
    email_addr = fields.String(attribute="email")
    date_created = fields.DateTime(attribute="created_at")

user = User('Keith', email='keith@stones.com')
ser = UserSchema()
result, errors = ser.dump(user)
pprint(result)
# {'name': 'Keith',
#  'email_addr': 'keith@stones.com',
#  'date_created': '2014-08-17T14:58:57.600623+00:00'}

```

##Specifying Deserialization Keys  
`Schema`默认会反序列化**传入字典**和**输出字典**中相同的字段名. 如果你觉得数据不匹配你的`schema`, 你可以传入`load_from`参数指定需要增加`load`的字段名(原字段名也能`load`, 且优先`load`原字段名):

```python
class UserSchema(Schema):
    name = fields.String()
    email = fields.Email(load_from='emailAddress')

data = {
    'name': 'Mike',
    'emailAddress': 'foo@bar.com'
}
s = UserSchema()
result, errors = s.load(data)
#{'name': u'Mike',
# 'email': 'foo@bar.com'}

```

##“Read-only” and “Write-only” Fields  
可以指定某些字段只能`dump()`或`load()`:

```python
class UserSchema(Schema):
	name = fields.Str()
	# password is "write-only"
	password = fields.Str(load_only=True)
	# created_at is "read-only"
	created_at = fields.DateTime(dump_only=True)

```

##Nesting Schemas  
当你的模型含有外键, 那这个外键的对象在`schema`如何定义.  
举个例子, Blog就具有User对象作为它的外键:

```python
import datetime as dt
class User(object):
	def __init__(self, name, email):
		self.name = name
		self.email = email
		self.created_at = dt.datetime.now()
		self.friends = []
		self.employer = None

class Blog(object):
	def __init__(self, title, author):
		self.title = title
		self.author = author  # A User object

```

使用`Nested field`表示外键对象:

```python
from marshmallow import Schema, fields, pprint

class UserSchema(Schema):
	name = fields.String()
	email = fields.Email()
	created_at = fields.DateTime()
	
class BlogSchema(Schema):
	title = fields.Str()
	author = fields.Nested(UserSchema)

```

这样序列化blog就会带上user信息了:

```python
user = User(name="Monty", email="monty@python.org")
blog = Blog(title="something Completely Different", author=user)
result, errors = BlogSchema().dump(blog)
pprint(result)
# {'title': u'Something Completely Different',
# {'author': {'name': u'Monty',
#             'email': u'monty@python.org',
#             'created_at': '2014-08-17T14:58:57.600623+00:00'}}

```

如果field是多个对象的集合, 定义时可以使用`many`参数:

```python
collaborators = fields.Nested(UserSchema, many=True)

```

如果外键对象是自引用, 则Nested里第一个参数为`self`  
##Specifying Which Fields to Nest  
如果你想指定外键对象序列化后只保留它的几个字段, 可以使用`Only`参数:

```python
class BlogSchema2(Schema):
    title = fields.String()
    author = fields.Nested(UserSchema, only=["email"])

schema = BlogSchema2()
result, errors = schema.dump(blog)
pprint(result)
# {
#     'title': u'Something Completely Different',
#     'author': {'email': u'monty@python.org'}
# }

```

如果需要选择外键对象的字段层次较多, 可以使用"."操作符来指定:

```python
class Site(object):
	def __init__(self, blog)
		self.blog = blog
class SiteSchema(Schema):
	blog = fields.Nested(BlogSchema2)
user = User(name='xxx', email='xxx', created_at='xxx')
blog = Blog(title='xxx', author=user)
site = Site(blog=blog)
schema = SiteSchema(only=['blog.author.email'])
result, errors = schema.dump(site)
pprint(result)
# {
#     'blog': {
#         'author': {'email': u'monty@python.org'}
#     }
# }

```

##Note  
如果你往`Nested`是多个对象的列表, 传入only可以获得这列表的指定字段.

```python
class User(object):
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.friends = []

class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    friends = fields.Nested('self', only='name', many=True) # 这里的many=True, 代表friends是一个可迭代对象

user1 = User('1a', '1@1.com')
user2 = User('2b', '2@2.com')
user3 = User('3c', '3@3.com')
user1.friends = [user2, user3]
user2.friends = [user1, user3]
user3.friends = [user1, user2]
user = [user1, user2, user3]
dumped1 = UserSchema(many=True).dump(user) 
print dumped1
# 这里的many=True 代表传入的user是一个可迭代对象
dumped = UserSchema().dump(user1)
print dumped
#MarshalResult(data=[{u'friends': [u'2b', u'3c'], u'name': u'1a', u'email': u'1@1.com'}, {u'friends': [u'1a', u'3c'], u'name': u'2b', u'email': u'2@2.com'}, {u'friends': [u'1a', u'2b'], u'name': u'3c', u'email': u'3@3.com'}], errors={})
#MarshalResult(data={u'friends': [u'2b', u'3c'], u'name': u'1a', u'email': u'1@1.com'}, errors={})
这种情况, 你也可以使用exclude去掉你不需要的字段. 同样这里也可以使用"."操作符.

```

##Two-way Nesting  
如果有两个对象需要相互包含, 可以指定`Nested`对象的类名字符串, 而不需要类. 这样你可以包含一个还未定义的对象:

```python
class AuthorSchema(Schema):
    # Make sure to use the 'only' or 'exclude' params
    # to avoid infinite recursion
    books = fields.Nested('BookSchema', many=True, exclude=('author', ))
    class Meta:
        fields = ('id', 'name', 'books')

class BookSchema(Schema):
    author = fields.Nested(AuthorSchema, only=('id', 'name'))
    class Meta:
        fields = ('id', 'title', 'author')

```

举个例子,  `Author`类包含很多books, 而`Book`对`Author`也有多对一的关系.

```python
from marshmallow import pprint
from mymodels import Author, Book

author = Author(name='William Faulkner')
book = Book(title='As I Lay Dying', author=author)
book_result, errors = BookSchema().dump(book)
pprint(book_result, indent=2)
# {
#   "id": 124,
#   "title": "As I Lay Dying",
#   "author": {
#     "id": 8,
#     "name": "William Faulkner"
#   }
# }
author.books = [book]
author_result, errors = AuthorSchema().dump(author)
pprint(author_result, indent=2)
# {
#   "id": 8,
#   "name": "William Faulkner",
#   "books": [
#     {
#       "id": 124,
#       "title": "As I Lay Dying"
#     }
#   ]
# }

```

## Nesting A Schema Within Itself

如果需要自引用, “Nested"构造时传入"self”(包含引号)即可:

```python
class User(object):
    def __init__(self, name, email):
        self.name= name
        self.email = email
        self.friends = []
        self.employer = None

class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    friends = fields.Nested('self', many=True)
    # 因为包含自身, 或者相互引用, 会出现一个无限递归(infinite recuision)的问题, 所以使用exclude/only避免
    employer = fields.Nested('self', exclude=('employer,'), default=None)

user = User('steve', 'steve@example.com')
user.friends.append(User('Mike', 'mike@example.com'))
user.friends.append(User('Joe', 'joe@example.com'))
user.employer = User('Dirk', 'dirk@example.com')
result = UserSchema().dump(user)
pprint(result.data)
# {
#     "name": "Steve",
#     "email": "steve@example.com",
#     "friends": [
#         {
#             "name": "Mike",
#             "email": "mike@example.com",
#             "friends": [],
#             "employer": null
#         },
#         {
#             "name": "Joe",
#             "email": "joe@example.com",
#             "friends": [],
#             "employer": null
#         }
#     ],
#     "employer": {
#         "name": "Dirk",
#         "email": "dirk@example.com",
#         "friends": []
#     }
# }

```

## 指定默认序列化/反序列化值

可以为Field为序列化和反序列化提供默认值  
missing如果在输入数据中找不到该字段, 则用于反序列化. 同样, default如果缺少输入值, 则用于序列化.  
例:

```python
class UserSchema(Schema):
	id = fields.UUID(missing=uuid.uuid)
	birthdate = fields.DateTime(default=dt.datetime(2017, 9, 29))
UserSchema().load({})
# {'id': UUID('337d946c-32cd-11e8-b475-0022192ed31b')}
UserSchema().dump({})
# {'birthdate': '2017-09-29T00:00:00+00:00'}
```
