<?php 
	
	/**
	* 
	*/
	class Peso_model extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getPeso(){
			$sql="SELECT p.anno,p.version,p.descripcion as desperiodo,p.fechainicio,p.fechacierre,
			p.activo,a.descripcion,a.codarea FROM cmperiodo p,cmarea a
				WHERE p.activo='1' AND a.activo='1' GROUP BY p.fechainicio,p.fechacierre,a.codarea";
			$query=$this->db->query($sql);
			return $query;
		}

		public function getPesoTipos($anno,$version,$codarea){
			$sql="SELECT tp.descripcion,p.peso,tp.codigo,p.anno,p.version,p.codarea FROM cmpeso p,cmtipoeval tp
			WHERE tp.activo='1' AND p.anno='$anno' AND p.version='$version' AND p.codarea='$codarea' AND tp.codigo=p.codtipoeval
			GROUP BY tp.descripcion,p.peso,p.codtipoeval,p.anno,p.version,p.codarea ORDER BY tp.descripcion";
			$query=$this->db->query($sql);
			return $query;
		}

		public function add($data){
			$this->db->insert('cmpeso',$data);
		}

		public function edit($data){
			$where=array(
				'anno'=>$data['anno'],
				'version'=>$data['version'],
				'codtipoeval'=>$data['codtipoeval'],
				'codarea'=>$data['codarea']
				);
			unset($data['anno']);
			unset($data['version']);
			unset($data['codtipoeval']);
			unset($data['codarea']);
			$this->db->where($where);
			$this->db->update('cmpeso',$data);
		}
	}
 ?>