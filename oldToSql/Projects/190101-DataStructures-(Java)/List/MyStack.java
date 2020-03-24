package List;

import java.util.ArrayList;

public class MyStack<E> {
	/*����ȳ���ջ����ʹ��ArrayListֱ��ʵ��
	 * 	Vector�Ѿ�����ʹ��*/
	
	//-------------------------------------------------------------------��ʼ����
	private ArrayList<E> list = new ArrayList<>();
	
	//-------------------------------------------------------------------����
	public void push(E e) {
		list.add(e);
	}
	//-------------------------------------------------------------------ɾ��
	public E pop() {//�Ƴ�ջ��Ԫ��
		E e = list.get(getSize()-1);
		list.remove(getSize()-1);
		return e;
	}
	//-------------------------------------------------------------------�޸�
	
	//-------------------------------------------------------------------��ѯ
	public boolean isEmpty() {
		return list.isEmpty();
	}
	public int getSize() {
		return list.size();
	}
	public E peek() {//����ջ��Ԫ��
		return list.get(getSize()-1);
	}
	//-------------------------------------------------------------------����
	public String toString() {
		return "Stack: "+list.toString();
	}
}
