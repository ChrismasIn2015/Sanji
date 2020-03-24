package sort;

public class Sort {
	//������������װ�����㷨,Ĭ�϶�������д�С��������
	
	//------------------------------------------------------------------ѡ������
	public static void selectionSort(Integer[] array) {
		//ѡ�������ҳ���С����������ǰ��
		if(array == null || array.length==0) 
			return;
		
		for(int a=0; a<array.length-1; a++) {
			for(int b=a+1; b<array.length; b++) {
				int temp;
				if(array[a] > array[b]) {
					temp = array[a];
					array[a] = array[b];
					array[b] = temp;
				}
			}
		}
	}
	//------------------------------------------------------------------��������
	public static void insertionSort(Integer[] array) {
		//�������򣺱�����������
		//��ÿ������������ֵѡ������ʵ�λ��
		if(array==null || array.length==0) return;
		for(int i=1; i<array.length; i++) {
			int currentElement = array[i];
			int k;
			for(k=i-1; k>=0 && array[k]>currentElement; k--) {
				array[k+1] = array[k];
			}
			array[k+1] = currentElement;
		}
	}

	//------------------------------------------------------------------ð������:�ƺ���ѡ��Ͳ������
	public static void bubbleSort(Integer[] array) {
		//����������������
		int temp;
		boolean needNextPass = true;
		for(int i=1; i<array.length && needNextPass; i++) {
			needNextPass = false;
			for(int k=0; k<array.length-i; k++) {
				if(array[k] > array[k+1]) {
					temp = array[k];
					array[k] = array[k+1];
					array[k+1] = temp;
				}
				needNextPass = true;
			}
		}
	}

	//------------------------------------------------------------------�鲢����:�ö�������ռ任ʱ���ƺ����
	public static void mergeSort(Integer[] list) {
		//ʹ�ù鲢������������
		if(list.length>1) {
			Integer[] firstHalf = new Integer[list.length/2];
			System.arraycopy(list, 0, firstHalf, 0, list.length/2);
			mergeSort(firstHalf);
			
			int secondHalfLength = list.length-list.length/2;
			Integer[] secondHalf = new Integer[secondHalfLength];
			System.arraycopy(list, list.length/2, secondHalf, 0, secondHalfLength);
			mergeSort(secondHalf);
			
			merge(firstHalf, secondHalf, list);
		}
	}
	private static void merge(Integer[] list1, Integer[] list2, Integer[] temp) {
		//�鲢��������
		int current1 = 0;
		int current2 = 0;
		int current3 = 0;
		
		while(current1<list1.length && current2<list2.length) {
			if(list1[current1] < list2[current2])
				temp[current3++] = list1[current1++];
			else
				temp[current3++] = list2[current2++];
		}
		while(current1<list1.length) {
			temp[current3++] = list1[current1++];
		}
		while(current2<list2.length) {
			temp[current3++] = list2[current2++];
		}
	}

	//------------------------------------------------------------------��������:�����ڹ鲢����ռ�ÿռ�С�����ţ�
	public static void quickSort(Integer[] list) {
		quickSort(list,0,list.length-1);//��ͷ��Ϊpivot
	}
	
	public static void quickSort(Integer[] list, Integer first, Integer last) {
		if(last>first) {
			Integer pivotIndex = partition(list, first, last);
			quickSort(list,first,pivotIndex-1);
			quickSort(list,pivotIndex+1,last);
		}
	}
	
	public static int partition(Integer[] list, Integer first, Integer last) {
		//������������ҵ���Ԫ���ʵ�λ��,��ʹ��������С,��Ԫ,�������
		int pivot = list[first];
		int low = first+1;
		int high = last;
		
		while(high>low) {
			while(low<=high && list[low]<=pivot) 
				low++;
			while(low<=high && list[high]>pivot)
				high--;
			if(high>low) {
				int temp = list[high];
				list[high] = list[low];
				list[low] = temp;
			}
		}
		while(high>first && list[high]>=pivot) high--;
		
		if(pivot>list[high]) {
			list[first] = list[high];
			list[high] = pivot;
			return high;
		}else {
			return first;
		}
	}

	//------------------------------------------------------------------������:�����ڿ������򣬵�����Ҫ����Ŀռ䣬�������cache���Ѻ�
	public static <E extends Comparable<E>> void heapSort(E[] list) {
		Heap<E> heap = new Heap<>();
		for(int i=0; i<list.length; i++) {
			heap.add(list[i]);
		}
		for(int i=list.length-1; i>=0; i--) {
			list[i] = heap.remove();
		}
	}

	//------------------------------------------------------------------Ͱ����:����������ʮ�ָ�Ч
	//------------------------------------------------------------------��������:ʹ��ʮ��Ͱ
	//------------------------------------------------------------------�ⲿ���򣺹鲢�����һ�ֱ���
	
}
