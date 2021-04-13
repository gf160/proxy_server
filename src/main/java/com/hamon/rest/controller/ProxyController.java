package com.hamon.rest.controller;

import com.hamon.common.ReturnData;
import com.hamon.h2db.domain.TbProxyInfo;
import com.hamon.h2db.repository.TbProxyInfoRepository;
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
@RequestMapping("/proxy")
public class ProxyController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private TbProxyInfoRepository tbProxyInfoRepository;

    @RequestMapping(value ="/getProxyList", method = RequestMethod.GET)
    @ResponseBody
    public ReturnData getProxyList(){
        List<TbProxyInfo> proxyList = tbProxyInfoRepository.findAll();

//        for(TbProxyInfo _item : proxyList){
//            _item.get
//        }//for each

        return new ReturnData(proxyList);
    }

    @RequestMapping(value ="/addProxyData")
    @ResponseBody
    public ReturnData addProxyData(@RequestParam Map<String, Object> reqMap){
        return new ReturnData();
    }

}
