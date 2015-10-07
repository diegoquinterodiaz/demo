<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class Seguridad_model extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getSeguridad(){
			$query=$this->db->get('v_selectcmseg');
			return $query;
		}

		public function addSeguridad($data){
			$query=$this->db->insert('cmseguridad',$data);
		}

		public function editSeguridad($data){
			$where=array(
				'modulo'=>$data['modulo'],
				'usuario'=>$data['usuario']
				);
			$this->db->where($where);
			$data_aux=array(				
				'activo'=>$data['activo']	
			);
			$this->db->update('cmseguridad',$data_aux);
		}
	}
 ?>