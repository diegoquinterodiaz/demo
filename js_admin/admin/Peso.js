var vec=hoy().split('-');
var annio=null;
var ver=null;
var coda=null;
var select={
    '0':'esto'
};
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }
    
    jqGridPesos = jQuery("#tablaPesos").jqGrid({
        url:$("#base_url").val()+'admin/peso/select',
        datatype: "json",
        mtype: 'POST',        
        colNames:['A&Ntilde;O','VERSION','DESCRIPCION','INICIO','CIERRE','AREA','CODAREA'],
        colModel:[
        {
            name:'anno',
            index:'anno',           
            width:80
                  
        },        
        {
            name:'version',
            index:'version',           
            width:50
                  
        },
        {
            name:'descripcion',
            index:'descripcion',           
            width:250
                  
        },
        {
            name:'inicio',
            index:'inicio',           
            width:100
                  
        },
        {
            name:'cierre',
            index:'cierre',           
            width:100
                  
        },
        {
            name:'area',
            index:'area',           
            width:150
                  
        },
        {
            name:'codar',
            index:'codar',
            hidden:true,
            width:80
                  
        },
        ],
        rowNum:10,
        rowTotal: 100000,
        rownumbers: true,
        width:'auto',
        rowList:[10,20,30],
        emptyrecords:'No existen registros',
        pager: '#pTablaPesos',
        sortname: 'anno',
        viewrecords: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Periodos y Areas",
        multiselect: false,        
        //editurl: $("#base_url").val()+'admin/peso/ediData',
        onSelectRow:function(id){            
            var aux=jQuery(this).jqGrid('getRowData',id);
            annio=aux.anno;
            ver=aux.version;
            coda=aux.codar;  
            clear(annio,ver,coda);
        //            jqGridPesosTipo.jqGrid('setGridParam', {
        //                url:'../controller/Controller_1.php',
        //                datatype: "json",
        //                postData: {
        //                    clase: 'cmPesoTipoEvaluador',
        //                    oper:'select',
        //                    anno:annio,
        //                    version:ver,
        //                    codarea:coda
        //                }
        //            }).trigger("reloadGrid");
        }
    });
    jqGridPesos.filterToolbar({
        stringResult:true,
        searchOnEnter:false,
        defaultSearch:"cn"
    });
    jqGridPesos.navGrid("#pTablaPesos", {        
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

function clear(annio,version,codarea){
    $("#second").html("");    
    createGrid(annio, version, codarea)
}
function createGrid(anio,vers,codar){
    $("#second").html("AQUI");
    
    $("#second").html("<table id='tablaPesosTipo' style='font-size:12px;'></table>\n\
<div id='pTablaPesosTipo'></div>");    
    var select;
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/tipoevaluador/selectBox', 
        data:{           
            an:anio,
            vr:vers,
            cda:codar
        }, 
        dataType: 'json',
        success: function(response) {
            select=response;            
            jqGridPesosTipo = jQuery("#tablaPesosTipo").jqGrid({
                url:$("#base_url").val()+"admin/peso/selectSubGrid",
                datatype: "json",
                mtype: 'POST',
                postData: {                     
                    anno:anio,
                    version:vers,
                    codarea:codar
                },
                colNames:['TIPO EVALUADOR','PESO','CODTIPO','ANNO','VERSION','CODAREA'],
                colModel:[
                {
                    name:'tipo',
                    index:'tipo',
                    editable:true,
                    edittype:'select',
                    editoptions:{
                        value:select
                    },
                    editrules:{                
                        required: true
                    } ,
                    width:300                  
                },        
                {
                    name:'peso',
                    index:'peso',
                    editable:true,                    
                    editrules:{                
                        required: true,
                        custom:true,
                        custom_func:checkNumberInt
                    },
                    width:150
                  
                },
                {
                    name:'codtipo',
                    index:'codtipo',
                    hidden:true,
                    editable:true,
                    width:250
                  
                },
                {
                    name:'anno',
                    index:'anno', 
                    hidden:true,
                    editable:true,
                    width:100
                  
                },
                {
                    name:'version',
                    index:'version', 
                    hidden:true,
                    editable:true,
                    width:100
                  
                },        
                {
                    name:'codarea',
                    index:'codarea',
                    hidden:true,
                    editable:true,
                    width:80
                  
                },
                ],
                rowNum:10,
                rowTotal: 100000,
                rownumbers: true,
                width:'auto',
                rowList:[10,20,30],
                emptyrecords:'No existen registros',
                pager: '#pTablaPesosTipo',
                sortname: 'anno',
                viewrecords: true,
                loadonce:true,
                sortorder: "asc",
                caption:"Pesos segun tipo evaluador",
                multiselect: false,        
                editurl: $("#base_url").val()+"admin/peso/editData",
                loadComplete:function(data){
                //alert(data);
                }

            });
            jqGridPesosTipo.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
            jqGridPesosTipo.navGrid("#pTablaPesosTipo", {        
                edit: true,
                add: true,
                del: false,
                view: true,
                search: false        
            },            
            {   //Estas sentencias se ejecutan al editar
                closeAfterEdit: true,
                beforeShowForm:function(frm){
                    $('#tr_tipo',frm).hide();
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
                    jqGridPesosTipo.setGridParam({
                        datatype:'json'
                    }).trigger('reloadGrid');           
                    return [true];
                }
            },
            {   //Estas sentencias se ejecutan al adicionar
                closeAfterAdd: true,
                beforeShowForm:function(frm){
                    $('#tr_tipo',frm).show();
                },
                beforeSubmit: function(postdata, formid) {                    
                    if($("#tipo").val()=='-1')
                         return [false, "No existe mas tipos de evaluador", ""];                    
                    postdata['anno']=annio;                    
                    postdata['version']=ver;
                    postdata['codarea']=coda;
                    return [true, "", ""]; // <-- return [éxito, mensaje];
                },
                afterSubmit: function(response, postdata) {                                       
                 var respuesta = jQuery.parseJSON(response.responseText);
                    if(respuesta.state)
                        message(respuesta.msg,"ui-state-highlight");
                    else
                        message(respuesta.msg,"ui-state-error");                    
                    clear(annio,ver,coda);
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