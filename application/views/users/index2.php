<!-- Twitter -->
	    	<div id="twitter">
	    		<div class="wrapper">
	    			<a href="#" id="prev-tweet"></a>
	    			<a href="#" id="next-tweet"></a>
	    			<!-- <img id="bird" src="<?php echo base_url();?>images/bird.png" alt="Tweets" /> -->
	    			<div id="tweets">
	    				<ul class="tweet_list"></ul>
	    			</div>
	    		</div>
	    	</div>
	    	<!-- ENDS Twitter -->


	    	<!-- FOOTER -->
	    	<div id="footer">
	    		<!-- wrapper-footer -->
	    		<div class="wrapper">
	    			<!-- footer-cols -->
	    			<ul id="footer-cols">
	    				<li class="col">
	    					<h6>Modulos</h6>
	    					<ul>
	    						<?php
	    						$modulos=array();
	    						foreach ($query->result() as $row) {
	    							if(!in_array($row->descripcion,$modulos)){
	    								if(!empty($modulos)){
	    									echo "</ul></li>";
	    								}
	    								$mod=ucwords(strtr(strtolower($row->descripcion), "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÜÚ", "àáâãäåæçèéêëìíîïðñòóôõöøùüú"));
	    								echo "<li class='page_item toggle'><a>".$mod."</a>";
	    								echo "<ul>
	    								<li class='page_item' style='display:none'><a href='".base_url()."users/".$row->archivo."'>".$row->opcion."</a></li>";
	    								array_push($modulos,$row->descripcion);
	    							}else{
	    								echo "<li class='page_item' style='display:none'><a href='".base_url()."users/".$row->archivo."'>".$row->opcion."</a></li>";
	    							}
	    						}
	    						echo "</ul></li>";
	    						?>	    						
	    					</ul>
	    				</li>
	    				<script>
	    				$('.toggle').click(function(e){
	    					$(this).find('li').toggle('slow');	    						    						
	    				});
	    				</script>	    				
	    				<li class="col">
	    					<h6>Sobre Gestal!</h6>
	    					aqui va toda la carreta que se quiera hechar.
	    				</li>

	    			</ul>
	    			<!-- ENDS footer-cols -->
	    		</div>
	    		<!-- ENDS wrapper-footer -->
	    	</div>
	    	<!-- ENDS FOOTER -->


	    	<!-- Bottom -->
	    	<div id="bottom">
	    		<!-- wrapper-bottom -->
	    		<div class="wrapper">
	    			<div id="bottom-text">
	    				Template by  
	    				<a href="http://www.luiszuno.com"> Luiszuno.com</a>&nbsp
	    				Disenado por<a href="http://www.gestal.com.co"> gestal.com.co</a>&nbsp&nbsp
	    				contactos en diegoquinterodiaz@gmail.com 
	    			</div>
	    			<!-- Social -->

	    			<ul class="social ">
	    				<li><a href="http://www.facebook.com" class="poshytip  facebook" title="Become a fan"></a></li>
	    				<li><a href="http://www.twitter.com" class="poshytip twitter" title="Follow our tweets"></a></li>
	    				<li><a href="http://www.dribbble.com" class="poshytip dribbble" title="View our work"></a></li>
	    				<li><a href="http://www.addthis.com" class="poshytip addthis" title="Tell everybody"></a></li>
	    				<li><a href="http://www.vimeo.com" class="poshytip vimeo" title="View our videos"></a></li>
	    				<li><a href="http://www.youtube.com" class="poshytip youtube" title="View our videos"></a></li>
	    			</ul>
	    			<!-- ENDS Social -->
	    			<div id="to-top" class="poshytip" title="Arriba"></div>
	    		</div>
	    		<!-- ENDS wrapper-bottom -->
	    	</div>
	    	<!-- ENDS Bottom -->

	    </body>
	    </html>