package investigation;

import java.io.File;

public class PostOrder {
	//一种后续遍历:获取文件目录
	public static void getFileList(String strPath){
		//先打印最后目录，再打印子目录
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
