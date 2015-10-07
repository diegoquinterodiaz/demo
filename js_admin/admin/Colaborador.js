var vec=hoy().split('-');
$(document).ready(function(){    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }
    /*
     * Creamos el jqgrid, indicamos la clase y el metodo que se 
     * deben ejecutar para traer la informacion desde la bd que se desea 
     * administrar, desde el mismo grid se permite adicionar y editar
     * informacion, no se puede eliminar informacion alguna.
     */
    jqGridColaborador = jQuery("#tablaColaborador").jqGrid({
        url:$("#base_url").val()+'admin/colaborador/select',
        datatype: "json",
        mtype: 'POST',        
        colNames:['CEDULA','CIUDAD EXPEDICION','NOMBRE','PRI. APPELIDO','SEG. APELLIDO','LIBRETA MILITAR','DISTRITO',
                  'SEXO','ESTADO CIVIL','FECHA NACIMIENTO','PAIS','DEPARTAMENTO','CIUDAD','DIRECCION','BARRIO RESIDENCIA',
                  'CIUDAD RESIDENCIA','TELEFONO FIJO','TELEFONO MOVIL','TIPO VIVIENDA','FECHA INGRESO',
                  'EMAIL PERSONAL','EMAIL EMPRESA','SALARIO','CODIGO INTERNO','EPS',
                  'ARP','PENSION','CESANTIAS',
                  'FECHA RETIRO','MOTIVO RETIRO','CONTRATABLE','ACTIVO'],
        colModel:[
        {
            name:'cedula',
            index:'cedula',
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
            name:'expcedula',
            index:'expcedula',            
            editable:true,
            hidden:true,
            width:130,
            editrules:{
                required: true,
                edithidden: true
            }
        },
        {
            name:'nombre',
            index:'nombre',            
            editable:true,
            width:130,
            editrules:{                
                required: true
            }            
        },        
        {
            name:'apellidop',
            index:'apellidop',            
            editable:true,
            width:130,
            editrules:{                
                required: true
            }  
        },
        {
            name:'apellidos',
            index:'apellidos', 
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                edithidden: true
            }  
        },
        {
            name:'libretamil',
            index:'libretamil',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'distritomil',
            index:'distritomil',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'sexo',
            index:'sexo',          
            editable:true,
            hidden:true,
            width:130,
             edittype:'select', 
            editoptions:{
                value:{
                    'F':'FEMENINO',
                    'M':'MASCULINO'
                }},
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'estadocivil',
            index:'estadocivil',
            hidden:true,
            editable:true,
            width:130,
             edittype:'select', 
            editoptions:{
                value:{
                    'CASADA(0)':'CASADA(0)',
                    'SOLTERA(O)':'SOLTERA(O)',
                    'SEPARADA(O)':'SEPARADA(O)',
                    'UNION LIBRE':'UNION LIBRE',
                    'VIUDA(O)':'VIUDA(O)'
                }},
            editrules:{                
                required: true,
                edithidden: true
            } 
        },
        {
            name:'fechanacim',
            index:'fechanacim',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'paisnacim',
            index:'paisnacim',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'deptonacim',
            index:'deptonacim',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'ciudadnacim',
            index:'ciudadnacim',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'direccion',
            index:'direccion',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'barrio',
            index:'barrio',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'ciudadresid',
            index:'ciudadresid',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'telefonoresid',
            index:'telefonoresid',           
            editable:true,
            width:130,
            editrules:{                
                required: true
            }  
        },
        {
            name:'celular',
            index:'celular',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'tipovivienda',
            index:'tipovivienda',
            hidden:true,
            editable:true,
            width:130,
             edittype:'select', 
            editoptions:{
                value:{
                    'ALQUILADA':'ALQUILADA',
                    'PROPIA':'PROPIA',
                    'FAMILIAR':'FAMILIAR'
                }},
            editrules:{                
                required: true,
                edithidden: true
            } 
        },
        {
            name:'fechaingreso',
            index:'fechaingreso',            
            editable:true,
            width:130,
            editrules:{                
                required: true
            }  
        },
        {
            name:'mailpersonal',
            index:'mailpersonal',            
            editable:true,
            hidden:true,
            width:130,
            editrules:{                                
                email:true,
                edithidden: true
            }  
        },
        {
            name:'mailempresa',
            index:'mailempresa',            
            editable:true,
            hidden:true,
            width:130,
            editrules:{                                
                email:true,
                edithidden: true
            }  
        },
        {
            name:'salario',
            index:'salario',            
            editable:true,
            hidden:true,
            width:130,
            editrules:{                                                
                edithidden: true
            } 
        },
        {
            name:'codigo',
            index:'codigo',            
            editable:true,
            hidde:true,
            width:130,
            editrules:{                                                
                edithidden: true
            } 
        },
        {
            name:'eps',
            index:'eps',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'arp',
            index:'arp',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'pension',
            index:'pension',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'cesantias',
            index:'cesantias',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
         {
            name:'fecharetiro',
            index:'fecharetiro',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                                
                edithidden: true
            }  
        },
         {
            name:'motivoretiro',
            index:'motivoretiro',
            hidden:true,
            editable:true,
            width:130,
            editrules:{                                
                edithidden: true
            }  
        },
        {
            name:'contratable',
            index:'contratable',
            hidden:true,
            editable:true,
            width:130,
            edittype:'select', 
            editoptions:{
                value:{
                    'SI':'SI',
                    'NO':'NO'
                }
            },
            editrules:{                
                required: true,
                edithidden: true
            }  
        },
        {
            name:'activo',
            index:'activo',            
            editable:true,
            width:60,
            edittype:'select', 
            editoptions:{
                value:{
                    '1':'ACTIVO',
                    '2':'INACTIVO'
                }
            },
            editrules:{                
                required: true
            }  
        }
        ],
        rowNum:100000,
        rowTotal: 100000,
        rownumbers: true,
        width:'auto',
        height:250,
        //rowList:[10,20,30],
        emptyrecords:'No existen registros',
        pager: '#pTablaColaborador',
        sortname: 'cedula',
        viewrecords: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Listado de Colaboradores",
        multiselect: false,        
        editurl: $("#base_url").val()+'admin/colaborador/editData'
    });
    jqGridColaborador.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridColaborador.navGrid("#pTablaColaborador", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Estas sentencias se ejecutan al editar
        closeAfterEdit:true,
        beforeShowForm:function(frm){
            $("#fechaingreso").datepicker({
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
                showAnim: 'scale',        
                maxDate: new Date(vec[0],vec[1] -1,vec[2])
            });
            $("#fecharetiro").datepicker({
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
                showAnim: 'scale',        
                maxDate: new Date(vec[0],vec[1] -1,vec[2])
            });
            $("#fechanacim").datepicker({
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
                showAnim: 'scale',        
                maxDate: new Date((vec[0]-18),vec[1] -1,vec[2])
            });

            $("#cedula").attr('readonly',true);
        },
        beforeSubmit: function(postdata, formid) {
            postdata['clase'] = 'cmColaborador2'
            return [true, "", ""]; // <-- return [éxito, mensaje];
        },
        afterSubmit: function(response, postdata) {            
            var respuesta = jQuery.parseJSON(response.responseText);
            //alert(respuesta.mensaje)
            if (!respuesta.ok) {
                message(respuesta.msg,"ui-state-highlight"); 
            }
            else{
                message(respuesta.msg,"ui-state-error");
            }
            jqGridColaborador.setGridParam({datatype:'json'}).trigger('reloadGrid');           
            return [true];
        }
    },
    {   //Estas sentencias se ejecutan al adicionar
        closeAfterAdd:true,
        beforeShowForm: function(frm) { 
            $('#cedula').removeAttr('readonly');
            $("#fechaingreso").datepicker({
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
                showAnim: 'scale',        
                maxDate: new Date(vec[0],vec[1] -1,vec[2])
            });
            $("#fecharetiro").datepicker({
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
                showAnim: 'scale',        
                maxDate: new Date(vec[0],vec[1] -1,vec[2])
            });
            $("#fechanacim").datepicker({
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
                showAnim: 'scale',        
                maxDate: new Date((vec[0]-18),vec[1] -1,vec[2])
            });
        },
        beforeSubmit: function(postdata, formid) {            
            return [true, "", ""]; // <-- return [éxito, mensaje];
        },
        afterSubmit: function(response, postdata) {
            var respuesta = jQuery.parseJSON(response.responseText);            
            if (!respuesta.ok) {
                message(respuesta.msg,"ui-state-highlight"); 
            }
            else{
                message(respuesta.msg,"ui-state-error");
            }
            jqGridColaborador.setGridParam({datatype:'json'}).trigger('reloadGrid');            
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
});

/*
 * Esta funcion es la encargada de crear un dialogo,
 * que servira para mostrar los mensajes indicando
 * el estado de las transacciones
 */
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