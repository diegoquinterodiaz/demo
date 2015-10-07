$(document).ready(function(){ 
    if (history.forward(1)){
        location.replace(history.forward(1));
    } 
 $("#btn").click(function(){        
    if ($("#username").val()!="" && $("#password").val()!="") {
        var pss=$().crypt({method:"sha1",source:$("#password").val()});        
        $.ajax({
            type:'POST', 
            url:$('#base_url').val()+'login_controller/logIN', 
            data:{
                user:$("#username").val(),
                pss:pss
            }, 
            dataType: 'json',
            success: function(response) {                                        
                    if(response.state==1){
                        $('#msg').html("Registrado correctamente");
                        $("#msg").addClass("ui-state-highlight");
                        $("#msg").effect("highlight", {}, 1000);
                        setTimeout(function(){
                            $('#msg').html("");
                            $("#msg").removeClass("ui-state-highlight");
                            if(response.tipo=='SADM') 
                                $(location).attr('href',$('#base_url').val()+'admin/panel');
                            else
                                $(location).attr('href',$('#base_url').val()+'users/panel_user');
                        }, 1000);                        
                    }else{
                        $("#msg").addClass("ui-state-error");                        
                        $('#msg').html("Ususario y/o contrasena incorrectas");                        
                        $("#msg").effect("highlight", {}, 3000);
                        setTimeout(function(){ 
                            $('#msg').html("");
                            $("#msg").removeClass("ui-state-error");
                        }, 4000); 
                        
                    }
            },        
            error:function(jqXHR, textStatus, errorThrown){
                alert(jqXHR.status);
                alert(textStatus);
                alert(errorThrown)
            }
        });
    }
}); 
});

function mensaje(idDiv,titulo){
    var div='#'+idDiv;    
    $(div).dialog({
        modal: true,
        title:titulo,
        show: "explode",
        hide: "explode",
        close:function(){
            $("#registrado").val(null);
        }
    }); 
}