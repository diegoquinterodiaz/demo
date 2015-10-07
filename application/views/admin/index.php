<?php 
	header('Content-Type: text/html; charset=utf-8');
 ?>
<!doctype html>
<html lang="es">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Gestal! | Administracion de modulos</title>
	
	<link rel="stylesheet" href="<?php echo base_url();?>css_admin/layout.css" type="text/css" media="screen" />
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="<?php echo base_url();?>js_admin/jquery-1.5.2.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url();?>js_admin/hideshow.js" type="text/javascript"></script>
	<script src="<?php echo base_url();?>js_admin/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php echo base_url();?>js_admin/jquery.equalHeight.js"></script>
	<script type="text/javascript">
	$(document).ready(function() 
    	{ 
      	  //$(".tablesorter").tablesorter();
      	  if (history.forward(1)){
	        location.replace(history.forward(1));
	    }  
   	 } 
	);
	$(document).ready(function() {

	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});

});
    </script>
    <script type="text/javascript">
    $(function(){
        //$('.column').equalHeight();
    });
</script>

</head>


<body>
	<input type="hidden" id="base_url" name="base_url" value="<?php echo base_url(); ?>">
	<header id="header">
		<hgroup>
			<h1 class="site_title">Administrador</h1>							
		</hgroup>
	</header> <!-- end of header bar -->
	
	<section id="secondary_bar">
		<div class="user">
			<p><?php echo $_SESSION['parametros']['usuario']; ?></p>
			<!-- <a class="logout_user" href="#" title="Logout">Logout</a> -->
		</div>
		<div class="breadcrumbs_container">
			<article class="breadcrumbs"><a href="<?php echo base_url()."admin/panel"; ?>">Inicio Admin</a> <div class="breadcrumb_divider"></div> <a class="current">Dashboard</a></article>
		</div>
	</section><!-- end of secondary bar -->
	
	<aside id="sidebar" class="column">
		<!-- <form class="quick_search">
			<input type="text" value="Quick Search" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;">
		</form> -->
		<hr/>
		<?php 
		$existentes=array();
		$i=0;		
		foreach ($query->result() as $row) {
			if (!in_array($row->descripcion,$existentes)) {
				if ($i==0) {
					echo "<h3>".$row->descripcion."</h3>";
				}else{
					echo "</ul><h3>".$row->descripcion."</h3>";
				}					
				echo "<ul class='toggle'>";
				echo "<li><a href='".base_url()."admin/".$row->archivo."'>".$row->opcion."</a></li>";				
				array_push($existentes,$row->descripcion);
			}else{
				echo "<li><a href='".base_url()."admin/".$row->archivo."'>".$row->opcion."</a></li>";
			}
			$i++;
		}
		echo "</ul>"		
		?>					
		<h3>Administrador</h3>
		<ul class="toggle">			
			<li class="icn_security"><a href="#">Seguridad</a></li>
			<li class="icn_jump_back"><a href="#">Salir</a></li>
		</ul>
		
		<footer style="font-size:10px;">
			<hr />
			<p><strong>Copyright &copy; 2011 Website Admin</strong></p>
			<p>Theme by <a href="http://www.medialoot.com">MediaLoot</a></p>
		</footer>
	</aside><!-- end of sidebar -->
</body>

</html>
