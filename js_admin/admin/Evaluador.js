var vec=hoy().split('-');
var cedula=null;
var periodo, colaborador, tipoeval = null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }
    
    jqGridPesos = jQuery("#tablaEvaluado").jqGrid({
        url:$("#base_url").val()+'admin/colaborador/selectGrid',
        datatype: "json",
        mtype: 'POST',        
        colNames:['CEDULA','COLABORADOR'],
        colModel:[
        {
            name:'cedula',
            index:'cedula',           
            width:150
                  
        },        
        {
            name:'colaborador',
            index:'colaborador',           
            width:400
                  
        }        
        ],
        rowNum:10,
        rowTotal: 100000,
        rownumbers: true,
        width:'auto',
        height:"250",
        rowList:[10,20,30],
        emptyrecords:'No existen registros',
        pager: '#pTablaEvaluado',
        sortname: 'anno',
        viewrecords: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Evaluados",
        multiselect: false,        
        //editurl: $("#base_url").val()+'admin/peso/ediData',
        onSelectRow:function(id){            
            var aux=jQuery(this).jqGrid('getRowData',id);
            cedula=aux.cedula;
            clear(cedula);       
        }/*,
        loadComplete:function(data){
            alert(data);
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText);
        }*/
    });
    jqGridPesos.filterToolbar({
        stringResult:true,
        searchOnEnter:false,
        defaultSearch:"cn"
    });
    jqGridPesos.navGrid("#pTablaEvaluado", {        
        edit: false,
        add: false,
        del: false,
        view: true,
        search: false        
    },            
    {   //Estas sentencias se ejecutan al editar
       
    },
    {   //Estas sentencias se ejecutan al adicionar
        
    },
    {  
    //Eliminar
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

function clear(cedula){
    $("#second").html("");    
    createGrid(cedula);
}

function createGrid(cedula){
    $("#second").html("AQUI");
    
    $("#second").html("<table id='tablaEvaluadores' style='font-size:12px;'></table>\n\
<div id='pTablaEvaluadores'></div>");    
    var select;
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/periodo/getPeriodo2',         
        dataType: 'json',
        success: function(response) {
            periodo=response;
            $.ajax({
                type:'POST', 
                url: $("#base_url").val()+'admin/colaborador/getColab',         
                dataType: 'json',
                success: function(response) {
                    colaborador=response;
                    $.ajax({
                        type:'POST', 
                        url: $("#base_url").val()+'admin/tipoevaluador/selectBox2',         
                        dataType: 'json',
                        success: function(response) {
                            tipoeval=response;
                            
                            jqGridPesosTipo = jQuery("#tablaEvaluadores").jqGrid({
                                url:$("#base_url").val()+"admin/evaluador/select",
                                datatype: "json",
                                mtype: 'POST',
                                postData: {                     
                                   ced:cedula
                                },
                                colNames:['PERIODO','EVALUADOR','TIPO EVALUACION','ACTIVO'],
                                colModel:[
                                {
                                    name:'periodo',
                                    index:'periodo',
                                    editable:true,
                                    edittype:'select',
                                    editoptions:{
                                        value:periodo
                                    },
                                    editrules:{                
                                        required: true
                                    } ,
                                    width:100                  
                                },        
                                {
                                    name:'evaluador',
                                    index:'evaluador',
                                    editable:true,
                                    edittype:'select',
                                    editoptions:{
                                        value:colaborador
                                    },                    
                                    editrules:{                
                                        required: true                        
                                    },
                                    width:300
                                  
                                },
                                {
                                    name:'tipo',
                                    index:'tipo',
                                    edittype:'select',
                                    editoptions:{
                                        value:tipoeval
                                    },                    
                                    editable:true,
                                    width:150
                                  
                                },
                                {
                                    name:'activo',
                                    index:'activo',
                                    editable:true,
                                    hidden:true,
                                    edittype:'select',
                                    editoptions:{
                                        value:{
                                            '1':'Activo',
                                            '2':'Inactivo'
                                        }
                                    },
                                    editrules:{                
                                        required: true,
                                        edithidden:true
                                    } ,
                                    width:100                  
                                },
                                ],
                                rowNum:10,
                                rowTotal: 100000,
                                rownumbers: true,
                                width:'auto',
                                rowList:[10,20,30],
                                emptyrecords:'No existen registros',
                                pager: '#pTablaEvaluadores',
                                sortname: 'anno',
                                viewrecords: true,
                                loadonce:true,
                                sortorder: "asc",
                                caption:"Evaluadores",
                                multiselect: false,        
                                editurl: $("#base_url").val()+"admin/evaluador/editData",
                                loadComplete:function(data){
                                //alert(data);
                                }

                            });
                            jqGridPesosTipo.filterToolbar({
                                stringResult:true,
                                searchOnEnter:false,
                                defaultSearch:"cn"
                            });
                            jqGridPesosTipo.navGrid("#pTablaEvaluadores", {        
                                edit: true,
                                add: true,
                                del: false,
                                view: true,
                                search: false        
                            },            
                            {   //Estas sentencias se ejecutan al editar
                                closeAfterEdit: true,
                                beforeShowForm:function(frm){
                                    $('#periodo').attr('disabled','disabled');                            
                                    $('#evaluador').attr('disabled','disabled');
                                    $('#tipo').attr('disabled','disabled');
                                },
                                beforeSubmit: function(postdata, formid) {
                                    postdata['evaluado']=cedula;                                        
                                    return [true, "", ""]; // <-- return [éxito, mensaje];
                                },
                                afterSubmit: function(response, postdata) {            
                                    var respuesta = jQuery.parseJSON(response.responseText);
                                    if(respuesta.state)
                                        message(respuesta.msg,"ui-state-highlight");
                                    else
                                        message(respuesta.msg,"ui-state-error");
                                    jqGridPesosTipo.setGridParam({
                                        datatype:'json'
                                    }).trigger('reloadGrid');           
                                    return [true];
                                }
                            },
                            {   //Estas sentencias se ejecutan al adicionar
                                closeAfterAdd: true,
                                beforeShowForm:function(frm){
                                    $('#periodo').removeAttr('disabled'); 
                                    $('#evaluador').removeAttr('disabled');
                                    $('#tipo').removeAttr('disabled');
                                },
                                beforeSubmit: function(postdata, formid) {                                               
                                    postdata['evaluado']=cedula;                           
                                    return [true, "", ""]; // <-- return [éxito, mensaje];
                                },
                                afterSubmit: function(response, postdata) {                                       
                                 var respuesta = jQuery.parseJSON(response.responseText);
                                    if(respuesta.state)
                                        message(respuesta.msg,"ui-state-highlight");
                                    else
                                        message(respuesta.msg,"ui-state-error");                    
                                    clear(cedula);
                                    return [true];
                                }
                        
                            },
                            {  
                            //Eliminar
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
                    });                    
                }
            });                            
        }
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

function checkNumberInt(value,colname){
    if(Math.floor(value)==value && Math.floor(value)>=0)
        return [true,""];
    else
        return [false,"El campo "+colname+" solo admite valor numericos enteros y positivos"];
}