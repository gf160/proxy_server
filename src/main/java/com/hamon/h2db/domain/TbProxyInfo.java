package com.hamon.h2db.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name="tb_proxy_info")
public class TbProxyInfo implements Serializable {

    private static final long serialVersionUID = 8124227299932339862L;

    @Id
    @Column(name="port")
    private int port;

    @Column(name = "dstip")
    private String dstIp;

    @Column(name = "dstport")
    private int dstPort;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

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
