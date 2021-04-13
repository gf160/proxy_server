package com.hamon.main;

import jdk.internal.util.xml.impl.Input;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.util.resources.cldr.pa.CurrencyNames_pa;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by Leeyouje on 2020-11-23.
 */
public class ProxyDataThread extends Thread {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final int BUFFER_SIZE = 8192;

    private SocketThread parent;
    private InputStream in;
    private OutputStream out;
    private boolean running = false;
    private boolean proxyActive = false;


    public ProxyDataThread(SocketThread _parent, InputStream _in, OutputStream _out){
        this.parent = _parent;
        this.in = _in;
        this.out = _out;
        this.proxyActive = true;
    }

    public void run() {
        this.running = true;
        byte[] buffer = new byte[BUFFER_SIZE];
        try{
            while (proxyActive){
                int readBytes = this.in.read(buffer);
                if(readBytes == -1){
                    break;
                }
                this.out.write(buffer, 0, readBytes);
                this.out.flush();
            }//while(true)
        } catch (IOException ioe){
            logger.info(this.parent.getProxyInfoString() + " CLOSED");
        }

        this.running = false;
        //UP Call
        this.parent.socketClose();
    }

    public void StopThread(){
        this.proxyActive = false;
    }

    public boolean isRunning(){
        return this.running;
    }
}
