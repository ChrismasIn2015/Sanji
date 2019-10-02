package investigation;

import java.io.File;

public class PreOrder {
	//一种前序遍历:获取文件目录
	public static void getFileList(String strPath){
		//先打印第一目录，再打印子目录
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
	//仅获得文件
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
