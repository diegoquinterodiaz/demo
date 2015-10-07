<?php 
	/**
	* 
	*/
	class GrupoCompetencia extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function	getGrupoComp(){
			$sql="SELECT codgrupocom,descripcion,activo FROM cmgrupocompetencia";
			$query=$this->db->query($sql);
			return $query;
		}

		public function addGrupoComp($data){
			$this->db->insert('cmgrupocompetencia',$data);
		}

		public function editGrupoComp($data){
			$this->db->where('codgrupocom',$data['codgrupocom']);
			unset($data['codgrupocom']);
			$this->db->update('cmgrupocompetencia',$data);
		}

		public function getGrpCmp(){
			$sql="SELECT codgrupocom, descripcion FROM cmgrupocompetencia WHERE activo='1'";
			$query=$this->db->query($sql);
			return $query;
		}
	}
 ?>