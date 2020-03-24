package Set;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;

import Interface.MySet;

public class MyHashSet<E> implements MySet<E>{
	
	//-------------------------------------------------------------------初始变量
	private static int DEFAULT_INITIAL_CAPACITY = 4;//设定初始数量：为什么一定要是2的倍数
	private static int MAXIMUM_CAPACITY = 1 << 30;//设定最大数量：最大=2^30,为什么？
	private int capacity;//集合的容量
	private static float DEFAULT_MAX_LOAD_FACTOR = 0.75f;//数值后跟一个f表示是float类型的
	private float loadFactorThreshold;
	private int size = 0;
	
	private LinkedList<E>[] table;//一个都是链表的数组

	//-------------------------------------------------------------------构造方法
	public MyHashSet() {
		this(DEFAULT_INITIAL_CAPACITY, DEFAULT_MAX_LOAD_FACTOR);
	}
	
	public MyHashSet(int initialCapacity) {
		this(initialCapacity, DEFAULT_MAX_LOAD_FACTOR);
	}

	public MyHashSet(int initialCapacity, float loadFactorThreshold) {
		if(initialCapacity > MAXIMUM_CAPACITY)
			this.capacity = MAXIMUM_CAPACITY;
		else
			this.capacity = trimToPowerOf2(initialCapacity);
		this.loadFactorThreshold = loadFactorThreshold;
		table = new LinkedList[capacity];
	}
	private int trimToPowerOf2(int initialCapacity) {//-----辅助方法
		int capacity = 1;
		while(capacity < initialCapacity) {
			capacity <<= 1;//等价于capacity *= 2，但是位运算更加高效；
		}
		return capacity;
	}
	
	//-------------------------------------------------------------------增加
	@Override
	public boolean add(E e) {
		if(contains(e))//不重复
			return false;
		if(size+1 > capacity*loadFactorThreshold) {
			if(capacity == MAXIMUM_CAPACITY)
				throw new RuntimeException("Exceeding maximum capacity");
			rehash();
		}
		
		int bucketIndex = hash(e.hashCode());
		
		if(table[bucketIndex] == null) {
			table[bucketIndex] = new LinkedList<E>();
		}
		
		table[bucketIndex].add(e);
		size++;
		return true;
	}
	private void rehash() {
		ArrayList<E> list = setToList();
		capacity <<= 1;
		table = new LinkedList[capacity];
		size=0;
		
		for(E element: list) {
			add(element);
		}
		
	}
	private ArrayList<E> setToList(){
		//本方法把Set里的值全部放到List里
		ArrayList<E> list = new ArrayList<>();
		for(int i=0; i<capacity; i++) {
			if(table[i] != null) {
				for(E e: table[i])
					list.add(e);
			}
		}
		return list;
	}
	//-------------------------------------------------------------------初始变量
	@Override
	public boolean remove(E e) {
		if(!contains(e))
			return false;
		int bucketIndex = hash(e.hashCode());
		
		if(table[bucketIndex] != null) {
			LinkedList<E> bucket = table[bucketIndex];
			for(E element: bucket) {
				if(e.equals(element)) {
					bucket.remove(element);
					break;
				}
			}
		}
		size--;
		return true;
	}

	@Override
	public void clear() {
		size = 0;
		removeElements();
	}
	private void removeElements() {//------------------------辅助方法
		for(int i=0; i<capacity; i++) {
			if(table[i] != null)
				table[i].clear();
		}
	}
	//-------------------------------------------------------------------修改
	//-------------------------------------------------------------------查询
	@Override
	public int size() {
		return size;
	}

	@Override
	public boolean isEmpty() {
		return size == 0;
	}

	@Override
	public boolean contains(E e) {
		int bucketIndex = hash(e.hashCode());
		if(table[bucketIndex] != null) {
			LinkedList<E> bucket = table[bucketIndex];
			for(E element: bucket) {
				if(element.equals(e))
					return true;
			}
		}
		return false;
	}
	private int hash(int hashCode) {//--------------------------辅助方法
		return supplementalHash(hashCode) & (capacity-1);
	}
	private static int supplementalHash(int h) { //保证分布均匀？？？
		h ^= (h>>20)^(h >>> 12);
		return h ^ (h>>>7) ^ (h >>> 4);
	}
	//-------------------------------------------------------------------迭代
	@Override
	public Iterator<E> iterator() {
		return new MyHashSetIterator(this);//this=调用方
	}
	private class MyHashSetIterator implements Iterator<E>{
		
		private ArrayList<E> list;
		private int current = 0;
		private MyHashSet<E> set;
		
		public MyHashSetIterator(MyHashSet<E> set) {
			this.set = set;
			list = setToList();
		}
		
		@Override
		public boolean hasNext() {
			if(current < list.size())
				return true;
			return false;
		}

		@Override
		public E next() {
			return list.get(current++);
		}
		
		public void remove() {
			set.remove(list.get(current));
			list.remove(current);
		}
		
	}
	
}
