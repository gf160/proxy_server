var HmDate = {
		SECOND: "second",
		MINUTE: "minute",
		HOUR: "hour",
		DAY : "day",
		MONTH : "month",
		YEAR : "year",
		
		FS_LONG: 'yyyy-MM-dd HH:mm:ss',
		FS_MIDDLE: 'yyyy-MM-dd HH',
		FS_SHORT: 'yyyy-MM-dd',
		
		/**
		 * jqWidget 날짜&시간 설정
		 */
		create: function($dt1, $dt2, strField, intGap, strFormat) {
			if(strFormat == null) strFormat = this.FS_LONG;
			var toDate = new Date();
			var fromDate = new Date();
			switch(strField) {
			case HmDate.SECOND: fromDate.setSeconds(fromDate.getSeconds() - intGap); break;
			case HmDate.MINUTE: fromDate.setMinutes(fromDate.getMinutes() - intGap); break;
			case HmDate.HOUR: fromDate.setHours(fromDate.getHours() - intGap); break;
			case HmDate.DAY: 
				if(intGap == 0) 
					fromDate.setHours(0, 0, 0, 0);
				else
					fromDate.setDate(fromDate.getDate() - intGap); 
				break;
			case HmDate.MONTH: fromDate.setMonth(fromDate.getMonth() - intGap); break;
			case HmDate.YEAR: fromDate.setYear(fromDate.getYear() - intGap); break;
			}
			var _width = strFormat == this.FS_LONG? 150 : strFormat == this.FS_MIDDLE? 110 : 100;
			$dt1.add($dt2).jqxDateTimeInput({ width: _width, height: '21px', formatString: strFormat, theme: jqxTheme, culture: 'ko-KR' });
			$dt1.jqxDateTimeInput('setDate', fromDate);
			$dt2.jqxDateTimeInput('setDate', toDate);
		},

    /**
     * jqWidget 날짜&시간 설정
     */
    settingDaySearch: function($dt1, strField, intGap, strFormat) {
        if(strFormat == null) strFormat = this.FS_LONG;
        var fromDate = new Date();
        switch(strField) {
            case HmDate.SECOND: fromDate.setSeconds(fromDate.getSeconds() - intGap); break;
            case HmDate.MINUTE: fromDate.setMinutes(fromDate.getMinutes() - intGap); break;
            case HmDate.HOUR: fromDate.setHours(fromDate.getHours() - intGap); break;
            case HmDate.DAY:
                if(intGap == 0)
                    fromDate.setHours(0, 0, 0, 0);
                else
                    fromDate.setDate(fromDate.getDate() - intGap);
                break;
            case HmDate.MONTH: fromDate.setMonth(fromDate.getMonth() - intGap); break;
            case HmDate.YEAR: fromDate.setYear(fromDate.getYear() - intGap); break;
        }
        var _width = strFormat == this.FS_LONG? 130 : strFormat == this.FS_MIDDLE? 110 : 100;
        $dt1.jqxDateTimeInput({ width: _width, height: '21px', formatString: strFormat, theme: jqxTheme, culture: 'ko-KR' });
        $dt1.jqxDateTimeInput('setDate', fromDate);
    },


    /**
		 * 날짜를 yyyyMMddhhmm format 으로 리턴
		 */
		getDateTimeStr : function($dt, strFormat) {
			if (strFormat === undefined)
				strFormat = "yyyyMMddHHmm";
			return $dt.val("date").format(strFormat);
		},

		/**
		 * 날짜를 yyyyMMdd format 으로 리턴
		 */
		getDateStr : function($dt, strFormat) {
			if (strFormat === undefined)
				strFormat = "yyyyMMdd";
			return $.format.date($dt.val("date"), strFormat);
		},

        /**
         * 날짜를 yyyy format 으로 리턴
         */
        getYearStr : function($dt, strFormat) {
            if (strFormat === undefined)
                strFormat = "yyyy";
            return $.format.date($dt.val("date"), strFormat);
        },
		/**
		 * 시간을 hhmm format으로 리턴
		 */
		getTimeStr : function($dt, strFormat) {
			if (strFormat === undefined)
				strFormat = "HHmm";
			return $.format.date($dt.val("date"), strFormat);
		},
		
		/** 월,일,시,분,초 값 앞에 0 넣어주기 */
		addZero : function(str){
			if(str < 10) str = '0'+str;
			return str;
		},
		
		/** 기간 검사 */
		validation: function($dt1, $dt2, interval) {
			if(arguments.length < 2) { 
				alert('2개의 인자값이 필요합니다.');
				return false;
			}
			var datetime1 = $.format.date($dt1.val('date'), 'yyyyMMdd');
			var datetime2 = $.format.date($dt2.val('date'), 'yyyyMMdd');
			var msg =  '시작일은 종료일 이후 일 수 없습니다. \n기간을 확인해주세요.';
			if(datetime1 > datetime2) {
				alert(msg);
				return false;
			}

			if(interval != undefined ){
                var datetime1 = $.format.date($dt1.val('date'), 'yyyy-MM-dd');
                var datetime2 = $.format.date($dt2.val('date'), 'yyyy-MM-dd');

                var firstDate = new Date(datetime1);
                var secodDate = new Date(datetime2);
                var diffDay = (secodDate - firstDate) / (1000*60*60*24);

                if(diffDay > 90){
                    alert("최대 기간 조회는 90일 입니다.");
                    var toDate = new Date();
                    var fromDate = new Date();
                    fromDate.setDate(fromDate.getDate() - 1);
                    $dt1.jqxDateTimeInput('setDate', fromDate);
                    $dt2.jqxDateTimeInput('setDate', toDate);
                    return false;
				}

			}
			return true;
		},

		parseDate: function(str) {
			str = str.replace(/\-/g, '').replace(/\:/g, '').replace(' ', '');
			return new Date(str.substring(0, 4), parseInt(str.substring(4, 6))-1, str.substring(6, 8), str.substring(8, 10), str.substring(10, 12), str.substring(12));
		}
		
};


Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var week = Math.ceil((((this - onejan) / 86400000) + onejan.getDay())/7);
    return week < 10? '0' + week : week;
}