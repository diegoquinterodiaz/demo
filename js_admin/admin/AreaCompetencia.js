var area=null;
var competencia=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }            
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/area/getArea',         
        dataType: 'json',
        success: function(respuesta) {
            area=respuesta;            
            $.ajax({
                type:'POST', 
                url: $("#base_url").val()+'admin/competencia/getCompetencia',         
                dataType: 'json',
                success: function(respuesta) {
                    competencia=respuesta;            
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
    jqGridAreaCompetencia = jQuery("#tablaAreaCompetencia").jqGrid({
        url:$("#base_url").val()+'admin/areacompetencia/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['AREA','COMPETENCIA','ACTIVO'],
        colModel:[        
        {
            name:'area',
            index:'area',            
            editable:true,            
            width:300,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:area
            }
        },        
        {
            name:'competencia',
            index:'competencia',            
            editable:true,            
            width:300,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:competencia
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
        //rowTotal: 100000,        
        width:'auto',
        height:300,        
        emptyrecords:'No existen registros',
        pager: '#pTablaAreaCompetencia',
        sortname: 'codrol',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Areas / Competencias",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/areacompetencia/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridAreaCompetencia.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridAreaCompetencia.navGrid("#pTablaAreaCompetencia", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true,
        beforeShowForm:function(){
            $("#area").attr('disabled','disabled');
            $("#competencia").attr('disabled','disabled');
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

            jqGridAreaCompetencia.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $("#area").removeAttr('disabled');
            $("#competencia").removeAttr('disabled');           
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

            jqGridAreaCompetencia.setGridParam({
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
            /*var id = jqGridAreaCompetencia.jqGrid('getGridParam','selrow');
            var ret = jqGridAreaCompetencia.jqGrid('getRowData',id);            
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