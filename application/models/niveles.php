<?php 
	
	/**
	* 
	*/
	class Niveles extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getNiveles(){
			$sql="SELECT codnivel,descripcion,observacion,activo FROM cmnivel";
			$query=$this->db->query($sql);
			return $query;
		}

		public function addNivel($data){
			$this->db->insert('cmnivel',$data);
		}

		public function editNivel($data){
			$this->db->where('codnivel',$data['codnivel']);
			unset($data['codnivel']);
			$this->db->update('cmnivel',$data);
		}

		public function getNivel(){
			$sql="SELECT codnivel,descripcion FROM cmnivel";
			$query=$this->db->query($sql);
			return $query;
		}
	}
 ?>