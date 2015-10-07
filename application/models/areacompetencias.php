<?php 
	
	/**
	* 
	*/
	class AreaCompetencias extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getAreaCompetencias(){
			$query=$this->db->get('v_selectCMAreaCompetencia');
			return $query;
		}

		public function addAreaCompetencia($data){
			$this->db->insert('cmareacompetencia',$data);
		}

		public function editAreaCompetencia($data){
			$where=array(
				'codarea'=>$data['codarea'],
				'codcompetencia'=>$data['codcompetencia']
				);
			$this->db->where($where);
			$this->db->update('cmareacompetencia',array('activo'=>$data['activo']));
		}
	}
 ?>