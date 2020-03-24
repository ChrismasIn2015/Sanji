package investigation;

public interface Tree<E> extends Iterable<E> {
	
	//------------------------------------------------------����
	public boolean insert(E e);
	
	//------------------------------------------------------ɾ��
	public boolean delete(E e);
	
	//------------------------------------------------------�޸�
	//------------------------------------------------------��ѯ
	public boolean isEmpty();
	public int getSize();
	public boolean search(E e);
	
	//------------------------------------------------------����
	public void inorder();
	public void preorder();
	public void postorder();
	
}
