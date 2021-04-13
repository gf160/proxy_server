package com.hamon.common;

import org.springframework.context.MessageSource;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContext;
import java.io.Serializable;
import java.util.Locale;

/**
 * 공통에러정보
 *
 * @author 배정여
 * @since 2019.05.14
 */
@SuppressWarnings("serial")
public class ErrorInfo implements Serializable {
    private String code;
    private String message;

    public ErrorInfo(String message) {
        this(null, message);
    }

    public ErrorInfo(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorInfo(Exception e) {
        if (e instanceof CustomException) {
            this.message = e.getMessage();
        } else {

            ServletRequestAttributes reqAttr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            ServletContext sc = reqAttr.getRequest().getServletContext();
            WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(sc);
            MessageSource messageSource = (MessageSource) wac.getBean("messageSource");
            this.code = messageSource.getMessage("msg.prcs.fail.code", null, Locale.getDefault());
            this.message = messageSource.getMessage("msg.prcs.fail", null, Locale.getDefault());
        }
    }

    /**
     * @return the code
     */
    public String getCode() {
        return code;
    }

    /**
     * @param code the code to set
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    public String toString() {
        return "[" + code + "]: " + message;
    }
}
