var lider=null;
var dependiente=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }
    $.ajax({
        type:'POST', 
        url: $("#base_url").val()+'admin/usuario/getLider',         
        dataType: 'json',
        success: function(respuesta) {            
            lider=respuesta;
            crearGrid();             
            /*$.ajax({
                type:'POST', 
                url: $("#base_url").val()+'admin/usuario/getUsuBox',         
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
            })*/;                                           
        },        
        error:function(jqXHR, textStatus, errorThrown){
            alert(jqXHR.status+" ,+");
            alert(textStatus);
            alert(errorThrown)
        }
    });            
    
});

function crearGrid(){
    jqGridJerarquia = jQuery("#tablaJerarquia").jqGrid({
        url:$("#base_url").val()+'admin/jerarquia/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['LIDER','DEPENDIENTE','ACTIVO'],
        colModel:[
        {
            name:'lider',
            index:'lider',
            editable:true,            
            editrules:{
                required: true                                
            },
            edittype:'select',
            editoptions:{
                value:lider
            },
            width:300
                  
        },        
        {
            name:'dependiente',
            index:'dependiente',            
            editable:true,            
            width:300,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:lider
            }
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
        pager: '#pTablaJerarquia',
        sortname: '',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Jerarquia (Administracion de asignaciones)",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'admin/jerarquia/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridJerarquia.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridJerarquia.navGrid("#pTablaJerarquia", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true,
        beforeShowForm: function(frm) {                                     
            $('#dependiente').attr('disabled','disabled');
            $('#lider').attr('disabled','disabled');          
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

            jqGridJerarquia.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');
            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $('#lider').removeAttr('disabled');
            $("#lider").change(function(){
                if($(this).val()!=0){
                    $.ajax({
                        type:'POST', 
                        url: $("#base_url").val()+'admin/usuario/getDependiente',         
                        dataType: 'json',
                        data:{
                            lider:$("#lider").val()
                        },
                        success: function(respuesta) {
                            $('#dependiente').html("");            
                            $.each(respuesta,function(indice,valor){
                                $('#dependiente').append("<option value='"+indice+"'>"+valor+"</option>");
                            });                                                                
                        },        
                        error:function(jqXHR, textStatus, errorThrown){
                            alert(jqXHR.status);
                            alert(textStatus);
                            alert(errorThrown)
                        }
                    });
                }
            });            
            $('#dependiente').removeAttr('disabled');
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

            jqGridJerarquia.setGridParam({
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
            /*var id = jqGridJerarquia.jqGrid('getGridParam','selrow');
            var ret = jqGridJerarquia.jqGrid('getRowData',id);            
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
        return[false,"No cumple con las condiciones de Jerarquia"];
    }
}

function checkPass(value,colname){
    if(value.localeCompare($("#clave1").val())==0)
        return[true,""];
    else
       return[false,"Las claves no coinciden"];
        
}