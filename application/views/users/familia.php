<html lang="es">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>css_users/jquery-ui-1.9.2.custom.css">
<link rel="stylesheet" href="<?php echo base_url(); ?>css_admin/ui.jqgrid.css">
<script type="text/javascript" src="<?php echo base_url(); ?>js_users/jquery-ui-1.9.2.custom.min.js"></script>
<script src="<?php echo base_url(); ?>js_admin/i18n/grid.locale-es.js" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js_admin/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js_users/users/Familia.js"></script>
<!-- MAIN -->
<div id="main">
	<!-- wrapper-main -->
	<div class="wrapper">
		<center>
			<!-- content -->
			<div id="content">
				<center>
					<!-- title -->
					<div id="page-title">
						<span class="title">Usuario</span>
						<span class="subtitle"><?php echo $_SESSION['parametros']['usuario'];?></span>
					</div>


						<div id="msg">
							<!-- Aqui iran los diferentes mensajes que se deseen mostrar-->
						</div>
						<br>
						<table id="tablaFamilia" style="font-size:12px;">
							<tr><td>Accediendo a la información...</td></tr>
						</table>
						<div id="pTablaFamilia"></div>  
						<br><br>					
				</center>	    											
			</div>
			<!-- ENDS content -->	
		</center>

	</div>
	<!-- ENDS wrapper-main -->
</div>
	    	<!-- ENDS MAIN -->