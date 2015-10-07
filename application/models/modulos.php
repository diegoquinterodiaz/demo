<?php 
	/**
	* 
	*/
	class Modulos extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getModulos(){
			$query=$this->db->get('v_cmmodulos');
			return $query;
		}

		public function addModulo($data){
			$this->db->insert('cmmodulos', $data);
		}

		public function editModulo($data){
			$this->db->where('modulo',$data['modulo']);
			$data_aux=array(
				'descripcion'=>$data['descripcion'],
				'orden'=>$data['orden'],
				'activo'=>$data['activo']	
			);
			$this->db->update('cmmodulos',$data_aux);
		}

		public function getMod(){
			$query=$this->db->get('v_cmmodulos');
			return $query;
		}
	}
 ?>