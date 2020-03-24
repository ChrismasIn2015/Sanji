## lowDB API 文档

1.库的导入

```
  $ npm install lowDB
  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')
  const adapter = new FileSync('db.json')
  const db = low(adapter)
```

2.常用

```
查询
  取得指针：db.get(key)
  取得指针值：*.value()
修改
  设置库默认值：db.defaults({ key:value... })
  (实际) 指针赋值：*.write()
```

- 默认数据结构

```
  [] 可以使用 push()
```
