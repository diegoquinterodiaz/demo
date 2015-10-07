<?php 
	/**
	* 
	*/
	class ExcepPeriodos extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getExcepPeriodos(){
			$sql="SELECT p.descripcion as periodo, CONCAT(c.nombre,' ',c.apellidop,' ',c.apellidos) as colaborador,
			ex.fechacierre as fecha,ex.observaciones as observaciones
			FROM cmexcepbalance ex
			LEFT JOIN(cmperiodo p,cmcolaborador c) ON 
			(c.cedula=ex.cedula AND p.anno=ex.anno AND p.version=ex.version)";
			$query=$this->db->query($sql);
			return $query;
		}

		public function addExcepPeriodo($data){
			$this->db->insert('cmexcepbalance',$data);
		}

		public	function editExcepPeriodo($data){
			$where=array(
				'anno'=>$data['anno'],
				'version'=>$data['version'],
				'cedula'=>$data['cedula']
				);
			$this->db->where($where);
			unset($data['anno']);
			unset($data['version']);
			unset($data['cedula']);
			$this->db->update('cmexcepbalance',$data);
		}
	}
 ?>