<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	/**
	* 
	*/
	class Periodos extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getPeriodos(){
			$sql="SELECT anno,version,descripcion,fechainicio,fechacierre,activo FROM cmperiodo";
			$query=$this->db->query($sql);
			return $query;
		}

		public function addPeriodo($data){
			$this->db->insert('cmperiodo',$data);
		}

		public function editPeriodo($data){
			$where=array(
				'anno'=>$data['anno'],
				'version'=>$data['version']
				);
			$this->db->where($where);
			unset($data['anno']);
			unset($data['version']);
			$this->db->update('cmperiodo',$data);
		}

		public function getPeriodo(){
			$sql="SELECT anno,version,descripcion FROM cmperiodo WHERE activo='1'";
			$query=$this->db->query($sql);
			return $query;
		}
	}
 ?>