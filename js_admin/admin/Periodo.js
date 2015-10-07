var tipo=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }
    jqGridPeriodo = jQuery("#tablaPeriodo").jqGrid({
        url:$("#base_url").val()+'admin/periodo/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['AÑO','VERSION','DESCRIPCION','FECHA INICIO','FECHA CIERRE','ACTIVO'],
        colModel:[
        {
            name:'ano',
            index:'ano',
            editable:true,
            editoptions: {
                readonly: true
            },            
            editrules:{
                required: true                                
            },
            width:80
                  
        },
        {
            name:'version',
            index:'version',
            editable:true,
            editoptions: {
                readonly: true
            },            
            editrules:{
                required: true                                
            },
            width:80
                  
        },       
        {
            name:'descripcion',
            index:'descripcion',            
            editable:true,            
            width:200,
            editrules:{
                required: true
            }
        },
        {
            name:'fecini',
            index:'fecini',
            editable:true,                    
            editrules:{
                required: true                                
            },
            width:90
                  
        },
        {
            name:'fecfin',
            index:'fecfin',
            editable:true,                        
            editrules:{
                required: true                                
            },
            width:90
                  
        },        
        {
            name:'activo',
            index:'activo',            
            editable:true,            
            width:50,
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
        pager: '#pTablaPeriodo',
        sortname: 'codrol',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Periodo",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/periodo/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridPeriodo.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridPeriodo.navGrid("#pTablaPeriodo", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true, 
        beforeShowForm:function(){
            $('#ano').attr('readonly',true);
            $('#version').attr('readonly',true);
            var vec=hoy().split('-'); 
            $("#fecini").datepicker({
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
            });                        
            $("#fecfin").datepicker({
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
               /* minDate: new Date(vec[0],vec[1] -1,vec[2])*/
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

            jqGridPeriodo.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $('#ano').removeAttr('readonly');            
            $('#version').removeAttr('readonly');
            $("#fecini").val(null);
            $("#fecfin").val(null);
            var vec=hoy().split('-'); 
            $("#fecini").datepicker({
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
            $("#fecfin").datepicker({
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

            jqGridPeriodo.setGridParam({
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
            /*var id = jqGridPeriodo.jqGrid('getGridParam','selrow');
            var ret = jqGridPeriodo.jqGrid('getRowData',id);            
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