<!DOCTYPE  html>
<html>
<head>
	<meta charset="utf-8">
	<title>Gestal!</title>

	<!-- CSS -->
	<link rel="stylesheet" href="<?php echo base_url();?>css_users/style.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url();?>css_users/social-icons.css" type="text/css" media="screen" />
		<!--[if IE 8]>
			<link rel="stylesheet" type="text/css" media="screen" href="<?php echo base_url();?>css_users/ie8-hacks.css" />
			<![endif]-->
			<!-- ENDS CSS -->	

		<!-- GOOGLE FONTS 
		<link href='http://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>-->
		
		<!-- JS -->
		<script type="text/javascript" src="<?php echo base_url();?>js_users/jquery-1.5.1.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url();?>js_users/jquery-ui-1.8.13.custom.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url();?>js_users/easing.js"></script>
		<script type="text/javascript" src="<?php echo base_url();?>js_users/jquery.scrollTo-1.4.2-min.js"></script>
		<script type="text/javascript" src="<?php echo base_url();?>js_users/jquery.cycle.all.js"></script>
		<script type="text/javascript" src="<?php echo base_url();?>js_users/custom.js"></script>
		
		<!-- Isotope -->
		<script src="<?php echo base_url();?>js_users/jquery.isotope.min.js"></script>
		
		<!--[if IE]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
			<![endif]-->

		<!--[if IE 6]>
			<script type="text/javascript" src="<?php echo base_url();?>js_users/DD_belatedPNG.js"></script>
			<script>
	      		/* EXAMPLE */
	      		//DD_belatedPNG.fix('*');
	    	</script>
	    	<![endif]-->
	    	<!-- ENDS JS -->


	    	<!-- Nivo slider -->
	    	<link rel="stylesheet" href="<?php echo base_url();?>css_users/nivo-slider.css" type="text/css" media="screen" />
	    	<script src="<?php echo base_url();?>js_users/nivo-slider/jquery.nivo.slider.js" type="text/javascript"></script>
	    	<!-- ENDS Nivo slider -->

	    	<!-- tabs -->
	    	<link rel="stylesheet" href="<?php echo base_url();?>css_users/tabs.css" type="text/css" media="screen" />
	    	<script type="text/javascript" src="<?php echo base_url();?>js_users/tabs.js"></script>
	    	<!-- ENDS tabs -->

	    	<!-- prettyPhoto -->
	    	<script type="text/javascript" src="<?php echo base_url();?>js_users/prettyPhoto/js/jquery.prettyPhoto.js"></script>
	    	<link rel="stylesheet" href="<?php echo base_url();?>js_users/prettyPhoto/css/prettyPhoto.css" type="text/css" media="screen" />
	    	<!-- ENDS prettyPhoto -->

	    	<!-- superfish -->
	    	<link rel="stylesheet" media="screen" href="<?php echo base_url();?>css_users/superfish.css" /> 
	    	<link rel="stylesheet" media="screen" href="<?php echo base_url();?>css_users/superfish-left.css" /> 
	    	<script type="text/javascript" src="<?php echo base_url();?>js_users/superfish-1.4.8/js/hoverIntent.js"></script>
	    	<script type="text/javascript" src="<?php echo base_url();?>js_users/superfish-1.4.8/js/superfish.js"></script>
	    	<script type="text/javascript" src="<?php echo base_url();?>js_users/superfish-1.4.8/js/supersubs.js"></script>
	    	<!-- ENDS superfish -->

	    	<!-- poshytip -->
	    	<link rel="stylesheet" href="<?php echo base_url();?>js_users/poshytip-1.0/src/tip-twitter/tip-twitter.css" type="text/css" />
	    	<link rel="stylesheet" href="<?php echo base_url();?>js_users/poshytip-1.0/src/tip-yellowsimple/tip-yellowsimple.css" type="text/css" />
	    	<script type="text/javascript" src="<?php echo base_url();?>js_users/poshytip-1.0/src/jquery.poshytip.min.js"></script>
	    	<!-- ENDS poshytip -->

	    	<!-- Tweet -->
	    	<link rel="stylesheet" href="<?php echo base_url();?>css_users/jquery.tweet.css" media="all"  type="text/css"/> 
	    	<script src="<?php echo base_url();?>js_users/tweet/jquery.tweet.js" type="text/javascript"></script> 
	    	<!-- ENDS Tweet -->

	    	<!-- Fancybox -->
	    	<link rel="stylesheet" href="<?php echo base_url();?>js_users/jquery.fancybox-1.3.4/fancybox/jquery.fancybox-1.3.4.css" type="text/css" media="screen" />
	    	<script type="text/javascript" src="<?php echo base_url();?>js_users/jquery.fancybox-1.3.4/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
	    	<!-- ENDS Fancybox -->



	    </head>

	    <body>

	    	<!-- HEADER -->
	    	<div id="header">
	    		<!-- wrapper-header -->
	    		<div class="wrapper">
	    			<a href="<?php echo base_url().'users/panel_user';?>">
	    				<img id="logo" src="<?php echo base_url();?>images/logo.png" alt="Gestal!" />
	    			</a>
	    			Sistema de gestion de talentos
	    			<div class="top-search">
	    				<form  method="get" id="searchform" action="#">
	    					<div>
	    						BIENVENIDO <?php echo $_SESSION['parametros']['usuario'];?>
	    					</div>
	    				</form>
	    			</div>
	    			<!-- ENDS search -->
	    		</div>
	    		<!-- ENDS wrapper-header -->					
	    	</div>
	    	<!-- ENDS HEADER -->


	    	<!-- Menu -->
	    	<div id="menu">



	    		<!-- ENDS menu-holder -->
	    		<div id="menu-holder">
	    			<!-- wrapper-menu -->
	    			<div class="wrapper">
	    				<!-- Navigation -->
	    				<ul id="nav" class="sf-menu">
	    					<?php
	    					$modulos=array();
	    					foreach ($query->result() as $row) {
	    						if(!in_array($row->descripcion,$modulos)){
	    							if(!empty($modulos)){
	    								echo "</ul></li>";
	    							}
	    							$mod=ucwords(strtr(strtolower($row->descripcion), "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÜÚ", "àáâãäåæçèéêëìíîïðñòóôõöøùüú"));
	    							echo "<li><a href='#'>".$mod."<span class='subheader'></span></a>";
	    							echo "<ul><li><a href='".base_url()."users/".$row->archivo."'><span>".$row->opcion."</span></a></li>";
	    							array_push($modulos,$row->descripcion);
	    						}else{
	    							echo "<li><a href='".base_url()."users/".$row->archivo."'><span>".$row->opcion."</span></a></li>";
	    						}
	    					}
	    					echo "</ul></li>";
	    					?>
	    					<li><a href="<?php echo base_url();?>"  title='Cerrar sesion'><span><img src="<?php echo base_url();?>images/mono-icons/unlock32.png"></span></a></li>
	    				</ul>
	    				<!-- <ul id="nav" class="sf-menu">
	    					<li><a href="index.html">Home<span class="subheader">Welcome</span></a></li>
	    					<li><a href="features.html">Features<span class="subheader">Awesome options</span></a>
	    						<ul>
	    				
	    							<li><a href="features-columns.html"><span> Columns layout</span></a></li>
	    							<li><a href="features-accordion.html"><span> Accordion</span></a></li>
	    							<li><a href="features-toggle.html"><span> Toggle box</span></a></li>
	    							<li><a href="features-tabs.html"><span> Tabs</span></a></li>
	    							<li><a href="features-infobox.html"><span> Text box</span></a></li>
	    							<li><a href="features-monobox.html"><span> Icons</span></a></li>
	    						</ul>
	    					</li>
	    					<li><a href="blog.html">Blog<span class="subheader">Read our posts</span></a></li>
	    					<li><a href="portfolio.html">Portfolio <span class="subheader">Showcase work</span></a></li>
	    					<li><a href="gallery.html">Gallery<span class="subheader">Featured work</span></a>
	    						<ul>
	    							<li><a href="gallery.html"><span> Four columns</span></a></li>
	    							<li><a href="gallery-3.html"><span> Three columns </span></a></li>
	    							<li><a href="gallery-2.html"><span> Two columns </span></a></li>
	    							<li><a href="video-gallery.html"><span> Video gallery </span></a></li>
	    						</ul>
	    					</li>
	    					<li class="current-menu-item"><a href="contact.html">Contact<span class="subheader">Get in touch</span></a></li> -->
	    				</ul>
	    				<!-- Navigation -->
	    			</div>
	    			<!-- wrapper-menu -->
	    		</div>
	    		<!-- ENDS menu-holder -->
	    	</div>
	    	<!-- ENDS Menu -->
	    	<input type="hidden" id="base_url" value="<?php echo base_url(); ?>" readonly="true">




	    	

	    	