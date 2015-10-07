<?php 
	/**
	* 
	*/
	class TipoRol_model extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();		
		}

		public function getTipoRol(){
			$query=$this->db->get('v_selectCMTipRol');
			return $query;
		}

		public	function addTipo($data){
			$this->db->insert('cmtiporol',$data);
		}

		public function editTipo($data){
			$this->db->where('codtiporol',$data['codtiporol']);
			$this->db->update('cmtiporol',array('descripcion'=>$data['descripcion'],'activo'=>$data['activo']));
		}

		public function getTipo(){
			$query=$this->db->get('v_selectCMTipRol');
			return $query;
		}
	}
 ?>