package Abstract;

import Interface.MyList;

public abstract class List_Abstract<E> implements MyList<E> {
	/*�����ó�����ʵ��
	 * 	�ӿ��Ｔ�����ݽṹ��ʮ�ּ򵥵ķ���*/
	
	protected int size = 0;//Ԫ�ظ���
	
	//-----------------------------------------------------���췽��
	protected List_Abstract() {
		
	}
	protected List_Abstract(E[] objects) {
		//������ֵһ��һ���������
		for(int i=0; i<objects.length; i++) {
			add(objects[i]);
		}
	}
	
	//-----------------------------------------------------����
	@Override
	public void add(E e) {
		add(size, e);
	}
	
	//-----------------------------------------------------ɾ��
	@Override
	public boolean remove(E e) {
		if(indexOf(e)>=0) {
			remove(indexOf(e));
			return true;
		}else {
			return false;
		}
	}
	
	//-----------------------------------------------------��ѯ
	@Override
	public int size() {
		return size;
	}
	@Override
	public boolean isEmpty() {
		return size==0;
	}
}
