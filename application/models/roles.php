<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 	
 	/**
 	* 
 	*/
 	class Roles extends CI_Model
 	{
 		
 		function __construct()
 		{
 			parent::__construct();
 		}

 		public function getRoles(){
			$query=$this->db->get('v_selectCMRol');
			return $query;
		}

		public function getRol(){
			$query=$this->db->get('v_selectCMRol2');
			return $query;
		}

		public function addRol($data){
			$this->db->insert('cmrol',$data);
		}

		public function editRol($data){
			$this->db->where('codrol',$data['codrol']);
			$this->db->update('cmrol',array(
					'codtiporol'=>$data['codtiporol'],
					'descripcion'=>$data['descripcion'],
					'activo'=>$data['activo']
				));
		}
 	}
 ?>