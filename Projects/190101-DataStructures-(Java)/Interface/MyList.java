package Interface;

public interface MyList<E> extends java.lang.Iterable<E>{
	/*实现一种数据结构
	 * 	我们首先用接口定义它包含的所有操作
	 * 	接口定义了所有该数据结构的通用操作*/
	
		//--------------------------------------------------------------增加
		public void add(E e);//十分简单，可以在抽象类中实现
		public void add(int index, E e);
		
		//--------------------------------------------------------------删除
		public void clear();
		public boolean remove(E e);//十分简单，可以在抽象类中实现
		public E remove(int index);
		
		//--------------------------------------------------------------修改
		public Object set(int index, E e);
		
		//--------------------------------------------------------------查询
		public int size();//abstract
		public boolean isEmpty();//十分简单，可以在抽象类中实现
		public boolean contains(E e);
		public E get(int index);
		public int indexOf(E e);
		public int lastIndexOf(E e);
}
