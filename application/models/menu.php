<?php 
	/**
	* 
	*/
	class Menu extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function menuRoot(){
			$query=$this->db->get('v_menuroot');
			return $query;
		}

		public function menuUser($user){
			$query=$this->db->get_where('v_menuuser',array('usuario'=>$user));
			return $query;
		}
	}
 ?>