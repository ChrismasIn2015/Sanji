package Interface;

public interface MyList<E> extends java.lang.Iterable<E>{
	/*ʵ��һ�����ݽṹ
	 * 	���������ýӿڶ��������������в���
	 * 	�ӿڶ��������и����ݽṹ��ͨ�ò���*/
	
		//--------------------------------------------------------------����
		public void add(E e);//ʮ�ּ򵥣������ڳ�������ʵ��
		public void add(int index, E e);
		
		//--------------------------------------------------------------ɾ��
		public void clear();
		public boolean remove(E e);//ʮ�ּ򵥣������ڳ�������ʵ��
		public E remove(int index);
		
		//--------------------------------------------------------------�޸�
		public Object set(int index, E e);
		
		//--------------------------------------------------------------��ѯ
		public int size();//abstract
		public boolean isEmpty();//ʮ�ּ򵥣������ڳ�������ʵ��
		public boolean contains(E e);
		public E get(int index);
		public int indexOf(E e);
		public int lastIndexOf(E e);
}
