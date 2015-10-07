var tipo=null;
$(document).ready(function(){
    
    if (history.forward(1)){
        location.replace(history.forward(1));
    }
    jqGridFamilia = jQuery("#tablaFamilia").jqGrid({
        url:$("#base_url").val()+'users/familia/select',
        datatype: "json",
        mtype: 'POST',
        colNames:['IDENTIFICACIÓN','NOMBRE','PRIMER APELLIDO',
        'SEGUNDO APELLIDO','PARENTESCO','FECHA NACIMIENTO','OCUPACIÓN','ACTIVO'],
        colModel:[
        {
            name:'ced',
            index:'ced',
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
            name:'nombre',
            index:'nombre',            
            editable:true,            
            width:150,
            editrules:{
                required: true
            }
        },
        {
            name:'apep',
            index:'apep',            
            editable:true,                      
            width:150,
            editrules:{
                required: true,
                edithidden:true
            }
        },
        {
            name:'apes',
            index:'apes',            
            editable:true,            
            width:150,
            editrules:{
                required: true,
                edithidden:true
            }
        },
        {
            name:'paren',
            index:'paren',            
            editable:true,            
            width:130,
            editrules:{
                required: true
            },
            edittype:'select',
            editoptions:{
                value:{
                    'Hija(o)':'Hija(o)',
                    'Hermana(0)':'Hermana(0)',
                    'Padre':'Padre',
                    'Madre':'Madre',
                    'Esposa(o)':'Esposa(o)',
                    'Otro':'Otro'
                }
            }
        }, 
        {
            name:'fec',
            index:'fec',            
            editable:true,
            hidden:true,            
            width:150,
            editrules:{
                required: true,
                edithidden:true
            }
        },         
        {
            name:'ocu',
            index:'ocu',            
            editable:true,
            hidden:true,            
            width:150,
            editrules:{
                required: true,
                edithidden:true
            }
        },
        {
            name:'activo',
            index:'activo',            
            editable:true,
            hidden:true,            
            width:150,
            editrules:{
                required: true,
                edithidden:true
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
        emptyrecords:'No existen registros',
        pager: '#pTablaFamilia',
        sortname: 'codrol',
        viewrecords: true,
        rownumbers: true,
        loadonce:true,
        sortorder: "asc",
        caption:"Familiares Registrados",
        multiselect: false,
        ignoreCase: true,        
        editurl: $("#base_url").val()+'users/familia/editData',
        loadComplete:function(data){
            //alert(data)
        },
        loadError : function(xhr,st,err) { 
            alert("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText+" con error"+err);
        }
    });
    jqGridFamilia.filterToolbar({
                stringResult:true,
                searchOnEnter:false,
                defaultSearch:"cn"
            });
    jqGridFamilia.navGrid("#pTablaFamilia", {        
        edit: true,
        add: true,
        del: false,
        view: true,
        search: false        
    },            
    {   //Seccion de reglas en la edicion
        closeAfterEdit:true, 
        beforeShowForm:function(){
            $('#ced').attr('readonly',true);
            var vec=hoy().split('-'); 
            $("#fec").datepicker({
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
                maxDate: new Date(vec[0],vec[1] -1,vec[2]),
                minDate: new Date(vec[0]-100,vec[1] -1,vec[2])
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

            jqGridFamilia.setGridParam({
                datatype:'json'
            }).trigger('reloadGrid');

            return[true];
        }
    },
    {    //Seccion de reglas en la adicion
        closeAfterAdd:true,
        beforeShowForm: function(frm) {             
            $('#ced').removeAttr('readonly'); 
            var vec=hoy().split('-'); 
            $("#fec").datepicker({
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sab'],
                dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
                weekHeader: 'Sm',
                dateFormat: 'yy-mm-dd',
                changeYear: true,
                yearRange: "-90:+0",
                nextText: 'Siguiente',
                prevText:'Anterior',
                showAnim: 'scale',       
                maxDate: new Date(vec[0],vec[1] -1,vec[2]),
                minDate: new Date(vec[0]-10,vec[1] -1,vec[2])
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

            jqGridFamilia.setGridParam({
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
            /*var id = jqGridFamilia.jqGrid('getGridParam','selrow');
            var ret = jqGridFamilia.jqGrid('getRowData',id);            
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