package com.hamon.common;

/**
 * Created by Leeyouje on 2020-11-19.
 */
public class ProxyInfoDto {
    private int port;
    private String dstIp;
    private int dstPort;

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getDstIp() {
        return dstIp;
    }

    public void setDstIp(String dstIp) {
        this.dstIp = dstIp;
    }

    public int getDstPort() {
        return dstPort;
    }

    public void setDstPort(int dstPort) {
        this.dstPort = dstPort;
    }
}
