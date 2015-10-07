<?php 
	/**
	* 
	*/
	class CompetenciaNiveles extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getCompetenciaNiveles(){
			$sql="SELECT c.descripcion as competencia,n.descripcion as nivel,cn.activo as activo FROM cmcompetencianivel cn 
			LEFT JOIN(cmcompetencia c,cmnivel n) ON
			(cn.codcompetencia=c.codcompetencia AND cn.codnivel=n.codnivel)";
			$query=$this->db->query($sql);
			return $query;
		}

		public function addCompetenciaNivel($data){
			$this->db->insert('cmcompetencianivel',$data);
		}

		public function editCompetenciaNivel($data){
			$where=array(
				'codcompetencia'=>$data['codcompetencia'],
				'codnivel'=>$data['codnivel']
				);
			$this->db->where($where);
			$this->db->update('cmcompetencianivel',array('activo'=>$data['activo']));
		}
	}
 ?>