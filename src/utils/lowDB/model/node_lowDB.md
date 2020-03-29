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
  取得指针
      db.getState()
      .get(key)
      .find({key: 查询值})
      .has(key)
      .filter({key: 筛选值})
      .sortBy(key)
      .take(number)
      .size()
      .map('title') // ?
      .cloneDeep()
  取得指针值
      .value()
修改
  预设值
      db.setState(newDBJSON)
      .set(key, value)
      .unset(key)
      .defaults({ key:value... })
      .assign({ key: value })
      .remove({ key: value })
  指针赋值：
      .write()
      .set().value()
  添加Id
      const shortid = require('shortid')
      ...id: shortid.generate()
```

- 默认数据结构

```
  [] 可以使用 push()
  .get('posts[0].title')
```
