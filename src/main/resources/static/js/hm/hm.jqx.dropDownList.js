var HmDropDownList = {
    create: function($div, _options, fnChange, fnSelect){
        $div.jqxDropDownList(_options).on('change', function(event){
            if(fnChange != undefined && typeof fnChange == 'function'){
                fnChange(event);
            }
        }).on('select', function(){
            if(fnSelect != undefined && typeof fnSelect == 'function'){
                fnSelect(event);
            }
        });
    }
}//HmDropDownList