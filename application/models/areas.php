<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class Areas extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getAreas(){
			$query=$this->db->get('v_selectCMArea');
			return $query;
		}

		public function getArea(){
			$query=$this->db->get('v_selectCMArea2');
			return $query;
		}

		public function addArea($data){
			$this->db->insert('cmarea',$data);
		}

		public function editArea($data){
			$this->db->where('codarea',$data['codarea']);
			$this->db->update('cmarea',array(				
				'descripcion'=>$data['descripcion'],
				'activo'=>$data['activo']
				));
		}
	}
	?>