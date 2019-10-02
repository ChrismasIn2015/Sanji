package Queue;

public class MyPriorityQueue<E extends Comparable<E>> {
	//���ǿ���ʹ�öѣ���������ȶ���
	
	//----------------------------------------------------------------��ʼ����
	private Pre_Heap<E> heap = new Pre_Heap<>();
	
	//----------------------------------------------------------------����
	public void offer(E newObject) {
		heap.add(newObject);
	}
	
	//----------------------------------------------------------------ɾ��
	public E poll() {
		return heap.remove();
	}
	public E remove() {
		return heap.remove();
	}
	//----------------------------------------------------------------�޸�
	//----------------------------------------------------------------��ѯ
	public int getSize() {
		return heap.getSize();
	}

}
