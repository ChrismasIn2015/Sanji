<template>
  <div id="app">
  </div>
</template>

<script>
import { NormalTree, NormalTreeNode } from './lib/normalTree'

export default {
  created () {
    let tree = new NormalTree(1) // contains root
    tree.insert(1, new NormalTreeNode(2))
    // tree.insert(1, new NormalTreeNode(3))
    // tree.insert(1, new NormalTreeNode(4))
    // tree.insert(1, new NormalTreeNode(5))
    // tree.insert(1, new NormalTreeNode(6))

    // tree.insert(2,new NormalTreeNode(7))
    // tree.insert(2,new NormalTreeNode(8))
    // tree.insert(2,new NormalTreeNode(9))
    // tree.insert(2,new NormalTreeNode(10))
    // tree.insert(2,new NormalTreeNode(11))
    
    console.log(tree)
  }
}
</script>

<style>
</style>
