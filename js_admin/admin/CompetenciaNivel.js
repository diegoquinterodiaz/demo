var nivel=null;
var competencia=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }            
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/nivel/getNivel',         
        dataType: 'json',
        success: function(respuesta) {
            nivel=respuesta;            
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
    jqGridCompetenciaNivel = jQuery("#tablaCompetenciaNivel").jqGrid({
        url:$("#base_url").val()+'admin/competencianivel/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['COMPETENCIA','NIVEL','ACTIVO'],
        colModel:[ 
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
            name:'nivel',
            index:'nivel',            
            editable:true,            
            width:300,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:nivel
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
        pager: '#pTablaCompetenciaNivel',
        sortname: 'codrol',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Competencias / Niveles",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/competencianivel/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridCompetenciaNivel.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridCompetenciaNivel.navGrid("#pTablaCompetenciaNivel", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true,
        beforeShowForm:function(){
            $("#nivel").attr('disabled','disabled');
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

            jqGridCompetenciaNivel.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $("#nivel").removeAttr('disabled');
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

            jqGridCompetenciaNivel.setGridParam({
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
            /*var id = jqGridCompetenciaNivel.jqGrid('getGridParam','selrow');
            var ret = jqGridCompetenciaNivel.jqGrid('getRowData',id);            
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