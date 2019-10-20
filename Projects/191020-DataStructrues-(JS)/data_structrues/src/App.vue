<template>
  <div id="app">
  </div>
</template>

<script>
import { NormalTree, NormalTreeNode } from './lib/normalTree'

export default {
  created () {
    let tree = new NormalTree()
    tree.insert('root', new NormalTreeNode('1', 1))
    tree.insert('root', new NormalTreeNode('1', 1))
    tree.insert('root', new NormalTreeNode('2', 1))
    tree.insert('2', new NormalTreeNode('3', 4))
    tree.insert('3', new NormalTreeNode('4', 5))
    console.log(tree)
  }
}
</script>

<style>
</style>
