<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class OpcionesMenu extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getOpciones(){
			$query=$this->db->get('v_cmopcionesmenu');
			return $query;
		}

		public function addOpcion($data){
			$this->db->insert('cmopcionesmenu',$data);
		}

		public function editOpcion($data){
			$this->db->where('codopcion',$data['codopcion']);
			$data_aux=array(
				'opcion'=>$data['opcion'],
				'archivo'=>$data['archivo'],
				'orden'=>$data['orden'],
				'activo'=>$data['activo']	
			);
			$this->db->update('cmopcionesmenu',$data_aux);
		}
	}
 ?>