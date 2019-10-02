package Queue;

import java.util.ArrayList;

public class Pre_Heap<E extends Comparable<E>>{
	//堆是一种/近似完全二叉树,使用数组来实现
	//左右无序，最大值在最上方
	
	//-----------------------------------------------------------------------------------初始变量
	private ArrayList<E> list = new ArrayList<>();
	
	//-----------------------------------------------------------------------------------构造方法
	public Pre_Heap() {
	}
	public Pre_Heap(E[] objects) {
		for(int i=0; i<objects.length; i++) {
			add(objects[i]);
		}
	}
	
	//-----------------------------------------------------------------------------------增加
	public void add(E newObject) {
		//把新元素放到最后的地方
		list.add(newObject);
		int currentIndex = list.size()-1;//最后一个结点
		
		while(currentIndex > 0) {
			int parentIndex = (currentIndex-1)/2;
			if(list.get(currentIndex).compareTo(list.get(parentIndex)) >0) {
				//比父节点大：交换
				E temp = list.get(currentIndex);
				list.set(currentIndex, list.get(parentIndex));//←
				list.set(parentIndex, temp);
			}else{
				break;
			}
			currentIndex = parentIndex;
		}
	}
	//-----------------------------------------------------------------------------------删除最大值：root
	public E remove() {
		/*1.顶层元素归零，最后一个元素放在顶层
		 *2.规定：如果左子树超出/等于范围：已经到了底层
		 * */
		if(list.size() == 0) return null;
		
		E removedObject = list.get(0);
		list.set(0, list.get(list.size()-1));
		list.remove(list.size()-1);
		
		int currentIndex = 0;
		while(currentIndex < list.size()) {
			int leftChildIndex = 2*currentIndex +1;
			int rightChildIndex = 2*currentIndex +2;
				
			if(leftChildIndex >= list.size()) break;
			
			int maxIndex = leftChildIndex;
			
			if(rightChildIndex < list.size()) {
				if(list.get(maxIndex).compareTo(list.get(rightChildIndex)) < 0) {
					//左右不相等
					maxIndex = rightChildIndex;
				}
			}
			if(list.get(currentIndex).compareTo(list.get(maxIndex)) < 0) {
				//上下不相等 & 上<下
				E temp = list.get(maxIndex);
				list.set(maxIndex, list.get(currentIndex));
				list.set(currentIndex, temp);
				currentIndex = maxIndex;
			}else
				break;
		}
		return removedObject;
	}
	//-----------------------------------------------------------------------------------修改
	//-----------------------------------------------------------------------------------查询
	public int getSize() {
		return list.size();
	}
}

