package investigation;

import java.io.File;

public class PostOrder {
	//һ�ֺ�������:��ȡ�ļ�Ŀ¼
	public static void getFileList(String strPath){
		//�ȴ�ӡ���Ŀ¼���ٴ�ӡ��Ŀ¼
		File f=new File(strPath);
		System.out.println(f.getAbsolutePath());
        if(f.isDirectory()){ 
			File[] fs=f.listFiles();
			for(int i=fs.length-1; i>=0; i--){
				String fsPath=fs[i].getAbsolutePath();
				getFileList(fsPath);
			}
		}
	}
}
