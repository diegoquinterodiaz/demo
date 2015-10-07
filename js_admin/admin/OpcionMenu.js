$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }            
    jqGridOpciones = jQuery("#tablaOpciones").jqGrid({
        url:$("#base_url").val()+'admin/opcionmenu/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['CODIGO','OPCION','ARCHIVO','ORDEN','ACTIVO'],
        colModel:[
        {
            name:'codigo',
            index:'codigo',
            editable:true,
            editoptions: {
                readonly: true
            },            
            editrules:{
                required: true                                
            },
            width:130
                  
        },
        {
            name:'opcion',
            index:'opcion',
            editable:true,           
            editrules:{
                required: true                                
            },
            width:200
                  
        },        
        {
            name:'archivo',
            index:'archivo',            
            editable:true,            
            width:130,
            editrules:{
                required: true
            }
        },
        {
            name:'orden',
            index:'orden',            
            editable:true,            
            width:50,
            editrules:{
                required: true,
                custom:true,
                custom_func:checkNumberInt
            }
        },
        {
            name:'activo',
            index:'activo',            
            editable:true,            
            width:130,
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
        pager: '#pTablaOpciones',
        sortname: 'codopcion',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Opciones de Menu",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/opcionmenu/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridOpciones.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridOpciones.navGrid("#pTablaOpciones", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true,         
        beforeSubmit: function(postdata, formid) {
            
            return [true, "", ""]; // <-- return [éxito, mensaje];
        },
        afterSubmit: function(response, postdata) {
           var respuesta = jQuery.parseJSON(response.responseText);
            if(respuesta.state)
                message(respuesta.msg,"ui-state-highlight");
            else
                message(respuesta.msg,"ui-state-error");

            jqGridOpciones.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $('#codigo').removeAttr('readonly');            
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

            jqGridOpciones.setGridParam({
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
            /*var id = jqGridOpciones.jqGrid('getGridParam','selrow');
            var ret = jqGridOpciones.jqGrid('getRowData',id);            
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
});

function message(mess,clase){
    
    $('#msg').html(mess);
    $("#msg").addClass(clase);
    $("#msg").effect("highlight", {}, 3000);                          
    setTimeout(function(){ 
        $('#msg').html("");
        $("#msg").removeClass(clase);
    }, 6000);                                                 
}

/* Valida que el value pasado como parametro sea numero
 * Y ademas de ser un numero que sea entero.
    Los parametros son value (valor a comparar), y colname
    que es el nombre del campo que deseamos validar. 
*/
function checkNumberInt(value,colname){
    if(Math.floor(value)==value)
        return [true,""];
    else
        return [false,"El campo "+colname+" solo admite valor numericos enteros"];
}