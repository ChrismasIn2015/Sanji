package List;

import java.util.ArrayList;

public class MyStack<E> {
	/*后进先出的栈可以使用ArrayList直接实现
	 * 	Vector已经不再使用*/
	
	//-------------------------------------------------------------------初始变量
	private ArrayList<E> list = new ArrayList<>();
	
	//-------------------------------------------------------------------增加
	public void push(E e) {
		list.add(e);
	}
	//-------------------------------------------------------------------删除
	public E pop() {//移除栈顶元素
		E e = list.get(getSize()-1);
		list.remove(getSize()-1);
		return e;
	}
	//-------------------------------------------------------------------修改
	
	//-------------------------------------------------------------------查询
	public boolean isEmpty() {
		return list.isEmpty();
	}
	public int getSize() {
		return list.size();
	}
	public E peek() {//返回栈顶元素
		return list.get(getSize()-1);
	}
	//-------------------------------------------------------------------增加
	public String toString() {
		return "Stack: "+list.toString();
	}
}
