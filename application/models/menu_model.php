<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	/**
	* 
	*/
	class Menu_model extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getMenu(){
			$query=$this->db->get('v_cmmenuadmin');
			return $query;
		}

		public function getMod(){
			$query=$this->db->get('v_selectcmmenu');
			return $query;
		}

		public function getOp(){
			$query=$this->db->get('v_selectcmopcionesmenu');
			return $query;
		}

		public function addMenu($data){
			$data_aux=array(
				'modulo' => $data['modulo'],
				'codopcion'=>$data['opcion'],								
				'activo'=>$data['activo']	
			);
			$this->db->insert('cmmenu', $data_aux);
		}

		public function editMenu($data){
			$where=array(
					'modulo' => $data['modulo'],
					'codopcion'=>$data['opcion']
				);
			$this->db->where($where);
			$data_aux=array(								
				'activo'=>$data['activo']	
			);
			$this->db->update('cmmenu',$data_aux);
		}
	}
 ?>