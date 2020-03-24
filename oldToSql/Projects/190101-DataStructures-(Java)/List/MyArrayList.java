package List;

import java.util.Iterator;

import Abstract.List_Abstract;

public class MyArrayList<E> extends List_Abstract<E>{
	/*���������յ����ݽṹ����ʵ����
	 * 	�̳��˳���list��(����ʵ����ͨ��List�ӿ�)
	 * 	����������Ҫʵ��List�ӿ�������з���*/
	
	/*����һ���ArrayList��
	 * 	1.ʹ�÷���E�����Ԫ���Ƿ��ܲ���
	 * 	2.ʹ��������ʵ��
	 * 	3.����������size����ʼΪ0���ȱ�ʾ��С��Ҳ�ܱ�ʾλ��*/
	
	//----------------------------------------------------------------��ʼ����
	
	public static final int INITIAL_CAPACITY = 16;
	private E[] data = (E[]) new Object[INITIAL_CAPACITY];
	//Ĭ����������ʵ�����Ա�
	
	//----------------------------------------------------------------���췽��
	public MyArrayList() {
		//Ĭ�ϴ�С16
	}
	public MyArrayList(E[] objects) {
		//һ��forѭ�������� ��� ���Ա�
		for(int i=0; i<objects.length; i++) {
			add(objects[i]);
		}
	}
	
	//----------------------------------------------------------------����
	@Override
	public void add(int index, E e) {
		//�ȱ�֤�����С�Ƿ��㹻���ڽ��в���
		ensureCapacity();
		data[size] = e;	//β��
		size++;
	}
	private void ensureCapacity() {
		if(size>=data.length) {
			E[] newData = (E[]) new Object[size*2];
			System.arraycopy(data, 0, newData, 0, size);
			data = newData;
		}
	}
	
	//----------------------------------------------------------------ɾ��
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
		if(index<0 || index>=size) {//���Ƕ�·��
			//�׳�ָ��Խ����쳣
			throw new IndexOutOfBoundsException("index"+index+"out of bounds");
		}
	}
	//----------------------------------------------------------------�޸�
	@Override
	public Object set(int index, E e) {
		checkIndex(index);
		E old = data[index];
		data[index]=e;
		return old;
	}
	
	//----------------------------------------------------------------��ѯ
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
	
	//----------------------------------------------------------------�����ӷ���
		//����һ��array���ַ���
		public String toString() {
			StringBuilder result = new StringBuilder("[");
			for(int i=0; i<size; i++) {
				result.append(data[i]);
				if(i<size-1) result.append(",");
			}
			return result.toString()+"]";
		}
		//��size��capacityһ��
		public void trimToSize() {
			if(size != data.length) {
				E[] newData = (E[])(new Object[size]);
				System.arraycopy(data, 0, newData, 0, size);
				data = newData;
			}
		}
	
	//----------------------------------------------------------------����
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
			//thisָ��ǰ��
		}
		
	}
	
}
