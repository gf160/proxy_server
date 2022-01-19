package com.hamon.main;

import com.hamon.common.ProxyInfoDto;
import com.hamon.h2db.domain.TbProxyInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by Leeyouje on 2020-11-23.
 */
public class PortListenThread extends Thread {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //private ProxyInfoDto proxyInfo;
    private TbProxyInfo proxyInfo;
    private ServerSocket ss = null;

    public PortListenThread(TbProxyInfo _dto){
        logger.debug("PortListener constructor");
        this.proxyInfo = _dto;
    }

    public void run() {
        try{
            ss = new ServerSocket(proxyInfo.getPort());
            logger.info(proxyInfo.getPort() + " Is Ready");

            while(true){
                Socket newClient = ss.accept();
                logger.info("New Client(" + newClient.getInetAddress().toString() + ") Connected");
                String clientIp = newClient.getInetAddress().toString();

                SocketThread clientThread = new SocketThread(newClient, proxyInfo, clientIp);
                clientThread.start();
            }//while(true)
        } catch (IOException ioe){
            ioe.printStackTrace();
        }
    }

    public void closeThread(){
        try{
            ss.close();
        }catch (IOException ioe){
            logger.warn("thread is closed");
        }
    }

}
