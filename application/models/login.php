<?php 
	/**
	* Clase para realizar el proceso de login
	*/
	class Login extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function findUser($data){
			extract($data);	
			
			$query=$this->db->get_where('cmusuario',array(
				'usuario'=>$usr,
				'contrasena'=>$pss
				));
			return $query;
		}
	}
?>