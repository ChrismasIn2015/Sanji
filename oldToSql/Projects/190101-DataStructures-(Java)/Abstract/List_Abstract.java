package Abstract;

import Interface.MyList;

public abstract class List_Abstract<E> implements MyList<E> {
	/*我们用抽象类实现
	 * 	接口里即该数据结构中十分简单的方法*/
	
	protected int size = 0;//元素个数
	
	//-----------------------------------------------------构造方法
	protected List_Abstract() {
		
	}
	protected List_Abstract(E[] objects) {
		//把数组值一个一个加入表中
		for(int i=0; i<objects.length; i++) {
			add(objects[i]);
		}
	}
	
	//-----------------------------------------------------增加
	@Override
	public void add(E e) {
		add(size, e);
	}
	
	//-----------------------------------------------------删除
	@Override
	public boolean remove(E e) {
		if(indexOf(e)>=0) {
			remove(indexOf(e));
			return true;
		}else {
			return false;
		}
	}
	
	//-----------------------------------------------------查询
	@Override
	public int size() {
		return size;
	}
	@Override
	public boolean isEmpty() {
		return size==0;
	}
}
