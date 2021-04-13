import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by Leeyouje on 2020-11-20.
 */
public class SocketServerTest {
    public static void main(String[] args) {
        try{

            ServerSocket ss = new ServerSocket(9001);
            Socket socket = ss.accept();
            BufferedReader bufReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            BufferedWriter bufWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));

            while(true){
                String _data = bufReader.readLine();
                if(_data == null){
                    break;
                }

                System.out.println("Message::" + _data);
            }//while(true)

        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
