package com.hamon.common;

/**
 * 사용자 정의 Exception.
 *
 * @author 한관수
 * @version 1.0
 * @since 2019-04-05
 */
public class CustomException extends RuntimeException{
    private static final long serialVersionUID = 7094179636236838026L;

    /**
     * Constructor.
     *
     * @param message exception message
     */
    public CustomException(final String message) {
        super(message);
    }

    /**
     * Constructor.
     *
     * @param message   exception message.
     * @param throwable exception object.
     */
    public CustomException(final String message, final Throwable throwable) {
        super(message, throwable);
    }
}
