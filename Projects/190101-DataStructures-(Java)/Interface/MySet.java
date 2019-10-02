package Interface;

public interface MySet<E> extends java.lang.Iterable<E>{
	
	
	//------------------------------------------------------增加
	public boolean add(E e);
	
	//------------------------------------------------------删除
	public boolean remove(E e);//集合是无序的
	public void clear();
	
	//------------------------------------------------------修改
	
	//------------------------------------------------------查询
	public int size();
	public boolean isEmpty();
	public boolean contains(E e);
}
