package investigation;

import java.io.File;

public class PreOrder {
	//һ��ǰ�����:��ȡ�ļ�Ŀ¼
	public static void getFileList(String strPath){
		//�ȴ�ӡ��һĿ¼���ٴ�ӡ��Ŀ¼
		File f=new File(strPath);
		System.out.println(f.getAbsolutePath());
        if(f.isDirectory()){ 
			File[] fs=f.listFiles();
			for(int i=0;i<fs.length;i++){
				String fsPath=fs[i].getAbsolutePath();
				getFileList(fsPath);
			}
		}
	}
	//������ļ�
	public static void getFile(String strPath){
		File f = new File(strPath);
		File[] fs = f.listFiles();
		for(int i=0;i<fs.length;i++){
			if(fs[i].isFile()) {
				System.out.println(fs[i]);
			}
			if(fs[i].isDirectory()) {
				String fsPath=fs[i].getAbsolutePath();
				getFile(fsPath);
			}
		}
	}
}
