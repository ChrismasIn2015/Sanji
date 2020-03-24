package Map;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

import Interface.MyMap;

public class MyHashMap<K,V> implements MyMap<K,V>{

	//ʹ������ַ��ʵ��HMap
	//------------------------------------------------------��ʼ����
	private static int DEFAULT_INITIAL_CAPACITY = 4;//�趨��ʼ������Ϊʲôһ��Ҫ��2�ı���
	private static int MAXIMUM_CAPACITY = 1 << 30;//�趨������������=2^30,Ϊʲô��
	private int capacity;//���ϵ�����
	private static float DEFAULT_MAX_LOAD_FACTOR = 0.75f;//��ֵ���һ��f��ʾ��float���͵�
	private float loadFactorThreshold;
	private int size = 0;
	
	private LinkedList<MyMap.Entry<K, V>>[] table;//һ������Entry������
	
	//-------------------------------------------------------------------���췽��
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
	private int trimToPowerOf2(int initialCapacity) {//-----��������
		int capacity = 1;
		while(capacity < initialCapacity) {
			capacity <<= 1;//�ȼ���capacity *= 2������λ������Ӹ�Ч��
		}
		return capacity;
	}
		
	//------------------------------------------------------����
	@Override
	public V put(K key, V value) {
		//���ظ�
		if(get(key) != null) {
			int bucketIndex = hash(key.hashCode());
			LinkedList<Entry<K, V>> bucket = table[bucketIndex];
			//�����ظ�
			for(Entry<K, V> entry: bucket) {
				if(entry.getKey().equals(key)) {
					//�ؼ�����ͬ���滻
					V oldValue = entry.getValue();
					entry.value = value;
					return oldValue;
				}	
			}
		}
		//������Χ
		if(size >= capacity * loadFactorThreshold){
			if(capacity == MAXIMUM_CAPACITY)
				throw new RuntimeException("�������Χ");
			rehash();//���
		}
		int bucketIndex = hash(key.hashCode());
		if(table[bucketIndex] == null) {
			table[bucketIndex] = new LinkedList<Entry<K, V>>();
		}
		table[bucketIndex].add(new MyMap.Entry<K, V>(key, value));
		size++;
		return value;
	}
	//��������
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

	//------------------------------------------------------ɾ��
	@Override
	public void remove(K key) {
		
	}

	@Override
	public void clear() {
		size = 0;
		removeEntry();
	}
	//��������
	private void removeEntry() {
		for(int i=0; i<capacity; i++) {
			if(table[i] != null) {
				table[i].clear();//����
			}
		}
	}
	//------------------------------------------------------�޸�
	//------------------------------------------------------��ѯ
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
		int bucketIndex = hash(key.hashCode());//����hash�õ�hash��
		if(table[bucketIndex] != null) {
			LinkedList<Entry<K, V>> bucket = table[bucketIndex];
			for(Entry<K, V> entry: bucket) {
				if(entry.getKey().equals(key))
					return entry.getValue();
			}
		}
		return null;
	}
	//��������
	private int hash(int hashCode) {
		return supplementalHash(hashCode) & (capacity - 1);//��λ��:һ��λ����
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
