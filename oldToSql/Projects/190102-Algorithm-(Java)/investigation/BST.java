package investigation;

import java.util.ArrayList;
import java.util.Iterator;

public class BST<E extends Comparable<E>> implements Tree<E> {
	/*����һ�ö��������
	 * 	1.������ʽ�ṹ�洢����
	 * 	2.��ֵ������ͬ
	 */
	
	//----------------------------------------------------------��ʼ����
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
	//----------------------------------------------------------���췽��
	public BST() {
		
	}
	public BST(E[] objects) {
		for(int i=0; i<objects.length; i++) {
			insert(objects[i]);
		}
	}
	//----------------------------------------------------------����
	@Override
	public boolean insert(E e) {
		if(root == null)
			root = createNewNode(e);
		else {
			TreeNode<E> parent = null;
			TreeNode<E> current = root;
			while(current != null) {
				if(e.compareTo(current.element) < 0) {
					//Ԫ���Ƿ�ȵ�ǰ���С
					parent = current;
					current = current.left;
				}else if(e.compareTo(current.element) > 0) {
					//Ԫ���Ƿ�ȵ�ǰԪ�ش�
					parent = current;
					current = current.right;
				}else 
					//����Ѵ���
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

	//----------------------------------------------------------ɾ��
	@Override
	public boolean delete(E e) {
		//��һ������λҪɾ����eԪ��
		TreeNode<E> parent = null;
		TreeNode<E> current = root;
		while(current != null) {
			if(e.compareTo(current.element) < 0) {
				//Ԫ���Ƿ�ȵ�ǰ���С
				parent = current;
				current = current.left;
			}else if(e.compareTo(current.element) > 0) {
				//Ԫ���Ƿ�ȵ�ǰԪ�ش�
				parent = current;
				current = current.right;
			}else 
				break;
		}
		if(current == null) return false;
		
		//�ڶ�������ʼɾ��������e������Ҳ��С��current�µ�e���ҵ���
		if(current.left == null) {
			//Ŀ���㲻��������
			if(parent == null)
				root = current.right;
			else {
				if(e.compareTo(parent.element) < 0) {
					//parent�� current(e)
					parent.left = current.right;
				}else
					parent.right = current.right;
			}
		}else {
			//Ҫɾ����Ŀ����current��������
			TreeNode<E> parentOfRightMost = current;
			TreeNode<E> rightMost = current.right;
			
			//�ҵ������½�㣬��ֵ��current����
			while(rightMost.right != null) {
				parentOfRightMost = rightMost;
				rightMost = rightMost.right;
			}
			current.element = rightMost.element;
			//�������õ�rightmost,����rightmost�Ƿ������������
			if(rightMost.left == null)
				parentOfRightMost.right = null;
			else {
				parentOfRightMost.right = rightMost.left;
			}		
		}
		size--;
		return true;
	}

	//----------------------------------------------------------�޸�
	//----------------------------------------------------------��ѯ
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
				//�Ƿ�ȵ�ǰ�ڵ�С->current������
				current = current.left;
			else if(e.compareTo(current.element) >0)
				//�Ǿ��Ǳȵ�ǰ�ڵ��->current�����ƶ�
				current = current.right;
			else
				//�ڵ��Ѿ�����
				return true;
		}
		return false;
	}

	//----------------------------------------------------------��������
	
	//----------------------------------------------------------������� 1+2
	public void inorder() {
		inorder(root);
	}
	protected void inorder(TreeNode<E> root) {
		if(root==null) return;
		inorder(root.left);
		System.out.print(root.element+" ");
		inorder(root.right);
	}
	//----------------------------------------------------------ǰ����� +12
	public void preorder() {
		preorder(root);
	}
	protected void preorder(TreeNode<E> root) {
		if(root == null) return;
		postorder(root.left);
		postorder(root.right);
		System.out.print(root.element+" ");
	}
	//----------------------------------------------------------������� 12+
	public void postorder() {
		postorder(root);
	}
	protected void postorder(TreeNode<E> root) {
		if(root == null) return;
		
		System.out.print(root.element+" ");
		preorder(root.left);
		preorder(root.right);
	}
	
	//---------------------------------------------------------------------����
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
			//������� 1+2
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
			//Ĭ���������
			return list.get(current++);
		}
		
		public void remove() {
			//ɾ����ǰָ����
			delete(list.get(current));
			list.clear();
			inorder();
		}
	}
	//---------------------------------------------------------------------����
	public ArrayList<TreeNode<E>> path(E e){
		ArrayList<TreeNode<E>> list = new ArrayList<TreeNode<E>>();
		TreeNode<E> current = root;
		while(current != null) {
			list.add(current);
			if(e.compareTo(current.element) < 0)
				//�Ƿ�ȵ�ǰ�ڵ�С->current������
				current = current.left;
			else if(e.compareTo(current.element) >0)
				//�Ǿ��Ǳȵ�ǰ�ڵ��->current�����ƶ�
				current = current.right;
			else
				break;
		}
		return list;
	}

}
