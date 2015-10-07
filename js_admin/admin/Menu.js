var modulo=null;
var opcion=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/menuset/getMod',         
        dataType: 'json',
        success: function(respuesta) {            
            modulo=respuesta;
            $.ajax({
                type:'POST', 
                url: $("#base_url").val()+'admin/menuset/getOp',         
                dataType: 'json',
                success: function(respuesta) {            
                    opcion=respuesta;
                    crearGrid();                                           
                },        
                error:function(jqXHR, textStatus, errorThrown){
                    alert(jqXHR.status);
                    alert(textStatus);
                    alert(errorThrown)
                }
            });                                           
        },        
        error:function(jqXHR, textStatus, errorThrown){
            alert(jqXHR.status);
            alert(textStatus);
            alert(errorThrown)
        }
    });            
    
});

function crearGrid(){
    jqGridMenus = jQuery("#tablaMenus").jqGrid({
        url:$("#base_url").val()+'admin/menuset/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['MODULO','OPCION','ACTIVO'],
        colModel:[
        {
            name:'modulo',
            index:'modulo',
            editable:true,            
            editrules:{
                required: true                                
            },
            edittype:'select',
            editoptions:{
                value:modulo
            },
            width:300
                  
        },        
        {
            name:'opcion',
            index:'opcion',            
            editable:true,            
            width:300,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:opcion
            },
            width:300
        },        
        {
            name:'activo',
            index:'activo',            
            editable:true,            
            width:80,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:{
                    1:'Activo',
                    2:'Inactivo'
                }
            }
        }
               
        ],
        rowNum:10000,
        rowTotal: 100000,        
        width:'auto',
        height:300,
        //rowList:[10,20,30],
        emptyrecords:'No existen registros',
        pager: '#pTablaMenus',
        sortname: 'modulo',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Menus",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/menuset/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridMenus.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridMenus.navGrid("#pTablaMenus", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true,
        beforeShowForm: function(frm) {             
            $('#modulo').attr('disabled','disabled');            
            $('#opcion').attr('disabled','disabled');
        },         
        beforeSubmit: function(postdata, formid) {
            
            return [true, "", ""]; // <-- return [éxito, mensaje];
        },
        afterSubmit: function(response, postdata) {
           var respuesta = jQuery.parseJSON(response.responseText);
            if(respuesta.state)
                message(respuesta.msg,"ui-state-highlight");
            else
                message(respuesta.msg,"ui-state-error");

            jqGridMenus.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $('#modulo').removeAttr('disabled');            
            $('#opcion').removeAttr('disabled');
        },
        beforeSubmit: function(postdata, formid) {            
            return [true, "", ""]; // <-- return [éxito, mensaje];
        },
        afterSubmit: function(response, postdata) {                       
            var respuesta = jQuery.parseJSON(response.responseText);
            if(respuesta.state)
                message(respuesta.msg,"ui-state-highlight");
            else
                message(respuesta.msg,"ui-state-error");

            jqGridMenus.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {  
    // //Seccion de reglas en la eliminacion                
        beforeSubmit: function(postdata, formid) {            
            /*postdata['oper']='del';
            postdata['modulo']=postdata;
            pos*/
            /*var id = jqGridMenus.jqGrid('getGridParam','selrow');
            var ret = jqGridMenus.jqGrid('getRowData',id);            
            postdata['oper']='del';
            postdata['activo']='1';
            postdata['descripcion']='';
            postdata['orden']='';
            postdata['modulo']=ret.modulo;*/
            alert(postdata.oper);                        
            return [false, "", ""]; // <-- return [éxito, mensaje];
        },
        afterSubmit: function(response, postdata) {                       
            var respuesta = jQuery.parseJSON(response.responseText);
            if(respuesta.state)
                message(respuesta.msg,"ui-state-highlight");
            else
                message(respuesta.msg,"ui-state-error");

            return[true];
        }
    },
    {  
        //View
        multipleSearch:true,
        closeOnEscape:true 
    },
    {
        //Search
        closeOnEscape:true
    });
}
function message(mess,clase){
    
    $('#msg').html(mess);
    $("#msg").addClass(clase);
    $("#msg").effect("highlight", {}, 3000);                          
    setTimeout(function(){ 
        $('#msg').html("");
        $("#msg").removeClass(clase);
    }, 6000);                                                 
}