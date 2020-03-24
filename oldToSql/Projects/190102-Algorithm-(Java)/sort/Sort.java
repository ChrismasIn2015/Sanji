package sort;

public class Sort {
	//我想用这个类封装排序算法,默认对数组进行从小到大排序
	
	//------------------------------------------------------------------选择排序
	public static void selectionSort(Integer[] array) {
		//选择排序：找出最小数，放在最前面
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
	//------------------------------------------------------------------插入排序
	public static void insertionSort(Integer[] array) {
		//插入排序：遍历后排数组
		//对每个遍历到的数值选择最合适的位置
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

	//------------------------------------------------------------------冒泡排序:似乎比选择和插入更慢
	public static void bubbleSort(Integer[] array) {
		//把最大数放在最后面
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

	//------------------------------------------------------------------归并排序:用额外数组空间换时间似乎最快
	public static void mergeSort(Integer[] list) {
		//使用归并方法进行排序
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
		//归并两个数组
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

	//------------------------------------------------------------------快速排序:略慢于归并，但占用空间小（最优）
	public static void quickSort(Integer[] list) {
		quickSort(list,0,list.length-1);//表头作为pivot
	}
	
	public static void quickSort(Integer[] list, Integer first, Integer last) {
		if(last>first) {
			Integer pivotIndex = partition(list, first, last);
			quickSort(list,first,pivotIndex-1);
			quickSort(list,pivotIndex+1,last);
		}
	}
	
	public static int partition(Integer[] list, Integer first, Integer last) {
		//这个方法用于找到主元合适的位置,并使数组满足小,主元,大的条件
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

	//------------------------------------------------------------------堆排序:略慢于快速排序，当不需要额外的空间，但好像对cache不友好
	public static <E extends Comparable<E>> void heapSort(E[] list) {
		Heap<E> heap = new Heap<>();
		for(int i=0; i<list.length; i++) {
			heap.add(list[i]);
		}
		for(int i=list.length-1; i>=0; i--) {
			list[i] = heap.remove();
		}
	}

	//------------------------------------------------------------------桶排序:对整数排序十分高效
	//------------------------------------------------------------------基数排序:使用十个桶
	//------------------------------------------------------------------外部排序：归并排序的一种变体
	
}
