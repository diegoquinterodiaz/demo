<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	/**
	* 
	*/
	class Evaluadores extends CI_Model
	{
		
		function __construct()
		{
			parent::__construct();
		}

		public function getEvaluadores($ced){
			$sql="SELECT CONCAT(et.anno,'-',et.version) as periodo,
			CONCAT(col.nombre,' ',col.apellidop,' ',col.apellidos) as evaluador,
			tip.descripcion as tipo 
			FROM cmevaluadotipoeval et
			LEFT JOIN(cmcolaborador col,cmtipoeval tip,cmperiodo pe) ON
			(et.evaluador=col.cedula AND et.codtipoeval=tip.codigo 
				AND pe.anno=et.anno AND pe.version=et.version AND pe.activo='1') 
			WHERE et.evaluado='$ced' order by et.anno,et.version";
			$query=$this->db->query($sql);
			return $query;
		}

		public function add($data){
			unset($data['activo']);
			$this->db->insert('cmevaluadotipoeval',$data);
		}

		public function edit($data){
			if($data['activo']=='2'){
				$where=array(
						'anno'=>$data['anno'],
						'version'=>$data['version'],
						'evaluado'=>$data['evaluado'],
						'evaluador'=>$data['evaluador'],
						'codtipoeval'=>$data['codtipoeval']
					);
				$this->db->where($where);
				$this->db->delete('cmevaluadotipoeval');
			}

		}
	}
 ?>