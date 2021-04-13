var ctxPath = '';
var HmUtil ={
    /**
     * 엑셀 export
     * @param url
     * @param params
     */
    exportExcel: function(url, params) {
        var loader = $('#comLoader');
        if(loader.length <= 0) {
            loader = $('<div id="comLoader" style="z-index: 100000"></div>');
            loader.appendTo('body');
        }
        loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: '엑셀을 생성중입니다. 잠시만 기다려주세요.' });
        loader.jqxLoader('open');
        if(params == null) params = {};

        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(params),
            success: function(data, status) {
                loader.jqxLoader('close');
                if(data.hasError) {
                    alert(data.errorInfo.message);
                    return;
                }
                HmUtil.fileDown({ filePath: data.resultData.filePath, fileName: data.resultData.fileName });
            }
        });

//			$.post(url, params,
//					function(result) {
//						loader.jqxLoader('close');
//						if(result.hasError) {
//							alert(result.errorInfo.message);
//							return;
//						}
//						HmUtil.fileDown({ filePath: result.resultData.filePath, fileName: result.resultData.fileName });
//					}
//			);
    },

    exportExcel2: function(url, params, _callback) {
        var loader = $('#comLoader');
        if (loader.length <= 0) {
            loader = $('<div id="comLoader" style="z-index: 100000"></div>');
            loader.appendTo('body');
        }
        loader.jqxLoader({isModal: false, width: 300, height: 70, theme: jqxTheme, text: '엑셀을 생성중입니다. 잠시만 기다려주세요.'});
        loader.jqxLoader('open');
        if (params == null) params = {};

        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(params),
            success: function (data, status) {
                loader.jqxLoader('close');
                if (data.hasError) {
                    alert(data.errorInfo.message);
                    return ;
                } else {
                    HmUtil.fileDown2({filePath: data.resultData.filePath, fileName: data.resultData.fileName});
                    if(_callback != undefined && typeof _callback == 'function'){
                        _callback();
                    };
                }
            }
        });
    },

    exportGrid: function ($grid, filename, isAllExport) {
        if(filename === undefined) filename = $.format.date(new Date(), 'yyyyMMddHHmmssSSS');
        if(filename != undefined) filename =filename+"_" + $.format.date(new Date(), 'yyyyMMdd_HHmmss');
        if(isAllExport === undefined) isAllExport = true;

        var groups = $grid.jqxGrid('columnGroups');
        var headerGrps = [];
//			console.log(groups);
        if (groups != null && groups.length > 0) {
            $.each(groups, function (idx, group) {
                var _colspan = 0;
                $.each(group.columns, function(gidx, gcol) {
                    if(!gcol.hidden) _colspan++;
                });
                headerGrps.push({text: group.text, name: group.name, colspan: _colspan});
            });
        }
        var records = $grid.jqxGrid('columns').records;
        var headers = [];
        // console.log(records);
        $.each(records, function (idx, record) {
            if (record.datafield == null || record.hidden || record.columntype == 'checkbox') return;
            var _cellsrenderer = null;
            if(record.cellsrenderer != null && record.cellsrenderer.prototype.hasOwnProperty('name')) {
                _cellsrenderer = record.cellsrenderer.prototype.name();
            }
            headers.push({
                text: record.text,
                columngroup: record.columngroup,
                datafield: record.displayfield != null ? record.displayfield : record.datafield,
                cellsrenderer: _cellsrenderer,
                width: record.width,
                columntype: record.columntype
            });
        });//$.each

        var loader = $('#comLoader');
        if (loader.length <= 0) {
            loader = $('<div id="comLoader" style="z-index: 100000"></div>');
            loader.appendTo('body');
        }
        loader.jqxLoader({
            isModal: false,
            width: 300,
            height: 70,
            theme: jqxTheme,
            text: '엑셀을 생성중입니다. 잠시만 기다려주세요.'
        });
        loader.jqxLoader('open');

        var params = {
            filename: filename,
            // exportFormat: 'xls',
            headerGrps: headerGrps,
            header: headers,
            //data: isAllExport ? $grid.jqxGrid('getboundrows') : $grid.jqxGrid('getdisplayrows')
        };
        
        if(isAllExport == true){
            params.data = $grid.jqxGrid('getboundrows');
        } else if(isAllExport == false) {
            params.data = $grid.jqxGrid('getdisplayrows');
        } else {
            var _selectedIdxs = $grid.jqxGrid('getselectedrowindexes');
            var __rows = [];
            if(_selectedIdxs.length == 0) {
                alert('export할 데이터를 선택해주세요');
                return ;
            }
            for(var _i = 0 ; _i < _selectedIdxs.length ; _i++){
                __rows.push($grid.jqxGrid('getrowdata', _selectedIdxs[_i]));
            }//for end

            params.data = __rows;
        }

        Server.post('/file/exportGrid.do', {
            data: params,
            success: function(result){
                loader.jqxLoader('close');
                HmUtil.fileDown({createTime: result.createTime, ext: result.ext, fileName: result.fileName});
            }//success
        });//Server.post

        // $.ajax({
        //     type: 'POST',
        //     url: '/file/exportGrid.do',
        //     dataType: 'json',
        //     data: params,
        //     success: function (data, status) {
        //         loader.jqxLoader('close');
        //         if (data.hasError) {
        //             alert(data.errorInfo.message);
        //             return;
        //         }
        //         HmUtil.fileDown({filePath: data.resultData.filePath, fileName: data.resultData.fileName});
        //     }
        // });
    },
    fileDown: function(params) {
        $('#hForm').empty();
        if(params !== undefined) {
            $.each(params, function(key, value) {
                $('<input />', { type: 'hidden', id: key, name: key, value: value }).appendTo($('#hForm'));
            });
        }
        $('#hForm').attr('action', ctxPath + '/file/fileDown.do');
        $('#hForm').attr('method', 'post');
        $('#hForm').attr('target', 'hFrame');
        $('#hForm').submit();
    },

    fileDown2: function(params) {
        $('#hForm').empty();
        if(params !== undefined) {
            $.each(params, function(key, value) {
                $('<input />', { type: 'hidden', id: key, name: key, value: value }).appendTo($('#hForm'));
            });
        }
        $('#hForm').attr('action', ctxPath + '/file/fileDown2.do');
        $('#hForm').attr('method', 'post');
        $('#hForm').attr('target', 'hFrame');
        $('#hForm').submit();
    },
}

