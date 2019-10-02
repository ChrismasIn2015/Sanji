package Interface;

import java.util.Set;

public interface MyMap<K,V> {
	//----------------------------------------------------------------增加
	public V put(K key, V value);
	//----------------------------------------------------------------删除
	public void remove(K key);
	public void clear();
	//----------------------------------------------------------------修改
	//----------------------------------------------------------------查询
	public int size();
	public boolean isEmpty();
	public V get(K key);
	//-------------------------------------------------------------------
	public boolean containsKey(K key);
	public boolean containsValue(V value);
	//-------------------------------------------------------------------
	public Set<Entry<K,V>> entrySet();
	public Set<K> keySet();
	public Set<V> values();
	//-------------------------------------------------------------------
	public static class Entry<K,V>{
		//一条记录
		K key;
		public V value;
		
		public Entry(K key, V value) {
			//设置
			this.key = key;
			this.value = value;
		}
		
		public K getKey() {
			return key;
		}
		public V getValue() {
			return value;
		}
		public String toString() {
			return "["+key+","+value+"]";
		}
	}
}
