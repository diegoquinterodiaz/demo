<?php 
	/**
	* 
	*/
	class TipoUsuario extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getTipo(){
			$query=$this->db->get('v_selectcmtipusu');
			return $query;
		}

		public function addTipo($data){
			$this->db->insert('cmtipousuario', $data);
		}

		public function editTipo($data){
			$this->db->where('codtipo',$data['codtipo']);
			$data_aux=array(
				'tipo'=>$data['tipo'],
				'descripcion'=>$data['descripcion'],				
				'activo'=>$data['activo']	
			);
			$this->db->update('cmtipousuario',$data_aux);
		}
	}
 ?>