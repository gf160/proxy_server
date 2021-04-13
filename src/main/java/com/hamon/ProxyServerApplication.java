package com.hamon;

import com.hamon.common.ProxyInfoDto;
import com.hamon.common.XMLReader;
import com.hamon.main.PortListenThread;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.Banner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.List;

@SpringBootApplication
//public class ProxyServerApplication implements CommandLineRunner{
public class ProxyServerApplication{

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(ProxyServerApplication.class);
		application.setBannerMode(Banner.Mode.OFF);
		application.run(args);
	}

//	@Override
//	public void run(String... strings) throws Exception {
//		List<ProxyInfoDto> proxyList = XMLReader.getProxyFile();
//		if(proxyList.size() > 0){
//			logger.debug("Proxy List Load Success");
//			for(ProxyInfoDto _item : proxyList){
//				new PortListenThread(_item).start();
//			}//for end(i)
//		} else {
//			logger.error("Proxy List Is Null");
//			System.exit(0);
//		}
//	}
}
