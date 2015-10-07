<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class PesoCompetencias extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getPesoCompetencias($anno,$version,$codarea){
			$sql="SELECT tp.descripcion,p.peso,tp.codcompetencia,p.anno,p.version,
			p.codarea,p.requerido,p.criticidad
			FROM cmformato p,cmcompetencia tp
			WHERE tp.activo='1' AND p.anno='$anno' AND p.version='$version' AND p.codarea='$codarea' AND tp.codcompetencia=p.codcompetencia
			GROUP BY tp.descripcion,p.peso,p.codcompetencia,p.anno,p.version,p.codarea ORDER BY tp.descripcion";
			$query=$this->db->query($sql);
			return $query;
		}

		public function selectBox($an,$vr,$cda){
			$sql="SELECT codcompetencia,descripcion FROM cmcompetencia c 
			WHERE activo='1' AND codcompetencia NOT IN (SELECT codcompetencia FROM cmformato WHERE
				anno='$an' AND version='$vr' AND codarea='$cda') ORDER BY descripcion";
			$query=$this->db->query($sql);
			return $query;
		}

		public function add($data){
			$this->db->insert('cmformato',$data);
		}

		public function edit($data){
			$where=array(
				'anno'=>$data['anno'],
				'version'=>$data['version'],
				'codarea'=>$data['codarea'],
				'codcompetencia'=>$data['codcompetencia']
				);
			$this->db->where($where);
			unset($data['anno']);
			unset($data['version']);
			unset($data['codarea']);
			unset($data['codcompetencia']);
			$this->db->update('cmformato',$data);
		}
}
?>