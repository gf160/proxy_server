var HmWindow = {
		create: function($pwin, pWidth, pHeight, modalZIndex) {
			if(pWidth === undefined) pWidth = 100;
			if(pHeight === undefined) pHeight = 100;
            if(modalZIndex === undefined) modalZIndex = 800;

			$pwin.jqxWindow({ maxWidth: 1280, maxHeight: 720, width: pWidth, height: pHeight, content: 'Loading...',
				resizable: false, isModal: true, position: 'center', modalOpacity: 0.1, autoOpen: false, closeButtonSize: 40
				,modalZIndex: modalZIndex});
		},
		
		setSize: function($pwin, w, h) {
			// 18.06.21] maxHeight가 h로 받은값보다 작을때 maxHeight 값을 변경하여 세팅한다.
			var maxHeight = 720;
			if(h>720){
				maxHeight = h;
				$pwin.jqxWindow({ maxHeight: maxHeight }); // 먼저 세팅해줘야 height 값이 제대로 적용된다.
			}
			$pwin.jqxWindow({ width: w, height: h});
		},
		
		open: function($pwin, title, content, w, h, fnInit, fnInitParam) {
			if(w != null && h != null) {
				HmWindow.setSize($pwin, w, h);
			}
			$pwin.jqxWindow({ title: '<h1>' + title + '</h1>', content: content, position: 'center', resizable: true , // modalZIndex: 180,
				initContent: function() {
					try {
						if(fnInit == null) {
							if(typeof pwindow_init === 'function') pwindow_init(fnInitParam);
						} else {
							fnInit = window[fnInit];
							if(typeof fnInit === 'function') fnInit(fnInitParam);
						}
					} catch(e) {
						console.log("window init Error : ", e);
					}
				}
			})
			.on('close', function(event) {
				try {
					if(typeof pwindow_close === 'function') pwindow_close();
				} catch(e) {
                    console.log("window close error : ", e);
				}
			});
			$pwin.jqxWindow('open');
		},
		
		close: function($pwin) {
			try {
				if(typeof pwindow_close === 'function') pwindow_close();
			} catch(e) {
				console.log("window close error : ", e);
			}
			$pwin.jqxWindow('close');
		},
		
		destroy: function(event) {
//			$(event.currentTarget.offsetParent).jqxWindow('close');
			var $pwin = $(event.currentTarget).parents('div.jqx-window');
			$pwin.jqxWindow('close');
		}
};