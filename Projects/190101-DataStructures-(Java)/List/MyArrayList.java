package List;

import java.util.Iterator;

import Abstract.List_Abstract;

public class MyArrayList<E> extends List_Abstract<E>{
	/*该类是最终的数据结构具体实现类
	 * 	继承了抽象list类(部分实现了通用List接口)
	 * 	在这里我们要实现List接口里的所有方法*/
	
	/*关于一般表ArrayList：
	 * 	1.使用泛型E来检查元素是否能操作
	 * 	2.使用数组来实现
	 * 	3.抽象类中有size：初始为0，既表示大小，也能表示位置*/
	
	//----------------------------------------------------------------初始变量
	
	public static final int INITIAL_CAPACITY = 16;
	private E[] data = (E[]) new Object[INITIAL_CAPACITY];
	//默认运用数组实现线性表
	
	//----------------------------------------------------------------构造方法
	public MyArrayList() {
		//默认大小16
	}
	public MyArrayList(E[] objects) {
		//一个for循环把数组 变成 线性表
		for(int i=0; i<objects.length; i++) {
			add(objects[i]);
		}
	}
	
	//----------------------------------------------------------------增加
	@Override
	public void add(int index, E e) {
		//先保证数组大小是否足够，在进行插入
		ensureCapacity();
		data[size] = e;	//尾插
		size++;
	}
	private void ensureCapacity() {
		if(size>=data.length) {
			E[] newData = (E[]) new Object[size*2];
			System.arraycopy(data, 0, newData, 0, size);
			data = newData;
		}
	}
	
	//----------------------------------------------------------------删除
	@Override
	public void clear() {
		data = (E[]) new Object[INITIAL_CAPACITY];
		size = 0;
	}

	@Override
	public E remove(int index) {
		checkIndex(index);
		E e = data[index];
		
		for(int i=index; i<size-1; i++) {
			data[i]=data[i+1];
		}
		data[size-1]=null;
		size--;
		return e;
	}
	private void checkIndex(int index) {
		if(index<0 || index>=size) {//这是短路或
			//抛出指针越界的异常
			throw new IndexOutOfBoundsException("index"+index+"out of bounds");
		}
	}
	//----------------------------------------------------------------修改
	@Override
	public Object set(int index, E e) {
		checkIndex(index);
		E old = data[index];
		data[index]=e;
		return old;
	}
	
	//----------------------------------------------------------------查询
	@Override
	public boolean contains(E e) {
		for(int i=0; i<size; i++) {
			if(e.equals(data[i])) return true;
		}
		return false;
	}

	@Override
	public E get(int index) {
		checkIndex(index);
		return data[index];
	}

	@Override
	public int indexOf(E e) {
		for(int i=0; i<size; i++) {
			if(e.equals(data[i])) return i;
		}
		return -1;
	}

	@Override
	public int lastIndexOf(E e) {
		for(int i=size-1; i>=0; i--) {
			if(e.equals(data[i])) return i;
		}
		return -1;
	}
	
	//----------------------------------------------------------------新增加方法
		//返回一个array的字符串
		public String toString() {
			StringBuilder result = new StringBuilder("[");
			for(int i=0; i<size; i++) {
				result.append(data[i]);
				if(i<size-1) result.append(",");
			}
			return result.toString()+"]";
		}
		//让size和capacity一致
		public void trimToSize() {
			if(size != data.length) {
				E[] newData = (E[])(new Object[size]);
				System.arraycopy(data, 0, newData, 0, size);
				data = newData;
			}
		}
	
	//----------------------------------------------------------------迭代
	@Override
	public Iterator<E> iterator() {
		return new ArrayListIterator();
	}
	private class ArrayListIterator 
		implements java.util.Iterator<E>{
		private int current = 0;
		
		@Override
		public boolean hasNext() {
			return(current<size);
		}

		@Override
		public E next() {
			return data[current++];
		}
		
		@Override
		public void remove() {
			MyArrayList.this.remove(current);
			//this指当前类
		}
		
	}
	
}
