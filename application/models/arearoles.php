<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class AreaRoles extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getAreaRoles(){
			$query=$this->db->get('v_selectCMAreaRol');
			return $query;
		}

		public function addAreaRol($data){
			$this->db->insert('cmarearol',$data);
		}

		public function editAreaRol($data){
			$where=array(
				'codarea'=>$data['codarea'],
				'codrol'=>$data['codrol']
				);
			$this->db->where($where);
			$this->db->update('cmarearol',array('activo'=>$data['activo']));
		}
	}
 ?>