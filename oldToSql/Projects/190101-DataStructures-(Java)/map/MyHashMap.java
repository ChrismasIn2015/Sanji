package Map;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

import Interface.MyMap;

public class MyHashMap<K,V> implements MyMap<K,V>{

	//使用链地址法实现HMap
	//------------------------------------------------------初始变量
	private static int DEFAULT_INITIAL_CAPACITY = 4;//设定初始数量：为什么一定要是2的倍数
	private static int MAXIMUM_CAPACITY = 1 << 30;//设定最大数量：最大=2^30,为什么？
	private int capacity;//集合的容量
	private static float DEFAULT_MAX_LOAD_FACTOR = 0.75f;//数值后跟一个f表示是float类型的
	private float loadFactorThreshold;
	private int size = 0;
	
	private LinkedList<MyMap.Entry<K, V>>[] table;//一个都是Entry的数组
	
	//-------------------------------------------------------------------构造方法
	public MyHashMap() {
		this(DEFAULT_INITIAL_CAPACITY, DEFAULT_MAX_LOAD_FACTOR);
	}
	
	public MyHashMap(int initialCapacity) {
		this(initialCapacity, DEFAULT_MAX_LOAD_FACTOR);
	}

	public MyHashMap(int initialCapacity, float loadFactorThreshold) {
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
		
	//------------------------------------------------------增加
	@Override
	public V put(K key, V value) {
		//键重复
		if(get(key) != null) {
			int bucketIndex = hash(key.hashCode());
			LinkedList<Entry<K, V>> bucket = table[bucketIndex];
			//当键重复
			for(Entry<K, V> entry: bucket) {
				if(entry.getKey().equals(key)) {
					//关键字相同就替换
					V oldValue = entry.getValue();
					entry.value = value;
					return oldValue;
				}	
			}
		}
		//超出范围
		if(size >= capacity * loadFactorThreshold){
			if(capacity == MAXIMUM_CAPACITY)
				throw new RuntimeException("超出最大范围");
			rehash();//变大
		}
		int bucketIndex = hash(key.hashCode());
		if(table[bucketIndex] == null) {
			table[bucketIndex] = new LinkedList<Entry<K, V>>();
		}
		table[bucketIndex].add(new MyMap.Entry<K, V>(key, value));
		size++;
		return value;
	}
	//辅助方法
	private void rehash() {
		Set<Entry<K, V>> set = entrySet();
		capacity <<= 1;
		table = new LinkedList[capacity];
		size = 0;
		for(Entry<K, V> entry: set) {
			put(entry.getKey(), entry.getValue());
		}
	}
	public Set<MyMap.Entry<K, V>> entrySet(){
		Set<MyMap.Entry<K, V>> set = new HashSet<>();
		for(int i=0; i<capacity; i++) {
			if(table[i] != null) {
				LinkedList<Entry<K, V>> bucket = table[i];
				for(Entry<K, V> entry: bucket) {
					set.add(entry);
				}
			}
		}
		return set;
	}

	//------------------------------------------------------删除
	@Override
	public void remove(K key) {
		
	}

	@Override
	public void clear() {
		size = 0;
		removeEntry();
	}
	//辅助方法
	private void removeEntry() {
		for(int i=0; i<capacity; i++) {
			if(table[i] != null) {
				table[i].clear();//链表
			}
		}
	}
	//------------------------------------------------------修改
	//------------------------------------------------------查询
	@Override
	public int size() {
		return size;
	}

	@Override
	public boolean isEmpty() {
		return size==0;
	}

	@Override
	public V get(K key) {
		int bucketIndex = hash(key.hashCode());//二次hash得到hash码
		if(table[bucketIndex] != null) {
			LinkedList<Entry<K, V>> bucket = table[bucketIndex];
			for(Entry<K, V> entry: bucket) {
				if(entry.getKey().equals(key))
					return entry.getValue();
			}
		}
		return null;
	}
	//辅助方法
	private int hash(int hashCode) {
		return supplementalHash(hashCode) & (capacity - 1);//按位与:一种位运算
	}
	private static int supplementalHash(int h) {
		h ^= (h >>> 20) ^ (h >>> 12);
		return h ^ (h >>> 7) ^ (h >>> 4);
	}
	//------------------------------------------------------
	@Override
	public boolean containsKey(K key) {
		if(get(key) != null) return true;
		else return false;
	}

	@Override
	public boolean containsValue(V value) {
		for(int i=0; i<capacity; i++) {
			if(table[i] != null) {
				LinkedList<Entry<K, V>> bucket = table[i];
				for(Entry<K, V> entry: bucket) {
					if(entry.getValue().equals(value)) return true;
				}
			}
		}
		return false;
	}
	//------------------------------------------------------
	@Override
	public Set<K> keySet() {
		Set<K> set = new HashSet<K>();
		for(int i=0; i<capacity; i++) {
			if(table[i] != null) {
				LinkedList<Entry<K, V>> bucket = table[i];
				for(Entry<K, V> entry: bucket) {
					set.add(entry.getKey());
				}
			}
		}
		return set;
	}

	@Override
	public Set<V> values() {
		Set<V> set = new HashSet<V>();
		for(int i=0; i<capacity; i++) {
			if(table[i] != null) {
				LinkedList<Entry<K, V>> bucket = table[i];
				for(Entry<K, V> entry: bucket) {
					set.add(entry.getValue());
				}
			}
		}
		return set;
	}

}
