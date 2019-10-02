package investigation;

public interface Tree<E> extends Iterable<E> {
	
	//------------------------------------------------------增加
	public boolean insert(E e);
	
	//------------------------------------------------------删除
	public boolean delete(E e);
	
	//------------------------------------------------------修改
	//------------------------------------------------------查询
	public boolean isEmpty();
	public int getSize();
	public boolean search(E e);
	
	//------------------------------------------------------迭代
	public void inorder();
	public void preorder();
	public void postorder();
	
}
