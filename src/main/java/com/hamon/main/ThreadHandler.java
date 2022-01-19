package com.hamon.main;

import com.hamon.common.ProxyInfoDto;
import com.hamon.h2db.domain.TbProxyInfo;
import com.hamon.h2db.repository.TbProxyInfoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leeyouje on 2022-01-19.
 */
public class ThreadHandler {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    List<PortListenThread> pltList = new ArrayList<>();
    List<TbProxyInfo> proxyList = new ArrayList<>();

    @Autowired
    private TbProxyInfoRepository tbProxyInfoRepository;

    public ThreadHandler(){

    }

    public void getProxyList(){
        this.proxyList = tbProxyInfoRepository.findAll();
    }

    public void startThread(){
        for(TbProxyInfo proxyInfo : proxyList){
            logger.info(proxyInfo.getPort() + "");
            PortListenThread plt = new PortListenThread(proxyInfo);
            plt.start();
            this.pltList.add(plt);
        }//foreach(pltList)
    }
    public void reloadThread(){}
    public void stopThread(){
        for(PortListenThread _plt : pltList){
            _plt.closeThread();
        }//foreach(pltList)
    }

    public List<TbProxyInfo> printProxyInfo(){
        return proxyList;
    }
}
