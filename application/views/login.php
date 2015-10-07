<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<title>Gestal! | Gestion de Talentos</title>
    <link rel="shortcut icon" href="<?php echo base_url();?>favicon.ico" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/estilos.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/style.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/overcast/jquery-ui-1.8.17.custom.css" />
    <script type="text/javascript" src="<?php echo base_url();?>js/jquery-1.7.1.min.js"></script>        
    <script type="text/javascript" src="<?php echo base_url();?>js/jquery-ui-1.8.17.custom.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>js/jquery.crypt.js"></script>        
    <script type="text/javascript" src="<?php echo base_url();?>js/index.js"></script>
</head>
<section id="form_log">        
    <div id="wrapper">
        <div id="login" class="animate form">
            <form name="login" id="lg_frm"  action="#" method="POST" autocomplete="on">
                <input type='hidden' name='base_url' id='base_url' value='<?php echo base_url();?>'>                
                <h1>gestal</h1> 
                <p> 
                    <label for="username" class="uname" data-icon="u" > Usuario </label>
                    <input id="username" name="user" required="required" type="text" placeholder="Usuario"/>
                </p>
                <p> 
                    <label for="password" class="youpasswd" data-icon="p"> Contrasenia </label>
                    <input id="password" name="pss" required="required" type="password" placeholder="eje. X8df!90EO" /> 
                </p>                                
                <p class="login button"> 
                    <input type="button" value="Ingresar" id="btn"/> 
                </p>
                <center>
                    <div id="msg">
                        
                    </div>
                </center>                                
            </form>
        </div>
    </div>
    <!-- <input type="text" name="registrado" id="registrado" value="<?php echo $state; ?>"/>     -->        

    <div id="error" style="display: none;">
        El usuario y/o contrase&ntilde;a son incorrectos.
    </div>
    <div id="error2" style="display: none;">
        Lo sentimos pero por motivos t&eacute;cnicos presentamos fallos.
    </div>
    <div id="error3" style="display: none;">
        Lo sentimos pero ha superado la cantidad de intentos (3),<br>su cuenta ha sido bloqueada contactese con el administrador.
    </div>
    <div id="error4" style="display: none;">
        El usuario y/o contrase&ntilde;a son incorrectos solo son 3 intentos.
    </div>
    <div id="error5" style="display: none;">
        La cuenta se encuentra inactiva.
    </div>
    <div id="error6" style="display: none;">            
    </div>        
</section>
</html>