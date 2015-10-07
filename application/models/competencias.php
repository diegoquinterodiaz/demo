<?php 

	/**
	* 
	*/
	class Competencias extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public	function getCompetencias(){			
			$query=$this->db->get('v_cmcompetenciasGrid');
			return $query;
		}

		public function addCompetencia($data){
			$this->db->insert('cmcompetencia',$data);
		}

		public	function editCompetencia($data){
			$this->db->where('codcompetencia',$data['codcompetencia']);
			unset($data['codcompetencia']);
			$this->db->update('cmcompetencia',$data);
		}		
	}
	?>