/** tab 안에서의 session null 일경우 redirect 되는 현상때문에 */
// $.ajaxSetup({
//     dataFilter: function (data, type) {
//         if (data && typeof data == "string") {
//             if (data.indexOf('window.location') > -1) {
//                 eval(data);
//                 //alert(data.indexOf('login.do'));
//                 window.location = "/";
//             }
//         }
//         return data;
//     }
// });

/** ajax call */
var Server = (function() {
    return {
        post: function(url, params) {
            Server.ajax(url, 'post', params);
        },
        get: function(url, params) {
            Server.ajax(url, 'get', params);
        },
        ajax: function(url, method, params) {
            var ajaxOpts = {
                type: method.toUpperCase(),
                url: ctxPath + url,
                dataType: 'json',
                success: function(data, status) {
//						if($('body').hasClass('wait')) $('body').removeClass('wait');
                    if(data.hasError) {
                        if(params.error !== undefined) {
                            params.error(data);
                        }
                        else {
                            alert(data.errorInfo.message);
                        }
                        return;
                    }
                    if(params.success !== undefined) {
                        params.success(data.resultData, this.data);
                    }
                },
                error: function(xhr) {
                    console.log(xhr);
//						if($('body').hasClass('wait')) $('body').removeClass('wait');
                    //alert('처리 중 에러가 발생하였습니다.');
                    if(params.error !== undefined) {
                        params.error(xhr);
                    }else{
                        alert('처리 중 에러가 발생하였습니다.');
                    }
                }
            };
            if(method === 'post') {
                try {
                    if(params.data) ajaxOpts.data = JSON.stringify(params.data);
                    var o = params.data;
                    if(o && typeof o === 'object' && o !== null) {
                        ajaxOpts.contentType = 'application/json; charset=utf-8';
                    }
                } catch(e) {
                    console.log("ajax post params json stringify error : ", e);
                }
            }
            else {
                if(params.data) ajaxOpts.data = params.data;
            }
            $.ajax($.extend(ajaxOpts, params.options));
        },

        commaNum: function(num) {
            if(num == undefined || num == null || num === '') return "0";
            var len, point, str;
            num = num + "";
            point = num.length % 3;
            len = num.length;
            str = num.substring(0, point);
            while (point < len) {
                if (str != "") str += ",";
                str += num.substring(point, point + 3);
                point += 3;
            }
            return str;
        },

        stringToDate: function(value){
            var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
            cell += value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
            cell += '</div>';
            return cell;
        },
        stringToTime: function(value){
            var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
            cell += value.substring(0, 2) + ':' + value.substring(2, 4) + ':' + value.substring(4, 6);
            cell += '</div>';
            return cell;
        }
    };
})();


/** jQuery extends */
$.extend({
    /** null check */
    isBlank: function(val) {
        var tmp = $.trim(val);
        return !(tmp !== undefined && tmp != null && tmp.length > 0);
    },
    isEmpty: function(obj) {
        if(obj !== undefined && obj != null)
            return false;
        else
            return true;
    },
});