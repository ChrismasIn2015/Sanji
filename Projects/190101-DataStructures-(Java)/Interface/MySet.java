package Interface;

public interface MySet<E> extends java.lang.Iterable<E>{
	
	
	//------------------------------------------------------����
	public boolean add(E e);
	
	//------------------------------------------------------ɾ��
	public boolean remove(E e);//�����������
	public void clear();
	
	//------------------------------------------------------�޸�
	
	//------------------------------------------------------��ѯ
	public int size();
	public boolean isEmpty();
	public boolean contains(E e);
}
