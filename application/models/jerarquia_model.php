<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class Jerarquia_model extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getJerarquia(){
			$sql="SELECT CONCAT(c.nombre,' ',c.apellidop,' ',c.apellidos) as lider,
					CONCAT(c2.nombre,' ',c2.apellidop,' ',c2.apellidos) as dependiente,
					j.activo as activo
					FROM cmjerarquia j 
					LEFT JOIN (cmcolaborador c,cmcolaborador c2)
					ON
					(c.cedula=j.lider AND c2.cedula=j.dependiente)";
			$query=$this->db->query($sql);
			return $query;
		}

		public function addJerarquia($data){
			$this->db->insert('cmjerarquia',$data);
		}

		public function editJerarquia($data){
			$where=array(
				'lider'=>$data['lider'],
				'dependiente'=>$data['dependiente']
				);
			$this->db->where($where);
			$this->db->update('cmjerarquia',array('activo'=>$data['activo']));
		}
	}
 ?>