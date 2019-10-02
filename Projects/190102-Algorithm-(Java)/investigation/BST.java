package investigation;

import java.util.ArrayList;
import java.util.Iterator;

public class BST<E extends Comparable<E>> implements Tree<E> {
	/*这是一棵二叉查找树
	 * 	1.采用链式结构存储数据
	 * 	2.数值均不相同
	 */
	
	//----------------------------------------------------------初始变量
	protected int size = 0;
	protected TreeNode<E> root;
	
	public static class TreeNode<E extends Comparable<E>> {
		protected E element;
		protected TreeNode<E> left;
		protected TreeNode<E> right;
		
		public TreeNode(E e) {
			element = e;
		}
	}
	//----------------------------------------------------------构造方法
	public BST() {
		
	}
	public BST(E[] objects) {
		for(int i=0; i<objects.length; i++) {
			insert(objects[i]);
		}
	}
	//----------------------------------------------------------增加
	@Override
	public boolean insert(E e) {
		if(root == null)
			root = createNewNode(e);
		else {
			TreeNode<E> parent = null;
			TreeNode<E> current = root;
			while(current != null) {
				if(e.compareTo(current.element) < 0) {
					//元素是否比当前结点小
					parent = current;
					current = current.left;
				}else if(e.compareTo(current.element) > 0) {
					//元素是否比当前元素大
					parent = current;
					current = current.right;
				}else 
					//结点已存在
					return false;
			}
			if(e.compareTo(parent.element) < 0)
				//current==null
				parent.left = createNewNode(e);
			else
				parent.right = createNewNode(e);
		}
		size++;
		return true;
	}
	protected TreeNode<E> createNewNode(E e){
		return new TreeNode<E>(e);
	}

	//----------------------------------------------------------删除
	@Override
	public boolean delete(E e) {
		//第一步：定位要删除的e元素
		TreeNode<E> parent = null;
		TreeNode<E> current = root;
		while(current != null) {
			if(e.compareTo(current.element) < 0) {
				//元素是否比当前结点小
				parent = current;
				current = current.left;
			}else if(e.compareTo(current.element) > 0) {
				//元素是否比当前元素大
				parent = current;
				current = current.right;
			}else 
				break;
		}
		if(current == null) return false;
		
		//第二步：开始删除操作：e不大于也不小于current下的e：找到了
		if(current.left == null) {
			//目标结点不存在左结点
			if(parent == null)
				root = current.right;
			else {
				if(e.compareTo(parent.element) < 0) {
					//parent→ current(e)
					parent.left = current.right;
				}else
					parent.right = current.right;
			}
		}else {
			//要删除的目标结点current存在左结点
			TreeNode<E> parentOfRightMost = current;
			TreeNode<E> rightMost = current.right;
			
			//找到最右下结点，把值和current交换
			while(rightMost.right != null) {
				parentOfRightMost = rightMost;
				rightMost = rightMost.right;
			}
			current.element = rightMost.element;
			//处理无用的rightmost,但是rightmost是否存在左子树？
			if(rightMost.left == null)
				parentOfRightMost.right = null;
			else {
				parentOfRightMost.right = rightMost.left;
			}		
		}
		size--;
		return true;
	}

	//----------------------------------------------------------修改
	//----------------------------------------------------------查询
	@Override
	public boolean isEmpty() {
		return size == 0;
	}
	
	@Override
	public int getSize() {
		return size;
	}
	
	@Override
	public boolean search(E e) {
		TreeNode<E> current = root;
		
		while(current != null) {
			if(e.compareTo(current.element) < 0)
				//是否比当前节点小->current左下移
				current = current.left;
			else if(e.compareTo(current.element) >0)
				//那就是比当前节点大->current右下移动
				current = current.right;
			else
				//节点已经存在
				return true;
		}
		return false;
	}

	//----------------------------------------------------------迭代遍历
	
	//----------------------------------------------------------中序遍历 1+2
	public void inorder() {
		inorder(root);
	}
	protected void inorder(TreeNode<E> root) {
		if(root==null) return;
		inorder(root.left);
		System.out.print(root.element+" ");
		inorder(root.right);
	}
	//----------------------------------------------------------前序遍历 +12
	public void preorder() {
		preorder(root);
	}
	protected void preorder(TreeNode<E> root) {
		if(root == null) return;
		postorder(root.left);
		postorder(root.right);
		System.out.print(root.element+" ");
	}
	//----------------------------------------------------------后序遍历 12+
	public void postorder() {
		postorder(root);
	}
	protected void postorder(TreeNode<E> root) {
		if(root == null) return;
		
		System.out.print(root.element+" ");
		preorder(root.left);
		preorder(root.right);
	}
	
	//---------------------------------------------------------------------迭代
	@Override
	public Iterator<E> iterator() {
		return new InorderIterator();
	}
	private class InorderIterator implements Iterator<E>{
		
		private ArrayList<E> list = new ArrayList<>();
		private int current = 0;
		
		public InorderIterator() {
			inorder();
		}
		private void inorder() {
			inorder(root);
		}
		private void inorder(TreeNode<E> root) {
			//中序遍历 1+2
			if(root == null) return;
			inorder(root.left);
			list.add(root.element);
			inorder(root.right);
		}
		
		@Override
		public boolean hasNext() {
			if(current < list.size())
				return true;
			return false;
		}

		@Override
		public E next() {
			//默认中序遍历
			return list.get(current++);
		}
		
		public void remove() {
			//删除当前指针结点
			delete(list.get(current));
			list.clear();
			inorder();
		}
	}
	//---------------------------------------------------------------------其他
	public ArrayList<TreeNode<E>> path(E e){
		ArrayList<TreeNode<E>> list = new ArrayList<TreeNode<E>>();
		TreeNode<E> current = root;
		while(current != null) {
			list.add(current);
			if(e.compareTo(current.element) < 0)
				//是否比当前节点小->current左下移
				current = current.left;
			else if(e.compareTo(current.element) >0)
				//那就是比当前节点大->current右下移动
				current = current.right;
			else
				break;
		}
		return list;
	}

}
