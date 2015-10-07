var colaborador=null;
var rol=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }            
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/colaborador/getColab',         
        dataType: 'json',
        success: function(respuesta) {
            colaborador=respuesta;            
            $.ajax({
                type:'POST', 
                url: $("#base_url").val()+'admin/rol/getRol',         
                dataType: 'json',
                success: function(respuesta) {
                    rol=respuesta;            
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
    jqGridRolColaborador = jQuery("#tablaRolColaborador").jqGrid({
        url:$("#base_url").val()+'admin/rolcolaborador/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['ROL','COLABORADOR','ACTIVO','FECHA'],
        colModel:[
        {
            name:'rol',
            index:'rol',            
            editable:true,            
            width:300,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:rol
            }
        },        
        {
            name:'colaborador',
            index:'colaborador',            
            editable:true,            
            width:300,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:colaborador
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
        },
        {
            name:'fecha',
            index:'fecha',            
            editable:true,
            hidden:true,            
            width:130,
            editrules:{
                required: true
            }
        }
               
        ],
        rowNum:10000,
        //rowTotal: 100000,        
        width:'auto',
        height:300,        
        emptyrecords:'No existen registros',
        pager: '#pTablaRolColaborador',
        sortname: 'codrol',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Roles / Colaboradores",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/rolcolaborador/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridRolColaborador.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridRolColaborador.navGrid("#pTablaRolColaborador", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true, 
        beforeShowForm:function(){
            $("#rol").attr('disabled','disabled');
            $("#colaborador").attr('disabled','disabled');

        },        
        beforeSubmit: function(postdata, formid) {
            postdata['fecha_actual']=hoy();            
            return [true, "", ""]; // <-- return [éxito, mensaje];
        },
        afterSubmit: function(response, postdata) {
           var respuesta = jQuery.parseJSON(response.responseText);
            if(respuesta.state)
                message(respuesta.msg,"ui-state-highlight");
            else
                message(respuesta.msg,"ui-state-error");

            jqGridRolColaborador.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $('#rol').removeAttr('disabled');            
            $('#colaborador').removeAttr('disabled');
            $('#fecha').val(hoy());
        },
        beforeSubmit: function(postdata, formid) {
            postdata['fecha_actual']=hoy();            
            return [true, "", ""]; // <-- return [éxito, mensaje];
        },
        afterSubmit: function(response, postdata) {                       
            var respuesta = jQuery.parseJSON(response.responseText);
            if(respuesta.state)
                message(respuesta.msg,"ui-state-highlight");
            else
                message(respuesta.msg,"ui-state-error");

            jqGridRolColaborador.setGridParam({
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
            /*var id = jqGridRolColaborador.jqGrid('getGridParam','selrow');
            var ret = jqGridRolColaborador.jqGrid('getRowData',id);            
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

function hoy(){
    var fecha =new Date();
    fecha.getDate();
    var dia=fecha.getDate();
    if(dia<10)
        dia="0"+dia;
    var mes=fecha.getMonth() +1 ;
    if(mes<10)
        mes="0"+mes;
    var anio=fecha.getFullYear();
    var hoy=anio + "-" + mes + "-" +dia;
    return hoy;
}