package com.hamon.rest.controller;

import com.hamon.common.ReturnData;
import com.hamon.h2db.domain.TbProxyInfo;
import com.hamon.h2db.repository.TbProxyInfoRepository;
import com.hamon.main.CarExample;
import com.hamon.main.ThreadHandler;
import org.hibernate.loader.custom.Return;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Leeyouje on 2020-12-21.
 */
@RestController
@RequestMapping("/")
public class ProxyController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private TbProxyInfoRepository tbProxyInfoRepository;

    @Autowired
    private ThreadHandler handler;

    //프록시 리스트 조회
    @GetMapping(value ="/proxy")
    @ResponseBody
    public ReturnData getProxyListAll(){
        List<TbProxyInfo> proxyList = tbProxyInfoRepository.findAll();

        return new ReturnData(proxyList);
    }

    //프록시 추가
    @PostMapping(value ="/proxy")
    @ResponseBody
    public ReturnData addProxyData(@RequestBody Map<String, Object> reqMap){
        return new ReturnData();
    }

    //프록시 추가
    @PostMapping(value ="/proxy/{proxyIp}")
    @ResponseBody
    public ReturnData addProxyData(@PathVariable String proxyIp){
        return new ReturnData();
    }


    @GetMapping(value ="/proxy/start")
    @ResponseBody
    public ReturnData proxyStart(){
        try{
            handler.getProxyList();

            handler.startThread();
        } catch (Exception e){
            logger.error("Thread start is fail");
            e.printStackTrace();
        }
        return new ReturnData(handler.printProxyInfo());
    }

    @GetMapping(value ="/proxy/stop")
    @ResponseBody
    public ReturnData proxyStop(){
        try{
            handler.stopThread();
        } catch (Exception e){
            logger.error("Thread stop is fail");
            e.printStackTrace();
        }
        return new ReturnData("SUCCESS");
    }
}
