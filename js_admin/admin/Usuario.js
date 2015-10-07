var tipo=null;
var usuario=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/usuario/getTip',         
        dataType: 'json',
        success: function(respuesta) {            
            tipo=respuesta;
            $.ajax({
                type:'POST', 
                url: $("#base_url").val()+'admin/usuario/getUsu',         
                dataType: 'json',
                success: function(respuesta) {            
                    usuario=respuesta;
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
    jqGridUsuarios = jQuery("#tablaUsuarios").jqGrid({
        url:$("#base_url").val()+'admin/usuario/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['TIPO','PERSONA','USUARIO','CLAVE','REPETIR CLAVE','DESCRIPCION','ACTIVO'],
        colModel:[
        {
            name:'tipo',
            index:'tipo',
            editable:true,            
            editrules:{
                required: true                                
            },
            edittype:'select',
            editoptions:{
                value:tipo
            },
            width:100
                  
        },        
        {
            name:'persona',
            index:'persona',            
            editable:true,            
            width:300,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:usuario
            },
            width:300
        },
        {
            name:'usuario',
            index:'usuario',            
            editable:true,                        
            editrules:{
                required: true
            },                        
            width:100
        }, 
        {
            name:'clave1',
            index:'clave1',            
            editable:true,
            hidden:true,                        
            editrules:{
                required: true,
                edithidden:true,
                custom:true,
                custom_func:valPass
            },
            edittype:'password',            
            width:120
        },
        {
            name:'clave2',
            index:'clave2',
            hidden:true,            
            editable:true,                        
            editrules:{
                required: true,
                edithidden:true,
                custom:true,
                custom_func:checkPass
            },
            edittype:'password',            
            width:120
        },
          {
            name:'descripcion',
            index:'descripcion',            
            editable:true,            
            width:300,
            editrules:{
                required: true
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
        pager: '#pTablaUsuarios',
        sortname: 'codtipo',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Usuarios",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/usuario/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridUsuarios.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridUsuarios.navGrid("#pTablaUsuarios", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true,
        beforeShowForm: function(frm) {                                     
            $('#usuario').attr('disabled','disabled');
            $('#persona').attr('disabled','disabled');          
        },         
        beforeSubmit: function(postdata, formid) {            
            return [true, "", ""];
        },
        afterSubmit: function(response, postdata) {
           var respuesta = jQuery.parseJSON(response.responseText);
            if(respuesta.state)
                message(respuesta.msg,"ui-state-highlight");
            else
                message(respuesta.msg,"ui-state-error");

            jqGridUsuarios.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');
            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $('#tipo').removeAttr('disabled');            
            $('#usuario').removeAttr('disabled');
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

            jqGridUsuarios.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {  
    // //Seccion de reglas en la eliminacion                
        beforeSubmit: function(postdata, formid) {            
            /*postdata['oper']='del';
            postdata['tipo']=postdata;
            pos*/
            /*var id = jqGridUsuarios.jqGrid('getGridParam','selrow');
            var ret = jqGridUsuarios.jqGrid('getRowData',id);            
            postdata['oper']='del';
            postdata['activo']='1';
            postdata['descripcion']='';
            postdata['orden']='';
            postdata['tipo']=ret.tipo;*/
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

function valPass(value,colname){
    var regla = /^[A-Z]+\D*[0-9]+\D*$/;
    if ((value.match(regla)) && (value!='')) {
       // El email esta correcto
       if(value.length>=8){
            //debe tener una longitud minima de 
           return[true,""];
       }else{
            return[false,"La clave debe tener minimo una longitud de 8 caracteres"];        
       }
    } else {
      //El email no es correcto.
        return[false,"No cumple con las condiciones de seguridad"];
    }
}

function checkPass(value,colname){
    if(value.localeCompare($("#clave1").val())==0)
        return[true,""];
    else
       return[false,"Las claves no coinciden"];
        
}