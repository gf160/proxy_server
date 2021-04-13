/**
 * Created by Leeyouje on 2019-05-20.
 * GRID 관련 공통 합수
 */
var HmGrid = {
    /** get jqxGrid default options */
    getDefaultOptions : function($grid) {
        return {
            width : "99.5%",
            height : "99%",
            autoheight : false,		/* loading slow */
            autorowheight: false,		/* loading slow */
            pageable : true,
            pagermode: 'simple',
            columnsresize : true,
            showstatusbar : false,
            selectionmode : "singlerow",
            enabletooltips : true,
            columnsheight: 26,
            rowsheight: 22,
            filterrowheight: 30,
            toolbarheight : 30,
            sortable : true,
            altrows: false,
//				filterable: true,  				/* loading slow */
            enablebrowserselection : false,
            showpinnedcolumnbackground: false,
            showsortcolumnbackground : false,
            pagesize : 1000,
            pagesizeoptions : [ "1000", "5000", "10000" ],
            // localization : getLocalization('kr')
//				pagerrenderer : this.pagerrenderer
//				ready: function() {
//					$grid.jqxGrid({ filterable: true });
//				}
        };
    },
    /** create jqxGrid */
    create : function($grid, options, ctxmenuType, ctxmenuIdx) {
        var defOpts = this.getDefaultOptions($grid);
        // 그리드 헤더텍스트 정렬을 center로.. 처리
        try {
            $.each(options.columns, function(idx, value) {
                value.align = 'center';
                value.filterdelay = 60000; // key이벤트에 대한 동작을 막기위해 delaytime 설정
            });
        } catch(e) {
            console.log("jqxGrid columns option set error : ", e);
        }
        $.extend(defOpts, options);

        $grid.jqxGrid(defOpts);
        // if(ctxmenuType === undefined) ctxmenuType = CtxMenu.COMM;
        // if(ctxmenuIdx === undefined) ctxmenuIdx = '';
        // CtxMenu.create($grid, ctxmenuType, ctxmenuIdx);
    },
    updateBoundData : function($GRID, _REG_URL) {
        $GRID.jqxGrid("clearselection");
        var adapter = $GRID.jqxGrid("source");
        if(adapter !== undefined) {
            if(adapter._source.url == null || adapter._source.url == "")
                adapter._source.url = _REG_URL;

            if($GRID.jqxGrid('filterable')) {
                $GRID.jqxGrid("updatebounddata", "filter");
            } else if($GRID.jqxGrid('groupable')) {
                $GRID.jqxGrid("updatebounddata", "data");
            } else {
                $GRID.jqxGrid("updatebounddata");
            }
        }
    },
    /** 선택된 rowindex를 리턴 */
    getRowIdx: function($grid, msg) {
        var rowIdx = $grid.jqxGrid('getselectedrowindex');
        if(rowIdx === undefined || rowIdx === null || rowIdx == -1) {
            if(msg !== undefined) alert(msg);
            return false;
        }
        return rowIdx;
    },

    /** 선택된 rowindexes를 리턴 */
    getRowIdxes: function($grid, msg) {
        if($grid.jqxGrid('getboundrows').length == 0) {
            if(msg !== undefined) alert(msg);
            return false;
        }
        var rowIdxes = $grid.jqxGrid('getselectedrowindexes');
        if(rowIdxes === undefined || rowIdxes === null || rowIdxes.length == 0) {
            if(msg !== undefined) alert(msg);
            return false;
        }
        return rowIdxes;
    },

    groupSum:function(row, column, value, defaultRender, column, rowData){
        if (value.toString().indexOf("Sum") == 0) {
            return defaultRender.replace("Sum", "합계");
        }
    },

    groupUnitSum:function(row, column, value, defaultRender, column, rowData){

        var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';

        if (value.toString().indexOf("Sum") == 0) {
            return defaultRender.replace("Sum", "합계");
        }else {
            cell += Server.commaNum(value);
            cell += '</div>';
        }
        return cell;

    },

    aggregatesrenderer:function(aggregates, column, element){
        var renderstring = '<div style="margin-left: 4px; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">' + aggregates.sum + '</div>';
        return renderstring;
    },





    /** unit1000 */
    groupAggregates: function(row, column, value){

        var _TMP_VALUE = value;

        if(_TMP_VALUE != undefined && _TMP_VALUE != null) {
            _TMP_VALUE = _TMP_VALUE.toString().replace('Sum', '');
            _TMP_VALUE = _TMP_VALUE.toString().replace('Total', '');
            _TMP_VALUE = _TMP_VALUE.toString().replace(':', '');
        }

        var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        cell += Server.commaNum(_TMP_VALUE);
        cell += '원</div>';
        return cell;

    },
    groupAggregates_won: function(row, column, value){

        var _TMP_VALUE = value;
        var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        if(_TMP_VALUE != undefined && _TMP_VALUE != null) {
            _TMP_VALUE = _TMP_VALUE.toString().replace('Sum', '');
            _TMP_VALUE = _TMP_VALUE.toString().replace('Total', '');
            _TMP_VALUE = _TMP_VALUE.toString().replace(':', '');
            if(_TMP_VALUE != 'undefined'){
                cell += Server.commaNum(_TMP_VALUE);
            } else {
                cell += '0';
            }
        } else {
            cell += '0';
        }

        cell += ' 원</div>';
        return cell;
    },
    groupAggregates_count: function(row, column, value){

        var _TMP_VALUE = value;
        var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';

        if(_TMP_VALUE != undefined && _TMP_VALUE != null && _TMP_VALUE != '') {
            _TMP_VALUE = _TMP_VALUE.toString().replace('Sum', '');
            _TMP_VALUE = _TMP_VALUE.toString().replace('Total', '');
            _TMP_VALUE = _TMP_VALUE.toString().replace(':', '');
            if(_TMP_VALUE != 'undefined'){
                cell += Server.commaNum(_TMP_VALUE);
            } else {
                cell += '0';
            }
        } else {
            cell += '0';
        }

        cell += ' 건</div>';
        return cell;
    },
    commaNum: function (row, column, value) {
        var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        cell += Server.commaNum(value);
        cell += '</div>';
        return cell;
    },
    posClassNm: function(row, column, value){
        var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        cell += value + ' 급지';
        cell += '</div>';
        return cell;
    },
    percentVal: function(row, column, value){
        var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        cell += value + ' %';
        cell += '</div>';
        return cell;
    },
    stringToDate_ym: function(row, column, value){
        var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        if(value != undefined && value != '') {
            cell += value.substring(0, 4) + '-' + value.substring(4, 6);
        }
        cell += '</div>';
        return cell;
    },
    stringToDate: function(row, column, value){
        var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        if(value != undefined && value != ''){
            cell += value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
        }
        cell += '</div>';
        return cell;
    },
    stringToTime: function(row, column, value){
        var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        if(value != undefined && value != '') {
            cell += value.substring(0, 2) + ':' + value.substring(2, 4) + ':' + value.substring(4, 6);
        }
        cell += '</div>';
        return cell;
    },
    stringToHHmm: function(row, column, value){
        var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        if(value != undefined && value != '') {
            cell += value.substring(0, 2) + ':' + value.substring(2, 4);
        }
        cell += '</div>';
        return cell;
    },
    stringToDateTime: function(row, column, value){
        var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        if(value != undefined && value != '') {
            cell += value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8) + ' ' + value.substring(8, 10) + ':' + value.substring(10, 12) + ':' + value.substring(12, 14);
        }
        cell += '</div>';
        return cell;
    },
    stringToYYYYMMDDHH: function(row, column, value){
        var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
        if(value != undefined && value != '') {
            cell += value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8) + ' ' + value.substring(8, 10) + ':' + value.substring(10, 12);
        }
        cell += '</div>';
        return cell;
    },

    /** title */
    titlerenderer: function(toolbar, title, elemId) {
        var container = $('<div style="margin: 5px;"></div>');
        var span;
        if(elemId !== null && elemId !== undefined) {
            span = $('<span style="float: left; font-weight: bold; margin-top: 5px; margin-right: 4px;" id="' + elemId + '">' + title + '</span>');
        }
        else {
            span = $('<span style="float: left; font-weight: bold; margin-top: 5px; margin-right: 4px;">' + title + '</span>');
        }
        toolbar.empty();
        toolbar.append(container);
        container.append(span);
    },

    rownumrenderer: function (row, datafield, value) {
        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + (row + 1) +"</div>";
    },

};
