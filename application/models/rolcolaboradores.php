<?php 
	/**
	* 
	*/
	class RolColaboradores extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getRolColab(){
			$sql="SELECT rc.activo,rc.fecha,CONCAT(c.nombre,' ',c.apellidop,' ', c.apellidos) as completo,r.descripcion as descripcion FROM cmrolcolaborador rc INNER JOIN cmrol r ON (rc.codrol = r.codrol) INNER JOIN cmcolaborador c ON (rc.cedula = c.cedula) ORDER BY c.apellidop, c.apellidos, c.nombre, rc.activo, r.descripcion";
			$query=$this->db->query($sql);
			return $query;
		}

		public function	addRolColab($data){
			unset($data['fecha_act']);
			$sql="call sp_addCMRolColaborador(?,?,?,?)";
			$this->db->query($sql,$data);
		}

		public function editRolColab($data){			
			$sql="call sp_editCMRolColaborador(?,?,?,?,?)";
			$this->db->query($sql,$data);
		}
		

	}
 ?>