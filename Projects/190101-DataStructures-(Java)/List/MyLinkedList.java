package List;

import java.util.Iterator;

import Abstract.List_Abstract;
import Interface.MyQueue;

public class MyLinkedList<E> extends List_Abstract<E>
	implements MyQueue<E>{
	
	//--------------------------------------------------------------初始变量
	private static class Node<E>{//结点
		E element;
		Node<E> next;
		public Node(E element) {
			this.element=element;
		}
	}	
	
	private Node<E> head,tail;
	
	//--------------------------------------------------------------构造方法
	public MyLinkedList() {
		
	}
	public MyLinkedList(E[] objects) {
		super(objects);
	}
	
	//--------------------------------------------------------------增加
	@Override
	public void add(int index, E e) {//下标前插入
		if(index==0) addFirst(e);
		else if(index >= size) addLast(e);
		else {
			Node<E> current = head;
			for(int i=1; i<index; i++) {
				current = current.next;//定位到下标前
			}
			Node<E> temp = current.next;
			current.next = new Node<E>(e);
			(current.next).next=temp;
			size++;
		}
	}
	public void addFirst(E e) {
		Node<E> newNode = new Node<>(e);
		newNode.next = head;
		size++;
		if(tail==null) {
			tail = head;
		}
	}
	public void addLast(E e) {
		Node<E> newNode = new Node<>(e);
		if(tail==null) head = tail = newNode;
		else {
			tail.next = newNode;
			tail = tail.next;
		}
		size++;
	}
	//--------------------------------------------------------------删除
	@Override
	public void clear() {
		size = 0;
		head = tail =null;
	}

	@Override
	public E remove(int index) {
		if(index < 0 || index >= size) return null;
		else if(index == 0) return removeFirst();
		else if(index == size-1) return removeLast();
		else {
			Node<E> previous = head;
			for(int i=1; i<index; i++) {
				previous = previous.next;
			}
			Node<E> current = previous.next;
			previous.next = current.next;
			size--;
			return current.element;
		}
	}
	
	public E removeFirst() {
		if(size==0) return null;
		else{
			Node<E> temp = head;
			head = head.next;
			size--;
			if(head == null) tail=null;
			return temp.element;
		}
	}
	public E removeLast() {
		if(size==0) return null;
		else if(size==1) {
			Node<E> temp = head;
			head = tail = null;
			size = 0;
			return temp.element;
		}else {
			Node<E> current = head;
			for(int i=0; i<size-2; i++) {
				current = current.next;
			}
			Node<E> temp = tail;
			tail = current;
			tail.next = null;
			size--;
			return temp.element;
		}
	}
	//--------------------------------------------------------------修改
	@Override
	public E set(int index, E e) {
		if(index<0 || index>size-1) {
			return null;
		}
		Node<E> current = head;
		for(int i=1; i<index; i++) {
			current = current.next;
		}
		E old = current.element;
		current.element = e;
		return old;
	}
	//--------------------------------------------------------------查询
	@Override
	public boolean contains(E e) {
		if(size==0) return false;
		Node<E> current = head;
		for(int i=1; i<size; i++) {
			if(current.element==e) return true;
		}
		return false;
	}

	@Override
	public E get(int index) {
		if(size==0) return null;
		if(index<0 || index>size-1) return null;
		Node<E> current = head;
		for(int i=1; i<=index; i++) {
			current = current.next;
		}
		return current.element;
	}

	@Override
	public int indexOf(E e) {
		if(size==0) return -1;
		Node<E> current = head;
		for(int i=0; i<size; i++) {
			if(current.element == e) return i;
			current = current.next;
		}
		return -1;
	}

	@Override
	public int lastIndexOf(E e) {
		int index = -1;
		if(size==0) return index;
		Node<E> current = tail;
		for(int i=1; i<size-1; i++) {
			if(current.element == e) index=i;
			current = current.next;
		}
		return index;
	}
	//--------------------------------------------------------------新增方法
		public String toString() {
			StringBuilder result = new StringBuilder("[");
			
			Node<E> current = head;
			for(int i=0; i<size; i++) {
				result.append(current.element);
				current = current.next;
				if(current!=null) {
					result.append(",");
				}else {
					result.append("]");
				}
			}
			return result.toString();
		}
	//--------------------------------------------------------------迭代
	@Override
	public Iterator<E> iterator() {
		return new LinkedListIterator();
	}
	private class LinkedListIterator implements java.util.Iterator<E>{

		private Node<E> current = head;
		int count = 0;
		@Override
		public boolean hasNext() {
			return (current != null);
		}

		@Override
		public E next() {
			E e = current.element;
			current = current.next;
			count++;
			return e;
		}
		
		@Override
		public void remove() {
			MyLinkedList.this.remove(count);
		}
	}
	//--------------------------------------------------------------队列使用
	@Override
	public void offer(E e) {
		addLast(e);
	}
	@Override
	public void poll() {
		removeLast();
	}
	@Override
	public void remove() {
		removeLast();
	}
	@Override
	public E peek() {
		return get(0);
	}

}
