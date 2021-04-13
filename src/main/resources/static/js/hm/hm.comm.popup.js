var HmCommPopup = {

    callCustPopup: function(params) {
        var pwin = $('#pCustWindow');

        try {
            if(pwin.length == 0) {
                pwin = $('<div id="pCustWindow" style="position: absolute;"></div>')
                pwin.append($('<div></div>'));
                pwin.append($('<div></div>'));
                $('body').append(pwin);
            }
            HmWindow.create(pwin);
        } catch(e) {
            console.log("거래처 목록 popup create error : ", e);
        }

        $.post(ctxPath + '/popup/common/pCustList.do',
            function(result) {
                HmWindow.open(pwin, '거래처 목록', result, 750, 500, 'pCustWindow_init', params);
                
            }
        );
    }
};