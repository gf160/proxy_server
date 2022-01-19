package com.hamon.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leeyouje on 2020-11-19.
 */
public class XMLReader {

    private static Logger logger = LoggerFactory.getLogger(XMLReader.class);

    private List<ProxyInfoDto> _proxyData = null;

    public XMLReader(){
        _proxyData = null;
    }

    public static List<ProxyInfoDto> getProxyFile() throws Exception{
        ClassPathResource cpr = new ClassPathResource("config/proxy_table.xml");
        byte[] bdata = FileCopyUtils.copyToByteArray(cpr.getInputStream());
        String _xmlContent = new String(bdata, StandardCharsets.UTF_8);

        DocumentBuilderFactory xmlFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder xmlBuilder = xmlFactory.newDocumentBuilder();

        Document document = xmlBuilder.parse(new InputSource(new StringReader(_xmlContent)));
        document.getDocumentElement().normalize();
        logger.info("parser is success");

        NodeList proxyList = document.getElementsByTagName("proxy");
        logger.info("nodeList length=" + proxyList.getLength());

        List<ProxyInfoDto> _list = new ArrayList<>();

        for(int i = 0; i< proxyList.getLength() ; i++) {
            Node nNode = proxyList.item(i);

            if(nNode.getNodeType() == Node.ELEMENT_NODE){
                Element el = (Element) nNode;
                String _port = getTagValue("port", el);
                String _dstIp = getTagValue("dst-ip", el);
                String _dstPort = getTagValue("dst-port", el);
                logger.info("port(" + _port + ") ----> " + _dstIp + ":" + _dstPort);

                ProxyInfoDto _dto = new ProxyInfoDto();
                _dto.setPort(Integer.parseInt(_port));
                _dto.setDstIp(_dstIp);
                _dto.setDstPort(Integer.parseInt(_dstPort));
                _list.add(_dto);
            }
        }//for end(proxy_list)

        return _list;
    }

    // tag값의 정보를 가져오는 메소드
    private static String getTagValue(String tag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        if(nValue == null)
            return null;
        return nValue.getNodeValue();
    }
}
