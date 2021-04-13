import java.io.*;
import java.net.Socket;

/**
 * Created by Leeyouje on 2020-11-19.
 */
public class socketClientTest {

    public static void main(String[] args) {
        Socket socket = null;

        try{
            socket = new Socket("10.1.2.27", 9000);

            BufferedWriter bufWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            BufferedReader bufReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            new Thread(){

                public void run(){
                    try{
                        while(true){
                            String _data = bufReader.readLine();
                            if(_data == null){
                                break;
                            } else {
                                System.out.println("Message" + _data);
                            }
                        }//while(true)
                    } catch (IOException e){
                        e.printStackTrace();
                    }
                }
            }.start();

            if(!socket.isClosed() && socket.isConnected()){
                for(int i = 0 ; i < 10 ; i++){
                    bufWriter.write("hello world(" + i + ")");
                    System.out.println("Message : hello world(" + i + ")");
                    bufWriter.newLine();
                    bufWriter.flush();
                    Thread.sleep(1000);
                }//for end(i)
            }

//            BufferedReader bufReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
//            String _message = bufReader.readLine();
//            System.out.println("Message :" + _message);

            socket.close();
            bufReader.close();
            bufWriter.close();
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
