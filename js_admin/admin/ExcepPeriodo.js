var periodo=null;
var colaborador=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }            
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/periodo/getPeriodo',         
        dataType: 'json',
        success: function(respuesta) {
            periodo=respuesta;            
            $.ajax({
                type:'POST', 
                url: $("#base_url").val()+'admin/colaborador/getColab',         
                dataType: 'json',
                success: function(respuesta) {
                    colaborador=respuesta;            
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
    jqGridExcepPeriodo = jQuery("#tablaExcepPeriodo").jqGrid({
        url:$("#base_url").val()+'admin/excepperiodo/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['PERIODO','COLABORADOR','FECHA CIERRE','OBSERVACIONES'],
        colModel:[        
        {
            name:'periodo',
            index:'periodo',            
            editable:true,            
            width:200,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:periodo
            }
        },        
        {
            name:'colaborador',
            index:'colaborador',            
            editable:true,            
            width:200,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:colaborador
            }
        },       
        {
            name:'fechacierre',
            index:'fechacierre',            
            editable:true,            
            width:80,
            editrules:{
                required: true
            }
        },
        {
            name:'observaciones',
            index:'observaciones',            
            editable:true,            
            width:200,
            edittype:'textarea',
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
        pager: '#pTablaExcepPeriodo',
        sortname: 'codrol',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Excepciones / Periodos",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/excepperiodo/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridExcepPeriodo.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridExcepPeriodo.navGrid("#pTablaExcepPeriodo", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true,
        beforeShowForm: function(frm) {             
            $('#periodo').attr('disabled','disabled');
            $('#colaborador').attr('disabled','disabled');            
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

            jqGridExcepPeriodo.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $('#periodo').removeAttr('disabled');
            $('#colaborador').removeAttr('disabled'); 
            var vec=hoy().split('-'); 
            $("#fechacierre").datepicker({
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sab'],
                dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
                weekHeader: 'Sm',
                dateFormat: 'yy-mm-dd',
                changeYear: true,
                nextText: 'Siguiente',
                prevText:'Anterior',
                showAnim: 'scale'       
                /*minDate: new Date(vec[0],vec[1] -1,vec[2])*/
            });           
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

            jqGridExcepPeriodo.setGridParam({
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
            /*var id = jqGridExcepPeriodo.jqGrid('getGridParam','selrow');
            var ret = jqGridExcepPeriodo.jqGrid('getRowData',id);            
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