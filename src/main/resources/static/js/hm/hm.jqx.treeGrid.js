/**
 * Created by Leeyouje on 2019-05-27.
 */
var HmTreeGrid = {
    //기본: 그룹명만 표현
    T_GRP_DEFAULT: 1,
    //기본2: 그룹과 주차장을 푷현
    T_GRP_DEFAULT2: 2,
    create: function($treeGrid, type, fnSelect, params, theme, grid){
        var url = undefined;
        if(theme === undefined) theme = jqxTheme;
        if($.isEmpty(params)) params = {};

        var cols = [];
        switch(type) {
            case HmTreeGrid.T_GRP_DEFAULT:
                url = '/group/getGroupList.do';
                cols = [
                    //{text: 'grpSeq', dataField: 'grpSeq', hidden: true},
                    {text: '명칭', dataField: 'groupNm'}
                ];
                break;
            case HmTreeGrid.T_GRP_DEFAULT2:
                url = '/group/getGroupListWithPark.do';
                cols = [
                    //{text: 'grpSeq', dataField: 'grpSeq', hidden: true},
                    //{text: 'grpType', dataField: 'grpType', hidden: true},
                    {text: '명칭', dataField: 'groupNm'}
                ];
                break;
        }//switch

        var adapter = new $.jqx.dataAdapter({
            datatype : 'json',
            root : 'resultData',
            url: ctxPath + url,
            dataFields: [
                { name: 'groupSeq', type: 'string' },
                { name: 'pGroupSeq', type: 'string' },
                { name: 'groupType', type: 'string' },
                { name: 'groupNm', type: 'string' },
                { name: 'groupSeqOri', type: 'string' },
                { name: 'dispOrdr', type: 'string' }
            ],
            hierarchy : {
                keyDataField : { name : 'groupSeq' },
                parentDataField : { name : 'pGroupSeq'}
            },
            id : 'groupSeq'
        },{
            async : true,
            formatData : function(data) {
               $.extend(data, params);
                return data;
            }
        });

        $treeGrid.jqxTreeGrid({
            source : adapter,
            width : '98.5%',
            height : '99.8%',
            altRows : false,
            filterable : true,
            autoRowHeight : false,
            pageable : false,
            showHeader : false,
            selectionMode : 'singleRow',
            icons : function(rowKey, rowData) {
                if(rowData.hasOwnProperty('groupType')){
                    switch(rowData.groupType) {
                        case 'GROUP':
                            return ctxPath + '/img/tree/place.png';
                            break;
                        case 'PARK':
                            return ctxPath + '/img/tree/parking.png';
                            break;
                    }
                } else {
                    return ctxPath + '/img/tree/p_tree.png';
                }
            },
            ready : function() {
                var uid = null;
                var rows = $treeGrid.jqxTreeGrid('getRows');
                if (rows != null && rows.length > 0) {
                    if(params.hasOwnProperty('isRootSelect') && params.isRootSelect == false) {

                    } else {
                        uid = $treeGrid.jqxTreeGrid('getKey', rows[0]);
                    }
                }
                if (uid != null) {
                    $treeGrid.jqxTreeGrid('expandRow', $treeGrid.jqxTreeGrid('getKey', rows[0]));
                    $treeGrid.jqxTreeGrid('expandAll');
                    $treeGrid.jqxTreeGrid('selectRow', uid);
                }

                $treeGrid.find("input[role*='textbox']").width(""); // 혹시 문제되면 제거
            },
            columns : cols
        }).on('rowSelect', function(event) {
            if(grid !== undefined) {
                if ($(grid).hasClass('jqx-grid')) {
                    if (fnSelect !== undefined && fnSelect !== null) fnSelect(event);
                } else {
                    if (fnSelect !== undefined && fnSelect !== null)
                        setTimeout(function(){
                            fnSelect(event);
                        }, 200);
                }
            } else if (fnSelect !== undefined && fnSelect !== null){
                fnSelect(event);
            }
        });
    }
}
