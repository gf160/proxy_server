package com.hamon.main;

import com.hamon.common.ProxyInfoDto;
import com.hamon.h2db.domain.TbProxyInfo;
import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils;
import jdk.internal.util.xml.impl.Input;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketTimeoutException;

/**
 * Created by Leeyouje on 2020-11-19.
 */
public class SocketThread extends Thread {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //private static final int BUFFER_SIZE = 8192;
    private String clientIp = "";
    private TbProxyInfo proxyInfo = null;
    private Socket socket = null;
    private Socket remoteSocket = null;

    public SocketThread(Socket _socket, TbProxyInfo _dto, String _clientIp) throws IOException{
        logger.debug("SocketThread Constructor(" + _dto.getPort() + ")");
        this.proxyInfo = _dto;
        this.socket = _socket;
        this.clientIp = _clientIp;
    }

//    private void readyAccept() throws IOException {
//        try{
//            remoteSocket = new Socket(this.dstIp, this.dstPort);
//
//
//            bufReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
//            bufWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
//
////            bufWriter.write("remoteServer(" + this.dstIp + ":" + this.dstPort + ")Connecting...");
////            bufWriter.newLine();
////            bufWriter.flush();
////            remoteSocket = new Socket(this.dstIp, this.dstPort);
//            remoteBufWriter = new BufferedWriter(new OutputStreamWriter(remoteSocket.getOutputStream()));
//            remoteBufReader = new BufferedReader(new InputStreamReader(remoteSocket.getInputStream()));
////            bufWriter.write("Connect success");
////            bufWriter.newLine();
//            //bufWriter.flush();
//
//        } catch (SocketTimeoutException ste){
//            logger.error("remote server socket timeout error");
//            bufWriter.write("Connect Fail");
//            bufWriter.newLine();
//            bufWriter.write("Socket closed");
//            bufWriter.newLine();
//            bufWriter.flush();
//            socketClose();
////            if(remoteSocket != null && remoteSocket.isConnected() && !remoteSocket.isClosed()){
////                remoteBufWriter.close();
////                remoteBufReader.close();
////                remoteSocket.close();
////            } else {
////                remoteBufWriter = null;
////                remoteBufReader = null;
////                remoteSocket = null;
////            }
//        } catch (IOException ioe){
//            logger.error("remote server socket is not running");
//            bufWriter.write("Connect Fail");
//            bufWriter.newLine();
//            bufWriter.write("Socket closed");
//            bufWriter.newLine();
//            bufWriter.flush();
//            socketClose();
////            if(remoteSocket != null && remoteSocket.isConnected() && !remoteSocket.isClosed()){
////                remoteBufWriter.close();
////                remoteBufReader.close();
////                remoteSocket.close();
////            } else {
////                remoteBufWriter = null;
////                remoteBufReader = null;
////                remoteSocket = null;
////            }
//        }
//
//        byte[] buffer = new byte[BUFFER_SIZE];
//        while(true){
//            int byteRead = bufReader.read();
//            if(byteRead == -1){
//                socketClose();
//                break;
//            } else {
//                remoteBufWriter.write(buffer,0 , byteRead);
//            }
////            String _data = bufReader.readLine();
////            if(_data == null){
////                socketClose();
////                break;
////            } else {
////                remoteBufWriter.write(_data);
////                remoteBufWriter.newLine();
////                remoteBufWriter.flush();
////                logger.info("send(" + this.port + ")---->Message" + _data);
////            }
//        }//while(true)
//    }

    public void socketClose(){
        try{

            if(remoteSocket != null && remoteSocket.isConnected() && !remoteSocket.isClosed()){
                logger.debug("RemoteSocket close");
                remoteSocket.close();
            }
            remoteSocket = null;

            if(socket != null && socket.isConnected() && !socket.isClosed()){
                logger.debug("Socket close");
                socket.close();
            }
            socket = null;
        }catch (IOException e){
            logger.error("Socket Closing Error!");
            e.printStackTrace();
        } finally {
            remoteSocket = null;
            socket = null;
        }
    }

    private void threadStop(ProxyDataThread _thread){
        if(_thread.getState() != State.TERMINATED && _thread.isRunning()){
            _thread.StopThread();
        }
    }

    public void run() {
        ProxyDataThread clientProxy = null;
        ProxyDataThread remoteProxy = null;
        try {
            InputStream clientIn;
            OutputStream clientOut;

            InputStream remoteIn;
            OutputStream remoteOut;

            this.remoteSocket = new Socket(this.proxyInfo.getDstIp(), this.proxyInfo.getDstPort());
            this.remoteSocket.setKeepAlive(true);

            this.socket.setKeepAlive(true);

            clientIn = this.socket.getInputStream();
            clientOut = this.socket.getOutputStream();

            remoteIn = this.remoteSocket.getInputStream();
            remoteOut = this.remoteSocket.getOutputStream();

            clientProxy = new ProxyDataThread(this, clientIn, remoteOut);
            remoteProxy = new ProxyDataThread(this, remoteIn, clientOut);

            clientProxy.start();
            remoteProxy.start();

            logger.info(getProxyInfoString() + " START!");
        } catch (IOException ioe) {
            //client가 종료
            logger.error("io exception 발생(" + this.proxyInfo.getPort() + ")");
            threadStop(clientProxy);
            threadStop(remoteProxy);

            socketClose();
        } catch (RuntimeException re){
            logger.error("RuntimeException 발생(" + this.proxyInfo.getPort() + ")");
            threadStop(clientProxy);
            threadStop(remoteProxy);

            socketClose();
        } catch (Exception e){
            e.printStackTrace();

            threadStop(clientProxy);
            threadStop(remoteProxy);

            socketClose();
        }
    }

    public String getProxyInfoString(){
        return this.clientIp + " [" + this.proxyInfo.getPort() + " <----> " + this.proxyInfo.getDstIp() + ":" + this.proxyInfo.getDstPort() + "]";
    }
}
