package Queue;

public class MyPriorityQueue<E extends Comparable<E>> {
	//我们可以使用堆，来完成优先队列
	
	//----------------------------------------------------------------初始变量
	private Pre_Heap<E> heap = new Pre_Heap<>();
	
	//----------------------------------------------------------------增加
	public void offer(E newObject) {
		heap.add(newObject);
	}
	
	//----------------------------------------------------------------删除
	public E poll() {
		return heap.remove();
	}
	public E remove() {
		return heap.remove();
	}
	//----------------------------------------------------------------修改
	//----------------------------------------------------------------查询
	public int getSize() {
		return heap.getSize();
	}

}
