package investigation;

public class BinarySearch {
	
	public int binarySearch(int[] array, int element) {
	    int left = 0;
	    int right = array.length - 1;

	    // ��������� <=
	    while (left <= right) {
	        int mid = (left + right) / 2;
	        if (array[mid] == element) {
	            return mid;
	        }else if (array[mid] < element) {
	        	//����һ��Ϊ��
	            left = mid + 1;
	        }else {
	            right = mid - 1;
	        }
	    }
	    return -1;
	}
}
